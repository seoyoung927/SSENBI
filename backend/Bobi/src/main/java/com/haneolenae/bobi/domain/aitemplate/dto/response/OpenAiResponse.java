package com.haneolenae.bobi.domain.aitemplate.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OpenAiResponse {
	private String id;
	private String object;
	private long created;
	private String model;
	private List<ChoiceResponse> choices;
	private UsageResponse usage;

	public String getContent() {
		return choices.get(0).getMessage().getContent();
	}
}
