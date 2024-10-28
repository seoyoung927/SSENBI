package com.haneolenae.bobi.domain.member.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.haneolenae.bobi.domain.member.dto.MemberRegistRequest;
import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.member.mapper.MemberMapper;
import com.haneolenae.bobi.domain.member.repository.MemberRepository;

@Service
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	private final MemberMapper memberMapper;
	private final PasswordEncoder passwordEncoder;

	public MemberServiceImpl(MemberRepository memberRepository, MemberMapper memberMapper,
		PasswordEncoder passwordEncoder) {
		this.memberRepository = memberRepository;
		this.memberMapper = memberMapper;
		this.passwordEncoder = passwordEncoder;
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

	private boolean alreadyExistMemberId(String memberId) {
		return memberRepository.findByMemberId(memberId).isPresent();
	}
}
