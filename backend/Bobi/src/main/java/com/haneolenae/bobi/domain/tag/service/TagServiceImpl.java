package com.haneolenae.bobi.domain.tag.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.member.repository.MemberRepository;
import com.haneolenae.bobi.domain.tag.dto.request.TagCreateRequest;
import com.haneolenae.bobi.domain.tag.dto.request.TagUpdateRequest;
import com.haneolenae.bobi.domain.tag.dto.response.TagResponse;
import com.haneolenae.bobi.domain.tag.dto.response.TagsResponse;
import com.haneolenae.bobi.domain.tag.entity.Tag;
import com.haneolenae.bobi.domain.tag.mapper.TagMapper;
import com.haneolenae.bobi.domain.tag.repository.TagRepository;
import com.haneolenae.bobi.domain.tag.util.TagColor;
import com.haneolenae.bobi.global.dto.ApiType;
import com.haneolenae.bobi.global.exception.ApiException;

import jakarta.transaction.Transactional;

@Service
public class TagServiceImpl implements TagService {
	private final TagRepository tagRepository;
	private final MemberRepository memberRepository;
	private final TagMapper tagMapper;

	public TagServiceImpl(TagRepository tagRepository, MemberRepository memberRepository, TagMapper tagMapper) {
		this.tagRepository = tagRepository;
		this.memberRepository = memberRepository;
		this.tagMapper = tagMapper;
	}

	@Override
	public TagsResponse getAll(Long memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		return tagMapper.toTag(tagRepository.findByMember(member));
	}

	@Transactional
	public TagResponse update(Long memberId, TagUpdateRequest request) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		if (TagColor.notExistColor(request.getColor())) {
			throw new ApiException(ApiType.TAG_COLOR_INVALID);
		}

		Tag tag = tagRepository.findByIdAndMemberId(request.getId(), memberId)
			.orElseThrow(() -> new ApiException(ApiType.TAG_MEMBER_INVALID));

		if (isNameExist(memberId, request.getName()) && !tag.getName().equals(request.getName())) {
			throw new ApiException(ApiType.TAG_NAME_EXIST);
		}

		tag.update(request);

		return tagMapper.toTag(tag);
	}

	@Override
	public TagResponse create(Long memberId, TagCreateRequest request) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		if (TagColor.notExistColor(request.getColor())) {
			throw new ApiException(ApiType.TAG_COLOR_INVALID);
		}

		if (isNameExist(memberId, request.getName())) {
			throw new ApiException(ApiType.TAG_NAME_EXIST);
		}

		Tag tag = tagMapper.toTag(request, member);
		return tagMapper.toTag(tagRepository.save(tag));
	}

	private boolean isNameExist(Long id, String name) {
		return tagRepository.findByNameAndMemberId(name, id).isPresent();
	}
}
