package com.haneolenae.bobi.domain.member.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.haneolenae.bobi.domain.general.dto.response.CategoryTemplatesResponse;
import com.haneolenae.bobi.domain.member.dto.MemberRegistRequest;
import com.haneolenae.bobi.domain.member.entity.Member;

import java.util.UUID;
import java.util.stream.Collectors;

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
}

