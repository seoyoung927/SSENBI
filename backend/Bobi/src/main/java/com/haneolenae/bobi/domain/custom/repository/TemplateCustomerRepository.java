package com.haneolenae.bobi.domain.custom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.haneolenae.bobi.domain.custom.entity.TemplateCustomer;

public interface TemplateCustomerRepository extends CrudRepository<TemplateCustomer, Long> {
	List<TemplateCustomer> findByCustomerIdIn(List<Long> customerIds);

	@Modifying
	@Query("DELETE FROM TemplateCustomer t WHERE t.customTemplate.id = :customTemplateId")
	void deleteByCustomTemplateId(Long customTemplateId);

	void deleteByCustomerId(Long customerId);

	void deleteByCustomerIdAndCustomTemplateId(Long customerId, Long customTemplateId);
}
