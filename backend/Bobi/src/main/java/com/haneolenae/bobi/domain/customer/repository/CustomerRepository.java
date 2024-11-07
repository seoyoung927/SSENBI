package com.haneolenae.bobi.domain.customer.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.haneolenae.bobi.domain.customer.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	List<Customer> findByMemberIdAndIdIn(long memberId, List<Long> customerIds);

	Optional<Customer> findByIdAndMemberId(long customerId, long memberId);

	@Query("SELECT t.id FROM Customer  t WHERE t.member.id = :memberId And t.id IN :customerIds")
	Set<Long> findCustomerIdByMemberIdAndIdIn(long memberId, List<Long> customerIds);
}
