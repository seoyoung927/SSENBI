package com.haneolenae.bobi.domain.customer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.haneolenae.bobi.domain.customer.entity.Customer;
import com.haneolenae.bobi.domain.customer.entity.CustomerTag;
import com.haneolenae.bobi.domain.tag.entity.Tag;

public interface CustomerTagRepository extends JpaRepository<CustomerTag, Long> {

	@Query("SELECT ct.customer FROM CustomerTag ct WHERE ct.tag.id IN :tagIds")
	List<Customer> findCustomersByTagIds(@Param("tagIds") List<Long> tagIds);

	@Query("SELECT ct.tag FROM CustomerTag ct " +
		"JOIN ct.customer c " +
		"JOIN c.member m " +
		"WHERE m.id = :memberId AND ct.tag.id IN :tagIds")
	List<Tag> findTagsByMemberIdAndTagIds(@Param("memberId") Long memberId,
		@Param("tagIds") List<Long> tagIds);
}
