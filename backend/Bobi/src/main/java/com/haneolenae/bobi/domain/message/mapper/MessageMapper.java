package com.haneolenae.bobi.domain.message.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.haneolenae.bobi.domain.message.dto.response.MessageResponse;
import com.haneolenae.bobi.domain.message.dto.response.MessageTagDto;
import com.haneolenae.bobi.domain.message.entity.Message;
import com.haneolenae.bobi.domain.message.entity.MessageTag;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MessageMapper {

	@Mapping(source = "id", target = "messageId")
	@Mapping(source = "content", target = "messageContent")
	@Mapping(source = "createdAt", target = "sendAt")
	@Mapping(expression = "java(mapMessageTagDto(message.getMessageTags()))", target = "tags")
	MessageResponse toMessageResponse(final Message message);

	default List<MessageTagDto> mapMessageTagDto(final List<MessageTag> messageTags) {
		return messageTags.stream()
			.map(tag -> new MessageTagDto(tag.getName(), tag.getColor()))
			.toList();
	}
}
