package com.haneolenae.bobi.domain.tag.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.tag.dto.request.TagCreateRequest;
import com.haneolenae.bobi.domain.tag.entity.Tag;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TagMapper {
	default Tag toTag(TagCreateRequest request, Member member) {
		return Tag.builder()
			.name(request.getName())
			.color(request.getColor())
			.member(member)
			.build();
	}
}
