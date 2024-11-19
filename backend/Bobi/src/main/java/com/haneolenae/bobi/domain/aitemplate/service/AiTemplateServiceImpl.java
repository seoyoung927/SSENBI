package com.haneolenae.bobi.domain.aitemplate.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.haneolenae.bobi.domain.aitemplate.client.AiTemplateClient;
import com.haneolenae.bobi.domain.aitemplate.dto.request.MessageRequest;
import com.haneolenae.bobi.domain.aitemplate.dto.request.OpenAiRequest;
import com.haneolenae.bobi.domain.aitemplate.dto.request.UserRequest;
import com.haneolenae.bobi.domain.customer.entity.Customer;
import com.haneolenae.bobi.domain.customer.repository.CustomerRepository;
import com.haneolenae.bobi.domain.tag.entity.Tag;
import com.haneolenae.bobi.domain.tag.repository.TagRepository;
import com.haneolenae.bobi.global.dto.ApiType;
import com.haneolenae.bobi.global.exception.ApiException;
import com.haneolenae.bobi.global.properties.OpenAIProperties;

@Service
public class AiTemplateServiceImpl implements AiTemplateService {

	private final AiTemplateClient aiTemplateClient;
	private final OpenAIProperties openAIProperties;
	private final CustomerRepository customerRepository;
	private final TagRepository tagRepository;

	public AiTemplateServiceImpl(AiTemplateClient aiTemplateClient, OpenAIProperties openAIProperties,
		CustomerRepository customerRepository, TagRepository tagRepository) {
		this.aiTemplateClient = aiTemplateClient;
		this.openAIProperties = openAIProperties;
		this.customerRepository = customerRepository;
		this.tagRepository = tagRepository;
	}

	public String askAi(long memberId, UserRequest request) {
		return aiTemplateClient.getChatCompletion(makeOpenAiRequest(memberId, request)).block().getContent();
	}

	private OpenAiRequest makeOpenAiRequest(long memberId, UserRequest request) {
		MessageRequest systemMessageRequest = makeSystemMessage(memberId, request);
		MessageRequest userMessageRequest = makeUserMessage(request);

		return OpenAiRequest.builder()
			.model("gpt-4o")
			.messages(List.of(systemMessageRequest, userMessageRequest))
			.build();
	}

	private MessageRequest makeSystemMessage(long memberId, UserRequest request) {
		String systemContent = "아래 규칙은 절대 적으로 지켜야하는 규칙입니다 \n";

		Map<String, String> prompts = openAIProperties.getPrompts();
		for (Map.Entry<String, String> entry : prompts.entrySet()) {
			systemContent += entry.getKey() + " : " + entry.getValue() + "\n";
		}

		systemContent += referenceCustomerInformation(memberId, request);

		return MessageRequest.builder()
			.role("system")
			.content(systemContent)
			.build();
	}

	private String referenceCustomerInformation(long memberId, UserRequest request) {
		List<Long> tagIds = request.getTagIds();
		List<Long> customerIds = request.getCustomerIds();

		if ((tagIds == null || tagIds.isEmpty()) && (customerIds == null || customerIds.isEmpty()))
			return "";

		//최종 보낼 customer들을 담는 set
		Set<Customer> referencedCustomers = customerRepository.findByMemberIdAndCustomerIdIn(memberId, customerIds);

		if (!(customerIds == null || customerIds.isEmpty())) {
			if (referencedCustomers.size() != customerIds.size())
				throw new ApiException(ApiType.CUSTOMER_NOT_FOUND);
		}

		List<Tag> tags = tagRepository.findByMemberIdAndTagIds(memberId, tagIds);

		if (!(tagIds == null || tagIds.isEmpty())) {
			if (tags.size() != tagIds.size())
				throw new ApiException(ApiType.TAG_NOT_FOUND);

			List<Customer> tagCustomers = customerRepository.findALlByMemberIdAndTags(memberId, tagIds);

			referencedCustomers.addAll(tagCustomers);
		}
		if (referencedCustomers.isEmpty())
			return "";

		String customerInformation = "다음은 내가 문자 메시지를 보낼 고객들의 정보입니다. 만약 공통되는 부분이 있고 메시지를 만들때 참고할 사항이 있다면 참고해주시기 바랍니다\n";

		for (Customer customer : referencedCustomers) {
			String temp = customer.getName() + "은 " + customer.getMemo() + "란 정보가 있습니다.\n";
			customerInformation += temp;
		}
		return customerInformation;
	}

	private MessageRequest makeUserMessage(UserRequest request) {
		return MessageRequest.builder()
			.role("user")
			.content(request.getContent() + "를 " + request.getRequirements() + "하게 바꿔줘")
			.build();
	}
}
