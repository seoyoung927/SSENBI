package com.haneolenae.bobi.domain.message.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haneolenae.bobi.domain.customer.entity.Customer;
import com.haneolenae.bobi.domain.customer.repository.CustomerRepository;
import com.haneolenae.bobi.domain.customer.repository.CustomerTagRepository;
import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.member.repository.MemberRepository;
import com.haneolenae.bobi.domain.message.dto.request.SendMessageRequest;
import com.haneolenae.bobi.domain.message.dto.response.MessageDetailResponse;
import com.haneolenae.bobi.domain.message.dto.response.MessageResponse;
import com.haneolenae.bobi.domain.message.entity.Message;
import com.haneolenae.bobi.domain.message.entity.MessageCustomer;
import com.haneolenae.bobi.domain.message.entity.MessageTag;
import com.haneolenae.bobi.domain.message.mapper.MessageMapper;
import com.haneolenae.bobi.domain.message.repository.MessageCustomerRepository;
import com.haneolenae.bobi.domain.message.repository.MessageRepository;
import com.haneolenae.bobi.domain.message.repository.MessageTagRepository;
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
	private final CustomerTagRepository customerTagRepository;
	private final TagRepository tagRepository;
	private final MessageRepository messageRepository;
	private final MessageCustomerRepository messageCustomerRepository;
	private final MessageTagRepository messageTagRepository;

	private final MessageMapper messageMapper;


	@Transactional
	public void sendMessage(long memberId, SendMessageRequest sendMessageRequest) {

		// TODO: 멤버 유효성 검사
		Member sender = memberRepository.findById(memberId)
			.orElseThrow(() ->new ApiException(ApiType.MEMBER_NOT_FOUND));

		Message originMessage = Message.builder()
			.content(sendMessageRequest.getMessage())
			.member(sender)
			.build();

		Set<Customer> finalReceiverIdSet = new HashSet<>();

		// TODO: 받는이 유효성 검사
		for(long receiverId : sendMessageRequest.getReceiverIdList()){
			Customer customer = customerRepository.findById(receiverId)
				.orElseThrow(() -> new ApiException(ApiType.CUSTOMER_NOT_FOUND));

			// 최종 발송 고객 리스트에 추가
			finalReceiverIdSet.add(customer);
		}

		// TODO: 태그 유효성 검사
		List<MessageTag> messageTagList = new ArrayList<>();
		for(long tagId : sendMessageRequest.getTagIdList()){
			Tag tag = tagRepository.findByIdAndMemberId(tagId, memberId)
				.orElseThrow(() -> new ApiException(ApiType.TAG_NOT_FOUND));

			messageTagList.add(MessageTag.builder()
				.name(tag.getName())
				.color(tag.getColor())
				.message(originMessage)
				.build());
		}
		// TODO: messageTag 저장
		messageTagRepository.saveAll(messageTagList);

		// 태그에 해당하는 고객 조회
		List<Customer> customers = customerTagRepository.findCustomersByTagIds(sendMessageRequest.getTagIdList());

		// 최종 발송 고객 리스트에 추가
		finalReceiverIdSet.addAll(customers);

		// TODO: 메시지 저장
		messageRepository.save(originMessage);

		// for message 보내기
		for(Customer customer : finalReceiverIdSet){

			log.info("고객에게 메시지 전송 : " + customer.getId());

			// TODO: 고객에 맞는 메시지 생성
			String msg = "test msg";

			// TODO: 메시지 전송 외부 API 호출

			boolean sendResult = true;

			if (sendResult){
				// TODO: 전송 성공 시 DB 저장

				// messageCustomer
				messageCustomerRepository.save(MessageCustomer.builder()
						.name(customer.getName())
						.phoneNumber(customer.getPhoneNumber())
						.color(customer.getColor())
						.message(originMessage)
					.build());
			}else{
				// TODO: 전송 실패 시 예외 처리
				throw new ApiException(ApiType.CUSTOMER_NOT_FOUND);
			}

			// TODO: 실패한 사람 리스트 반환해줘야 함
		}
	}

	@Override
	public List<MessageResponse> getMessageList(long memberId, String keyword) {

		// TODO: 멤버 유효성 검사
		Member sender = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_FOUND));

		// TODO: 검색어로 검색
		List<Message> messages = messageRepository.findMessagesByKeywordAndMemberId(keyword, memberId);

		return messages.stream()
			.map(messageMapper::toMessageResponse)
			.toList();
	}

	@Override
	public MessageDetailResponse getMessageDetail(long memberId, long messageId) {

		// TODO: 멤버 유효성 검사
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() ->new ApiException(ApiType.MEMBER_NOT_FOUND));

		// TODO: message 가져오기
		Message message = messageRepository.findByIdAndMemberId(messageId, member.getId())
			.orElseThrow(() -> new ApiException(ApiType.MESSAGE_NOT_FOUND));

		return messageMapper.toMessageDetailResponse(message);
	}
}
