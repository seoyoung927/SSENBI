package com.haneolenae.bobi.domain.message.dto.request;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SendMessageRequest {
	List<Long> receiverIdList;
	List<Long> tagIdList;
	String message;
}
