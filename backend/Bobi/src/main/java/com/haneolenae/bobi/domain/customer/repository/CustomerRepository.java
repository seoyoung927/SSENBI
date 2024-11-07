package com.haneolenae.bobi.domain.customer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.haneolenae.bobi.domain.customer.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	List<Customer> findByMemberIdAndIdIn(long memberId, List<Long> customerIds);

	Optional<Customer> findByIdAndMemberId(long customerId, long memberId);
}
