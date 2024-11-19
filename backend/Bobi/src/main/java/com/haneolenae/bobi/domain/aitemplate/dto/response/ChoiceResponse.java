package com.haneolenae.bobi.domain.aitemplate.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChoiceResponse {
	private int index;
	private MessageResponse message;
	private String finishReason;
}
