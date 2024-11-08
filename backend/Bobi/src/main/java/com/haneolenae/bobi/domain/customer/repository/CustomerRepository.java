package com.haneolenae.bobi.domain.customer.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.haneolenae.bobi.domain.customer.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	List<Customer> findByMemberIdAndIdIn(long memberId, List<Long> customerIds);

	@Query("SELECT c FROM Customer c WHERE c.member.id = :memberId " +
		"AND (c.name = :name OR c.phoneNumber = :phoneNumber)")
	List<Customer> findExistCustomer(
		@Param("memberId") Long memberId,
		@Param("name") String name,
		@Param("phoneNumber") String phoneNumber
	);

	@Query("SELECT c FROM Customer c WHERE c.member.id = :memberId AND c.id IN :customerIds")
	Set<Customer> findByMemberIdAndCustomerIdIn(@Param("memberId") Long memberId,
		@Param("customerIds") List<Long> customerIds);

	List<Customer> findByIdIn(List<Long> customerIds);

	@Query("SELECT DISTINCT c FROM Customer c " +
		"LEFT JOIN FETCH c.customerTags ct " +
		"WHERE c.member.id = :memberId " +
		"AND (:tags IS NULL OR EXISTS (" +
		"    SELECT 1 FROM CustomerTag ct2 " +
		"    WHERE ct2.customer = c " +
		"    AND ct2.tag.id IN :tags" +
		"))")
	List<Customer> findALlByMemberIdAndTags(@Param("memberId") Long memberId, @Param("tags") List<Long> tags);

	Optional<Customer> findByIdAndMemberId(long customerId, long memberId);

	@Query("SELECT t.id FROM Customer  t WHERE t.member.id = :memberId And t.id IN :customerIds")
	Set<Long> findCustomerIdByMemberIdAndIdIn(long memberId, List<Long> customerIds);

	@Query("SELECT DISTINCT c FROM Customer c " +
		"LEFT JOIN FETCH c.customerTags ct " +
		"WHERE c.member.id = :memberId " +
		"AND (:keyword IS NULL OR c.name LIKE CONCAT('%', :keyword, '%')"
		+ "OR c.phoneNumber LIKE CONCAT('%', :keyword, '%')"
		+ "OR c.memo LIKE CONCAT('%', :keyword, '%')) " +
		"AND (:tags IS NULL OR EXISTS (" +
		"    SELECT 1 FROM CustomerTag ct2 " +
		"    WHERE ct2.customer = c " +
		"    AND ct2.tag.id IN :tags" +
		"))")
	List<Customer> findAllByMemberIdAndKeywordAndTags(@Param("memberId") Long memberId,
		@Param("keyword") String keyword,
		@Param("tags") List<Long> tags);

	//
	// // @Query("SELECT c FROM Customer c " +
	// // 	"JOIN c.tags t " +
	// // 	"WHERE c.member.id = :memberId " +
	// // 	"AND (:keyword IS NULL OR c.name LIKE CONCAT('%', :keyword, '%')) " +
	// // 	"AND (:tags IS NULL OR t.id IN :tags)")
	// @Query("SELECT c FROM Customer c " +
	// 	"JOIN c.tags t " +
	// 	"WHERE c.member.id = :memberId ")
	// // "AND (:keyword IS NULL OR c.name LIKE '%a%' )")
	// // "AND (:keyword IS NULL OR c.name LIKE CONCAT('%', :keyword, '%')) ")
	// // "AND (:tags IS NULL OR t.id IN :tags)")
	// List<Customer> findCustomers(Long memberId);
	//
	// List<Customer> findAllByMemberId(Long memberId);
	//
	// @Query("SELECT c FROM Customer c WHERE c.member.id = :memberId AND (:keyword IS NULL OR c.name LIKE %:keyword%)")
	// List<Customer> findAllByMemberIdAndNameContaining(@Param("memberId") Long memberId,
	// 	@Param("keyword") String keyword);
	//
	// @Query("SELECT DISTINCT c FROM Customer c " +
	// 	"JOIN c.tags t " +
	// 	"WHERE c.member.id = :memberId " +
	// 	"AND (:keyword IS NULL OR c.name LIKE %:keyword%) " +
	// 	"AND (t.id IN :tags)")
	// List<Customer> findAllByMemberIdAndNameContainingAndTagsIn(
	// 	@Param("memberId") Long memberId,
	// 	@Param("keyword") String keyword,
	// 	@Param("tags") List<Long> tags);
}
