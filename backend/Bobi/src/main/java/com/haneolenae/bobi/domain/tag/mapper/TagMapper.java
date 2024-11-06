package com.haneolenae.bobi.domain.tag.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.tag.dto.request.TagRequest;
import com.haneolenae.bobi.domain.tag.dto.response.TagResponse;
import com.haneolenae.bobi.domain.tag.dto.response.TagsResponse;
import com.haneolenae.bobi.domain.tag.entity.Tag;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TagMapper {
	default Tag toTag(TagRequest request, Member member) {
		return Tag.builder()
			.name(request.getName())
			.color(request.getColor())
			.member(member)
			.build();
	}

	default TagsResponse toTag(List<Tag> tags) {
		return TagsResponse.builder()
			.tags(tags.stream().map(this::toTag)
				.toList())
			.build();

	}

	@Mapping(source = "tag.id", target = "id")
	@Mapping(source = "tag.name", target = "name")
	@Mapping(source = "tag.color", target = "color")
	TagResponse toTag(Tag tag);

}
