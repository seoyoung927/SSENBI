package com.haneolenae.bobi.domain.message.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.haneolenae.bobi.domain.message.dto.response.MessageCustomerDto;
import com.haneolenae.bobi.domain.message.dto.response.MessageDetailResponse;
import com.haneolenae.bobi.domain.message.dto.response.MessageResponse;
import com.haneolenae.bobi.domain.message.dto.response.MessageTagDto;
import com.haneolenae.bobi.domain.message.entity.Message;
import com.haneolenae.bobi.domain.message.entity.MessageCustomer;
import com.haneolenae.bobi.domain.message.entity.MessageTag;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MessageMapper {

	@Mapping(source = "id", target = "messageId")
	@Mapping(source = "content", target = "messageContent")
	@Mapping(source = "createdAt", target = "messageSendAt")
	@Mapping(expression = "java(mapMessageTagDto(message.getMessageTags()))", target = "messageTags")
	MessageResponse toMessageResponse(final Message message);


	@Mapping(source = "id", target = "messageId")
	@Mapping(source = "content", target = "messageContent")
	@Mapping(source = "createdAt", target = "messageSendAt")
	@Mapping(expression = "java(mapMessageTagDto(message.getMessageTags()))", target = "messageTags")
	@Mapping(expression = "java(mapMessageCustomerDto(message.getMessageCustomers()))", target = "messageCustomers")
	MessageDetailResponse toMessageDetailResponse(final Message message);


	default List<MessageTagDto> mapMessageTagDto(final List<MessageTag> messageTags) {
		return messageTags.stream()
			.map(tag -> new MessageTagDto(tag.getName(), tag.getColor()))
			.toList();
	}

	default List<MessageCustomerDto> mapMessageCustomerDto(final List<MessageCustomer> messageCustomers) {
		return messageCustomers.stream()
			.map(customer -> new MessageCustomerDto(customer.getName(), customer.getColor()))
			.toList();
	}


}
