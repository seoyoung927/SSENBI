package com.haneolenae.bobi.domain.message.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDetailResponse {

	private int messageId;
	private String messageContent;
	private LocalDateTime messageSendAt;
	private List<MessageTagDto> messageTags;
	private List<MessageCustomerDto> messageCustomers;

}
