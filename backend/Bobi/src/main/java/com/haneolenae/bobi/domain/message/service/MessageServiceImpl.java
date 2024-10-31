package com.haneolenae.bobi.domain.message.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.haneolenae.bobi.domain.customer.entity.Customer;
import com.haneolenae.bobi.domain.customer.repository.CustomerRepository;
import com.haneolenae.bobi.domain.customer.repository.CustomerTagRepository;
import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.member.repository.MemberRepository;
import com.haneolenae.bobi.domain.message.dto.request.SendMessageRequest;
import com.haneolenae.bobi.domain.message.entity.Message;
import com.haneolenae.bobi.domain.tag.entity.Tag;
import com.haneolenae.bobi.domain.tag.repository.TagRepository;
import com.haneolenae.bobi.global.dto.ApiType;
import com.haneolenae.bobi.global.exception.ApiException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

	private static final Logger log = LoggerFactory.getLogger(MessageServiceImpl.class);
	private final MemberRepository memberRepository;
	private final CustomerRepository customerRepository;
	private final TagRepository tagRepository;
	private final CustomerTagRepository customerTagRepository;

	@Override
	public void saveMessage(Message message) {

	}

	@Override
	public void sendMessage(long memberId, SendMessageRequest sendMessageRequest) {
		// memberId가 유효성 검사
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() ->new ApiException(ApiType.MEMBER_NOT_FOUND));

		Set<Customer> finalReceiverIdSet = new HashSet<>();

		// 개인 받는이 유효성 검사
		for(long receiverId : sendMessageRequest.getReceiverIdList()){
			Customer customer = customerRepository.findById(receiverId)
				.orElseThrow(() -> new ApiException(ApiType.CUSTOMER_NOT_FOUND));

			// 최종 발송 고객 리스트에 추가
			finalReceiverIdSet.add(customer);
		}

		for(long tagId : sendMessageRequest.getTagIdList()){
			// tag 유효성 검사 -> 인데 이 사용자에 맞는 태그인지도 확인해야 함
			Tag tag = tagRepository.findByIdAndMemberId(tagId, memberId)
				.orElseThrow(() -> new ApiException(ApiType.TAG_NOT_FOUND));
		}
		// 태그에 해당하는 고객 조회
		// List<Customer> customers = customerRepository.findByTags(tagId);
		List<Customer> customers = customerTagRepository.findCustomersByTagIds(sendMessageRequest.getTagIdList());

		// 최종 발송 고객 리스트에 추가
		finalReceiverIdSet.addAll(customers);

		// for message 보내기
		for(Customer customer : finalReceiverIdSet){

			log.info("고객에게 메시지 전송 : " + customer.getId());


			// 중간에 메시지 보내기 실패할 경우 처리 필요
		}
	}
}
