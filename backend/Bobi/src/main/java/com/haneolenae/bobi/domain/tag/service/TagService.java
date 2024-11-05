package com.haneolenae.bobi.domain.tag.service;

import com.haneolenae.bobi.domain.tag.dto.request.TagCreateRequest;
import com.haneolenae.bobi.domain.tag.dto.response.TagResponse;

public interface TagService {
	public TagResponse create(Long memberId, TagCreateRequest request);
}
