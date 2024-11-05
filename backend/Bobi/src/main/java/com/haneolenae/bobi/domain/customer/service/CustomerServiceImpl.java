package com.haneolenae.bobi.domain.customer.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haneolenae.bobi.domain.customer.dto.request.AddCustomerRequest;
import com.haneolenae.bobi.domain.customer.entity.Customer;
import com.haneolenae.bobi.domain.customer.repository.CustomerRepository;
import com.haneolenae.bobi.domain.customer.repository.CustomerTagRepository;
import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.member.repository.MemberRepository;
import com.haneolenae.bobi.domain.tag.entity.Tag;
import com.haneolenae.bobi.global.dto.ApiType;
import com.haneolenae.bobi.global.exception.ApiException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

	private final CustomerRepository customerRepository;
	private final CustomerTagRepository customerTagRepository;
	private final MemberRepository memberRepository;

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
}
