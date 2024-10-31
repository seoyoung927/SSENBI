package com.haneolenae.bobi.domain.message.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.haneolenae.bobi.domain.tag.entity.Tag;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageListResponse {

	private int messageId;
	private String messageContent;
	private LocalDateTime sendAt;
	private List<Tag> tags;
}
