package com.haneolenae.bobi.domain.message.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.haneolenae.bobi.domain.message.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
