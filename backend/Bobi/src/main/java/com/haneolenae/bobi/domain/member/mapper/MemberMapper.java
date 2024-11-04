package com.haneolenae.bobi.domain.member.mapper;

import com.haneolenae.bobi.domain.member.dto.response.MemberResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.haneolenae.bobi.domain.member.dto.request.MemberRegistRequest;
import com.haneolenae.bobi.domain.member.entity.Member;

import java.util.UUID;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper {

	default Member toMember(MemberRegistRequest memberRegistRequest) {
		if (memberRegistRequest == null) {
			throw new RuntimeException("A40001");
		}

		return Member.builder()
			.memberId(memberRegistRequest.getMemberId())
			.password(memberRegistRequest.getPassword())
			.name(memberRegistRequest.getName())
			.business(memberRegistRequest.getBusiness())
			.personalPhoneNumber(memberRegistRequest.getPersonalPhoneNumber())
			.businessPhoneNumber(memberRegistRequest.getBusinessPhoneNumber())
			.uuid(UUID.randomUUID())
			.build();
	}

	@Mapping(source = "member.memberId", target = "memberId")
	@Mapping(source = "member.name", target = "name")
	@Mapping(source = "member.business", target = "business")
	@Mapping(source = "member.personalPhoneNumber", target = "personalPhoneNumber")
	@Mapping(source = "member.businessPhoneNumber", target = "businessPhoneNumber")
	MemberResponse toMember(Member member);


}

