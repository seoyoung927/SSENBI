package com.haneolenae.bobi.domain.tag.service;

import com.haneolenae.bobi.domain.tag.dto.request.TagRequest;
import com.haneolenae.bobi.domain.tag.dto.request.TagDeleteRequest;
import com.haneolenae.bobi.domain.tag.dto.request.TagUpdateRequest;
import com.haneolenae.bobi.domain.tag.dto.response.TagResponse;
import com.haneolenae.bobi.domain.tag.dto.response.TagsResponse;

public interface TagService {
	public TagResponse create(Long memberId, TagRequest request);

	public TagsResponse getAll(Long memberId);

	public TagResponse update(Long memberId, Long tagId, TagRequest request);

	public void delete(Long memberId, Long tagId);
}
