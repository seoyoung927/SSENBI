package com.haneolenae.bobi.domain.customer.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

import com.haneolenae.bobi.domain.customer.dto.response.CustomerResponse;
import com.haneolenae.bobi.domain.customer.entity.Customer;
import com.haneolenae.bobi.domain.tag.dto.response.TagResponse;
import com.haneolenae.bobi.domain.tag.entity.Tag;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CustomerMapper {

	@Mapping(source = "id", target = "customerId")
	@Mapping(source = "name", target = "customerName")
	@Mapping(source = "age", target = "customerAge")
	@Mapping(source = "gender", target = "customerGender")
	@Mapping(source = "phoneNumber", target = "customerPhoneNumber")
	@Mapping(source = "tags", target = "customerTags", qualifiedByName = "tagsToTagResponses")
	@Mapping(source = "memo", target = "customerMemo")
	CustomerResponse toCustomerResponse(Customer customer);

	@Named("tagsToTagResponses")
	default List<TagResponse> tagsToTagResponses(List<Tag> tags) {
		return tags.stream()
			.map(tag -> TagResponse.builder()
				.tagId(tag.getId())
				.tagName(tag.getName())
				.tagColor(tag.getColor())
				.build())
			.collect(Collectors.toList());
	}

	// List<Customer>를 List<CustomerResponse>로 변환하는 메서드
	default List<CustomerResponse> toCustomerListResponse(List<Customer> customers) {
		return customers.stream()
			.map(this::toCustomerResponse)  // 기존의 Customer -> CustomerResponse 변환 메서드를 호출
			.collect(Collectors.toList());
	}
}
