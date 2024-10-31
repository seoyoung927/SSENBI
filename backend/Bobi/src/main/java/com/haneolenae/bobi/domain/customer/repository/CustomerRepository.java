package com.haneolenae.bobi.domain.customer.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.haneolenae.bobi.domain.customer.entity.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Long> {
	List<Customer> findByIdIn(List<Long> customerIds);
}
