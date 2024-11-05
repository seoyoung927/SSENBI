package com.haneolenae.bobi.domain.aitemplate.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.haneolenae.bobi.domain.aitemplate.client.AiTemplateClient;
import com.haneolenae.bobi.domain.aitemplate.dto.request.MessageRequest;
import com.haneolenae.bobi.domain.aitemplate.dto.request.OpenAiRequest;
import com.haneolenae.bobi.domain.aitemplate.dto.request.UserRequest;
import com.haneolenae.bobi.global.properties.OpenAIProperties;

@Service
public class AiTemplateServiceImpl implements AiTemplateService {

	private final AiTemplateClient aiTemplateClient;
	private final OpenAIProperties openAIProperties;

	public AiTemplateServiceImpl(AiTemplateClient aiTemplateClient, OpenAIProperties openAIProperties) {
		this.aiTemplateClient = aiTemplateClient;
		this.openAIProperties = openAIProperties;
	}

	public String askAi(UserRequest request) {
		return aiTemplateClient.getChatCompletion(makeOpenAiRequest(request)).block().getContent();
	}

	private OpenAiRequest makeOpenAiRequest(UserRequest request) {
		MessageRequest systemMessageRequest = makeSystemMessage();
		MessageRequest userMessageRequest = makeUserMessage(request);

		return OpenAiRequest.builder()
			.model("gpt-4o")
			.messages(List.of(systemMessageRequest, userMessageRequest))
			.build();
	}

	private MessageRequest makeSystemMessage() {
		String systemContent = "";
		Map<String, String> prompts = openAIProperties.getPrompts();
		for (Map.Entry<String, String> entry : prompts.entrySet()) {
			systemContent += "{" + entry.getKey() + "}" + entry.getValue();
		}
		return MessageRequest.builder()
			.role("system")
			.content(systemContent)
			.build();
	}

	private MessageRequest makeUserMessage(UserRequest request) {
		return MessageRequest.builder()
			.role("user")
			.content(request.getComment() + "를 " + request.getRequirements() + "하게 바꿔줘")
			.build();
	}
}
