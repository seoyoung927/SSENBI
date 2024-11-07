package com.haneolenae.bobi.domain.customer.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.haneolenae.bobi.domain.custom.entity.TemplateCustomer;
import com.haneolenae.bobi.domain.customer.dto.request.UpdateCustomerRequest;
import com.haneolenae.bobi.domain.member.entity.Member;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String name;

	@Column
	private Gender gender;

	@Column
	private Integer age;

	@Column
	private String phoneNumber;

	@Column
	private String memo;

	@Column
	private String color;

	@Column
	private int tagCount;

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
	private List<CustomerTag> customerTags = new ArrayList<>();

	@Column
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime createdAt;

	@Column
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime updatedAt;

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
	private List<TemplateCustomer> templateCustomers;

	@ManyToOne
	private Member member;

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		Customer customer = (Customer)o;
		return id != null && id.equals(customer.id);
	}

	@Override
	public int hashCode() {
		return id != null ? id.hashCode() : 0;
	}

	public void update(UpdateCustomerRequest request) {
		this.name = request.getCustomerName();
		this.gender = request.getCustomerGender();
		this.age = request.getCustomerAge();
		this.phoneNumber = request.getCustomerPhoneNumber();
		this.memo = request.getCustomerMemo();
	}

	public void addCustomerTag(CustomerTag customerTag) {
		customerTags.add(customerTag);
		customerTag.setCustomer(this);
	}

	public void setTagCount(int tagCount) {
		this.tagCount = tagCount;
	}
}
