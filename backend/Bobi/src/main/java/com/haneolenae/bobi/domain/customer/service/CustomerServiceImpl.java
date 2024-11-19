package com.haneolenae.bobi.domain.customer.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haneolenae.bobi.domain.customer.dto.request.AddCustomerExcelRequest;
import com.haneolenae.bobi.domain.customer.dto.request.AddCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.request.UpdateCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.response.CustomerExcelResponse;
import com.haneolenae.bobi.domain.customer.dto.response.CustomerResponse;
import com.haneolenae.bobi.domain.customer.entity.Customer;
import com.haneolenae.bobi.domain.customer.entity.CustomerTag;
import com.haneolenae.bobi.domain.customer.mapper.CustomerMapper;
import com.haneolenae.bobi.domain.customer.repository.CustomerRepository;
import com.haneolenae.bobi.domain.customer.repository.CustomerTagRepository;
import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.member.repository.MemberRepository;
import com.haneolenae.bobi.domain.tag.dto.response.TagStatisticsResponse;
import com.haneolenae.bobi.domain.tag.entity.Tag;
import com.haneolenae.bobi.domain.tag.repository.TagRepository;
import com.haneolenae.bobi.domain.tag.util.TagColor;
import com.haneolenae.bobi.global.dto.ApiType;
import com.haneolenae.bobi.global.exception.ApiException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

	private static final Logger log = LoggerFactory.getLogger(CustomerServiceImpl.class);
	private final CustomerRepository customerRepository;
	private final CustomerTagRepository customerTagRepository;
	private final MemberRepository memberRepository;
	private final TagRepository tagRepository;

	private final CustomerMapper mapper;

	@Override
	public List<CustomerResponse> getCustomerList(Long memberId, Pageable pageable, List<Long> tags,
		String keyword) {
		// TODO: memberId 유효성 검사
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		log.info("member_id: " + memberId);
		// // List<Customer> customers = customerRepository.findCustomers(memberId, pageable, tags, keyword)
		// // 	.getContent();
		//
		log.info("keyword: " + keyword);
		// log.info("tags: " + tags.toString());
		// List<Customer> customers = customerRepository.findCustomers(memberId);
		// // .getContent();
		// customers = customerRepository.findAllByMemberId(memberId);
		// customers = customerRepository.findAllByMemberIdAndNameContaining(memberId, keyword);
		// customers = customerRepository.findAllByMemberIdAndNameContainingAndTagsIn(memberId, keyword, tags);
		// log.info("customers.toString(): {}", customers.toString());

		List<Customer> customers = customerRepository.findAllByMemberIdAndKeywordAndTags(memberId, keyword, tags);
		return mapper.toCustomerListResponse(customers);
	}

	@Transactional
	public CustomerResponse addCustomer(Long memberId, AddCustomerRequest request) {
		// TODO: memberId 유효성 검사
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		// TODO: tags 유효성 검사
		List<Tag> retrievedTags = tagRepository.findByMemberIdAndTagIds(memberId, request.getCustomerTags());
		// List<Tag> retrievedTags = customerTagRepository.findTagsByMemberIdAndTagIds(memberId, request.getTags());
		log.info("memberId: {}, tags: {}", memberId, retrievedTags);
		log.info("request.getTags(): {}", request.getCustomerTags());
		if (retrievedTags.size() != request.getCustomerTags().size()) {
			throw new ApiException(ApiType.TAG_NOT_FOUND);
		}

		//TODO: 태그 색깔 -> 글로벌, 예외 문구 변경
		if (TagColor.notExistColor(request.getCustomerColor())) {
			throw new ApiException(ApiType.TAG_COLOR_INVALID);
		}

		// TODO: 고객 추가
		// 고객 이름,전화번호 중복 확인
		if (!customerRepository.findExistCustomer(memberId, request.getCustomerName(), request.getCustomerPhoneNumber())
			.isEmpty()) {
			throw new ApiException(ApiType.CUSTOMER_ALREADY_EXIST);
		}

		Customer customer = mapper.toCustomer(request, member);
		customerRepository.save(customer);

		member.increaseCustomerCount();

		List<CustomerTag> customerTags = retrievedTags.stream()
			.map(tag -> new CustomerTag(customer, tag))
			.toList();

		log.info("customerTag size:{}", customerTags.size());

		customerTagRepository.saveAll(customerTags);

		customerTags.stream()
			.forEach(customerTag -> {
				customerTag.getCustomer().addCustomerTag(customerTag);
				customerTag.getTag().addCustomerTag(customerTag);
			});

		return mapper.toCustomerResponse(customer);
	}

	@Override
	public CustomerResponse getCustomerDetail(Long memberId, Long customerId) {

		// TODO: memberId 유효성 검사
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		// TODO: customerId 유효성 검사
		Customer customer = customerRepository.findByIdAndMemberId(customerId, memberId).orElseThrow(
			() -> new ApiException(ApiType.CUSTOMER_NOT_FOUND)
		);

		// TODO: mapper 이용해서 response로 변경
		return mapper.toCustomerResponse(customer);
	}

	@Transactional
	public CustomerResponse updateCustomer(Long memberId, Long customerId, UpdateCustomerRequest request) {

		// TODO: memberId 유효성 검사
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		// TODO: customerId 유효성 검사
		Customer customer = customerRepository.findByIdAndMemberId(customerId, memberId).orElseThrow(
			() -> new ApiException(ApiType.CUSTOMER_NOT_FOUND)
		);

		//수정 오류 확인
		// customerRepository.findExistCustomer(memberId, request.getCustomerName(), request.getCustomerPhoneNumber())
		// 	.stream()
		// 	.forEach(finder -> {
		// 		if (finder.getId() != customerId) {
		// 			throw new ApiException(ApiType.CUSTOMER_ALREADY_EXIST);
		// 		}
		// 	});

		customer.update(request);

		// 현재 태그 ID 목록
		List<Long> curTags = request.getCustomerTags();

		List<CustomerTag> customerTagsToRemove = customer.getCustomerTags().stream()
			.filter(customerTag -> !curTags.contains(customerTag.getTag().getId()))
			.toList();

		customer.getCustomerTags().removeAll(customerTagsToRemove);
		customerTagRepository.deleteAll(customerTagsToRemove);

		List<Long> tagIds = customer.getCustomerTags().stream()
			.map(customerTag -> customerTag.getTag().getId())
			.toList();

		List<Long> tagIdsToAdd = curTags.stream()
			.filter(tagId -> !tagIds.contains(tagId))
			.toList();

		List<Tag> tagsToAdd = tagRepository.findByMemberIdAndTagIds(memberId, tagIdsToAdd);

		if (tagIdsToAdd.size() != tagsToAdd.size()) {
			throw new ApiException(ApiType.TAG_NOT_FOUND);
		}

		List<CustomerTag> customerTagsToAdd = tagsToAdd.stream()
			.map(tag -> new CustomerTag(customer, tag))
			.toList();

		customerTagRepository.saveAll(customerTagsToAdd);

		customerTagsToAdd.stream()
			.forEach(customerTag -> {
				customerTag.getCustomer().addCustomerTag(customerTag);
				customerTag.getTag().addCustomerTag(customerTag);
			});

		customer.setTagCount(customer.getCustomerTags().size());

		return mapper.toCustomerResponse(customer);
	}

	@Transactional
	public void delete(Long memberId, Long customerId) {
		// TODO: memberId 유효성 검사
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		// TODO: customerId 유효성 검사
		Customer customer = customerRepository.findByIdAndMemberId(customerId, memberId).orElseThrow(
			() -> new ApiException(ApiType.CUSTOMER_NOT_FOUND)
		);

		customerRepository.delete(customer);
		member.decreaseCustomerCount();
	}

	@Transactional
	public List<TagStatisticsResponse> getCustomerTagStatistics(Long memberId) {
		List<Customer> customers = customerRepository.findAllByMemberId(memberId);

		Map<String, Integer> tagCount = new HashMap<>();
		Map<String, String> tagColor = new HashMap<>();

		for (Customer customer : customers) {
			List<Tag> tags = customer.getTags();
			for (Tag tag : tags) {
				if (tagCount.containsKey(tag.getName())) {
					tagCount.put(tag.getName(), tagCount.get(tag.getName()) + 1);
				} else {
					tagCount.put(tag.getName(), 1);
					tagColor.put(tag.getName(), tag.getColor());
				}
			}
		}

		List<TagStatisticsResponse> responses = new ArrayList<>();
		for (Map.Entry<String, Integer> entry : tagCount.entrySet()) {
			responses.add(
				new TagStatisticsResponse(
					entry.getKey(),
					entry.getValue(),
					tagColor.get(entry.getKey())
				)
			);
		}
		Collections.sort(responses);
		return responses;
	}

	@Transactional
	public CustomerExcelResponse addCustomerExcel(Long memberId, AddCustomerExcelRequest request) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		List<AddCustomerRequest> errorCustomer = request.getCustomers().stream()
			.filter(addCustomer -> !customerRepository.findExistCustomer(memberId, addCustomer.getCustomerName(),
				addCustomer.getCustomerPhoneNumber()).isEmpty())
			.toList();

		if (!errorCustomer.isEmpty()) {
			throw new ApiException(ApiType.CUSTOMER_ALREADY_EXIST, errorCustomer);
		}

		List<Customer> customers = request.getCustomers().stream()
			.map(addCustomer -> mapper.toCustomer(addCustomer, member))
			.toList();

		customerRepository.saveAll(customers);

		member.setCustomerCount(member.getCustomerCount() + customers.size());

		return CustomerExcelResponse.builder()
			.customers(mapper.toCustomerListResponse(customers))
			.build();
	}
}
