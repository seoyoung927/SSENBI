package com.haneolenae.bobi.domain.message.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.haneolenae.bobi.domain.message.entity.MessageCustomer;

public interface MessageCustomerRepository extends JpaRepository<MessageCustomer, Long> {

}
