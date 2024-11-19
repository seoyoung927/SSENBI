package com.haneolenae.bobi.domain.customer.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

import com.haneolenae.bobi.domain.customer.dto.request.AddCustomerRequest;
import com.haneolenae.bobi.domain.customer.dto.response.CustomerResponse;
import com.haneolenae.bobi.domain.customer.entity.Customer;
import com.haneolenae.bobi.domain.customer.entity.CustomerTag;
import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.tag.dto.response.TagResponse;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CustomerMapper {

	@Mapping(source = "id", target = "customerId")
	@Mapping(source = "name", target = "customerName")
	@Mapping(source = "age", target = "customerAge")
	@Mapping(source = "gender", target = "customerGender")
	@Mapping(source = "phoneNumber", target = "customerPhoneNumber")
	@Mapping(source = "customerTags", target = "customerTags", qualifiedByName = "tagsToTagResponses")
	@Mapping(source = "memo", target = "customerMemo")
	@Mapping(source = "color", target = "customerColor")
	CustomerResponse toCustomerResponse(Customer customer);

	@Named("tagsToTagResponses")
	default List<TagResponse> tagsToTagResponses(List<CustomerTag> customerTags) {
		return customerTags.stream()
			.map(CustomerTag::getTag)
			.map(tag -> TagResponse.builder()
				.tagId(tag.getId())
				.tagName(tag.getName())
				.tagColor(tag.getColor())
				.build())
			.collect(Collectors.toList());
	}

	default Customer toCustomer(AddCustomerRequest request, Member member) {
		return Customer.builder()
			.name(request.getCustomerName())
			.gender(request.getCustomerGender())
			.age(request.getCustomerAge())
			.phoneNumber(request.getCustomerPhoneNumber())
			.memo(request.getCustomerMemo())
			.color(request.getCustomerColor())
			.tagCount(request.getCustomerTags().size())
			.member(member)
			.templateCustomers(new ArrayList<>())
			.customerTags(new ArrayList<>())
			.build();
	}

	// List<Customer>를 List<CustomerResponse>로 변환하는 메서드
	default List<CustomerResponse> toCustomerListResponse(List<Customer> customers) {
		return customers.stream()
			.map(this::toCustomerResponse)  // 기존의 Customer -> CustomerResponse 변환 메서드를 호출
			.collect(Collectors.toList());
	}
}
