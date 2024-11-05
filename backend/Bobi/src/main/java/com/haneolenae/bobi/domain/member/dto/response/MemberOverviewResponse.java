package com.haneolenae.bobi.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberOverviewResponse {
	private int customerCount;
	private int messageCount;
}
