package com.haneolenae.bobi.domain.member.service;

import java.util.Optional;
import java.util.UUID;

import com.haneolenae.bobi.domain.member.dto.response.MemberResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.domain.member.dto.request.MemberRegistRequest;
import com.haneolenae.bobi.domain.member.dto.request.MemberUpdatePasswordRequest;
import com.haneolenae.bobi.domain.member.dto.request.MemberUpdateRequest;
import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.member.mapper.MemberMapper;
import com.haneolenae.bobi.domain.member.repository.MemberRepository;
import com.haneolenae.bobi.global.dto.ApiType;
import com.haneolenae.bobi.global.exception.ApiException;

import jakarta.transaction.Transactional;

@Service
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	private final MemberMapper memberMapper;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;

	public MemberServiceImpl(MemberRepository memberRepository, MemberMapper memberMapper,
		PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
		this.memberRepository = memberRepository;
		this.memberMapper = memberMapper;
		this.passwordEncoder = passwordEncoder;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@Override
	public MemberResponse get(String accessHeader) {
		String accessToken=jwtTokenProvider.getTokenFromHeader(accessHeader);
		Long id = jwtTokenProvider.getIdFromToken(accessToken);
		Member member = memberRepository.findById(id).orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		return memberMapper.toMember(member);
	}

	@Override
	public void regist(MemberRegistRequest memberRegistRequest) {
		if (alreadyExistMemberId(memberRegistRequest.getMemberId())) {
			throw new ApiException(ApiType.MEMBER_ALREADY_REGIST);
		}
		memberRegistRequest.setPassword(passwordEncoder.encode(memberRegistRequest.getPassword()));

		//generate
		Member member = memberMapper.toMember(memberRegistRequest);
		memberRepository.save(member);
	}

	@Transactional
	public void update(String accessHeader, MemberUpdateRequest request) {
		String accessToken=jwtTokenProvider.getTokenFromHeader(accessHeader);
		Long id = jwtTokenProvider.getIdFromToken(accessToken);
		Member member = memberRepository.findById(id).orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		member.update(request);
	}

	@Transactional
	public void updatePassword(String accessHeader, MemberUpdatePasswordRequest request) {
		String accessToken=jwtTokenProvider.getTokenFromHeader(accessHeader);
		Long id = jwtTokenProvider.getIdFromToken(accessToken);
		Member member = memberRepository.findById(id).orElseThrow(() -> new ApiException(ApiType.MEMBER_NOT_EXIST));

		if (isNotSamePassword(request.getPassword(), member.getPassword())) {
			throw new ApiException(ApiType.MEMBER_PASSWORD_INVALID);
		}

		member.updatePassword(passwordEncoder.encode(request.getChangePassword()));
	}

	private boolean alreadyExistMemberId(String memberId) {
		return memberRepository.findByMemberId(memberId).isPresent();
	}

	private boolean isNotSamePassword(String rawPassword, String encodedPassword) {
		return !passwordEncoder.matches(rawPassword, encodedPassword);
	}
}
