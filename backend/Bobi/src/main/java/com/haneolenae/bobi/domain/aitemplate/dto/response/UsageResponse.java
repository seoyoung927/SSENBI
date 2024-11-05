package com.haneolenae.bobi.domain.aitemplate.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsageResponse {
	private int promptTokens;
	private int completionTokens;
	private int totalTokens;
	private PromptTokensDetailsResponse promptTokensDetails;
	private CompletionTokensDetailsResponse completionTokensDetails;
}
