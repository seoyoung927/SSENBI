package com.haneolenae.bobi.domain.tag.dto.response;

import org.jetbrains.annotations.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TagStatisticsResponse implements Comparable<TagStatisticsResponse> {
	private String tagName;
	private int tagCount;
	private String tagColor;

	@Override
	public int compareTo(@NotNull TagStatisticsResponse o) {
		return o.tagCount - this.tagCount;
	}
}
