package com.haneolenae.bobi.domain.tag.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TagsResponse {
	List<TagResponse> tags;
}
