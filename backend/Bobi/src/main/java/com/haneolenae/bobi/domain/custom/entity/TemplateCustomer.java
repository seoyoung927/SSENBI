package com.haneolenae.bobi.domain.custom.entity;

import com.haneolenae.bobi.domain.customer.entity.Customer;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class TemplateCustomer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "custom_template_id")
	private CustomTemplate customTemplate;

	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Customer customer;
}
