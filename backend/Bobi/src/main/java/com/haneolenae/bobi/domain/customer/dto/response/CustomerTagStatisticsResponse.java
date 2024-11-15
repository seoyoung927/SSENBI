package com.haneolenae.bobi.domain.customer.dto.response;

import java.util.List;

import com.haneolenae.bobi.domain.tag.dto.response.TagStatisticsResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerTagStatisticsResponse {
	List<TagStatisticsResponse> tagStatistics;

}
