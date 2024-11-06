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

	@Query("SELECT c FROM Customer c " +
		"JOIN c.tags t " + // tags와 Customer를 조인
		"WHERE c.member.id = :memberId " +
		"AND (:keyword IS NULL OR c.name LIKE %:keyword%) " +
		"AND (:tags IS NULL OR t.id IN :tags)")
		// tags 리스트에서 태그를 검색
	Page<Customer> findCustomers(Long memberId, Pageable pageable, List<Long> tags, String keyword);

}
