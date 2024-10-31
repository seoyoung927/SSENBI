package com.haneolenae.bobi.domain.message.service;

import com.haneolenae.bobi.domain.message.dto.request.SendMessageRequest;
import com.haneolenae.bobi.domain.message.entity.Message;

public interface MessageService {

	void saveMessage(Message message);

	void sendMessage(long memberId, SendMessageRequest sendMessageRequest);
}
