package com.haneolenae.bobi.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberOverviewResponse {
	private String name;
	private int customerCount;
	private int messageCount;
}
