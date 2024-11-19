package com.haneolenae.bobi.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberResponse {
    private String memberId;
    private String name;
    private String business;
    private String personalPhoneNumber;
    private String businessPhoneNumber;
}
