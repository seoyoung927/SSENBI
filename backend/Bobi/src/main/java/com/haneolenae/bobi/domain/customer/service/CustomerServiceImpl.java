package com.haneolenae.bobi.domain.customer.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haneolenae.bobi.domain.customer.dto.request.AddCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.request.UpdateCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.response.CustomerResponse;
import com.haneolenae.bobi.domain.customer.entity.Customer;
import com.haneolenae.bobi.domain.customer.mapper.CustomerMapper;
import com.haneolenae.bobi.domain.customer.repository.CustomerRepository;
import com.haneolenae.bobi.domain.customer.repository.CustomerTagRepository;
import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.member.repository.MemberRepository;
import com.haneolenae.bobi.domain.tag.entity.Tag;
import com.haneolenae.bobi.domain.tag.repository.TagRepository;
import com.haneolenae.bobi.global.dto.ApiType;
import com.haneolenae.bobi.global.exception.ApiException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

	private final CustomerRepository customerRepository;
	private final CustomerTagRepository customerTagRepository;
	private final MemberRepository memberRepository;
	private final TagRepository tagRepository;

	private final CustomerMapper mapper;

	@Transactional
	public void addCustomer(long memberId, AddCustomerRequest request) {
		// TODO: memberId 유효성 검사
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		// TODO: request 유효성 검사

		// TODO: tags 유효성 검사
		List<Tag> retrievedTags = customerTagRepository.findTagsByMemberIdAndTagIds(memberId, request.getTags());
		if (retrievedTags.size() != request.getTags().size()) {
			throw new ApiException(ApiType.TAG_NOT_FOUND);
		}

		// TODO: 고객 추가
		// Customer customer = customerMapper.toCustomer(request); 희망사항
		Customer customer = Customer.builder()
			.name(request.getName())
			.gender(request.getGender())
			.age(request.getAge())
			.phoneNumber(request.getPhoneNumber())
			.memo(request.getMemo())
			.color(request.getColor())
			.tagCount(request.getTags().size())
			.member(member)
			.build();

		customerRepository.save(customer);
	}

	@Override
	public CustomerResponse getCustomerDetail(long memberId, long customerId) {

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
	public CustomerResponse updateCustomer(long memberId, UpdateCustomerRequest request) {

		// TODO: memberId 유효성 검사
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		// TODO: customerId 유효성 검사
		Customer customer = customerRepository.findByIdAndMemberId(request.getId(), memberId).orElseThrow(
			() -> new ApiException(ApiType.CUSTOMER_NOT_FOUND)
		);

		customer.update(request);

		// 이전 태그 ID 목록
		List<Integer> prevTags = request.getPrevTags();
		// 현재 태그 ID 목록
		List<Integer> curTags = request.getCurTags();

		// 이전 태그 제거
		if (prevTags != null) {
			List<Tag> tagsToRemove = customer.getTags().stream()
				.filter(tag -> !curTags.contains(tag.getId().intValue())) // 현재 태그에 없는 태그 필터링
				.toList();
			customer.getTags().removeAll(tagsToRemove);
		}

		// 현재 태그 추가
		if (curTags != null) {
			for (Integer tagId : curTags) {
				if (prevTags == null || !prevTags.contains(tagId)) { // 이전 태그에 없는 경우만 추가
					Tag tag = tagRepository.findById(tagId.longValue())
						.orElseThrow(() -> new ApiException(ApiType.TAG_NOT_FOUND)); // 적절한 예외 처리 필요
					customer.getTags().add(tag);
				}
			}
		}

		// 고객 정보를 저장하여 업데이트 반영
		customerRepository.save(customer);

		return mapper.toCustomerResponse(customer);
	}
}
