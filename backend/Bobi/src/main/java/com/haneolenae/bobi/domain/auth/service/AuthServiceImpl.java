package com.haneolenae.bobi.domain.auth.service;

import com.haneolenae.bobi.domain.auth.dto.request.LoginRequest;
import com.haneolenae.bobi.domain.auth.dto.response.TokenResponse;
import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.member.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthServiceImpl(MemberRepository memberRepository,PasswordEncoder passwordEncoder,
        JwtTokenProvider jwtTokenProvider) {
        this.memberRepository=memberRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public TokenResponse login(LoginRequest loginRequest) {
        Member member=memberRepository.findByMemberId(loginRequest.getLoginId())
            .orElseThrow(()->new RuntimeException("A40001"));

        if(!isSamePassword(loginRequest.getPassword(),member.getPassword())){
            throw new RuntimeException("A40001");
        }

        //토큰 발급
        String accessToken= jwtTokenProvider.createAccessToken(member.getId());
        String refreshToken= jwtTokenProvider.createRefreshToken(member.getId());

        return new TokenResponse(accessToken,refreshToken);
    }

    private boolean isSamePassword(String inputPassword,String encodePassword) {
        return passwordEncoder.matches(inputPassword, encodePassword);
    }
}
