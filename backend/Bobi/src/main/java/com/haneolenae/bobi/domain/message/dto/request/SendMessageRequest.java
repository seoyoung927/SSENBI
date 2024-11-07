package com.haneolenae.bobi.domain.message.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SendMessageRequest {
	@NotNull(message = "고객의 아이디 배열이 null입니다.")
	List<Long> messageCustomerIds;
	@NotNull(message = "메시지 태그 배열이 null입니다.")
	List<Long> messageTagIds;
	String messageContent;
}
