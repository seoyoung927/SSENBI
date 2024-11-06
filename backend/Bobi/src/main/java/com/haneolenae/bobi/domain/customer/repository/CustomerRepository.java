package com.haneolenae.bobi.domain.customer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.haneolenae.bobi.domain.customer.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	List<Customer> findByIdIn(List<Long> customerIds);

	Optional<Customer> findByIdAndMemberId(long customerId, long memberId);

	// 동적 쿼리를 사용하여 고객 목록을 조회
	@Query("SELECT c FROM Customer c " +
		"WHERE c.member.id = :memberId " +
		"AND (:keyword IS NULL OR c.name LIKE %:keyword%) " +
		"AND (:tags IS NULL OR c.tags IN (SELECT t.customerId FROM Tag t WHERE t.tagId IN :customerTags))")
	Page<Customer> findCustomers(Long memberId, Pageable pageable, List<Long> tags, String keyword);

}
