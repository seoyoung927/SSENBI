package com.haneolenae.bobi.domain.member.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.domain.member.dto.request.MemberRegistRequest;
import com.haneolenae.bobi.domain.member.dto.request.MemberUpdateRequest;
import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.member.mapper.MemberMapper;
import com.haneolenae.bobi.domain.member.repository.MemberRepository;

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
	public void regist(MemberRegistRequest memberRegistRequest) {
		if (alreadyExistMemberId(memberRegistRequest.getMemberId())) {
			throw new RuntimeException("C40003");
		}
		memberRegistRequest.setPassword(passwordEncoder.encode(memberRegistRequest.getPassword()));

		//generate
		Member member = memberMapper.toMember(memberRegistRequest);
		memberRepository.save(member);
	}

	@Override
	public void update(String accessToken, MemberUpdateRequest request) {
		Long id = jwtTokenProvider.getIdFromToken(accessToken);
		Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("M40001"));
		//TODO: request의 정합성 체크

		member.update(request);
		memberRepository.save(member);
	}

	private boolean alreadyExistMemberId(String memberId) {
		return memberRepository.findByMemberId(memberId).isPresent();
	}
}
