package com.haneolenae.bobi.domain.member.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.haneolenae.bobi.domain.custom.entity.CustomTemplate;
import com.haneolenae.bobi.domain.customer.entity.Customer;
import com.haneolenae.bobi.domain.member.dto.request.MemberUpdateRequest;
import com.haneolenae.bobi.domain.message.entity.Message;
import com.haneolenae.bobi.domain.tag.entity.Tag;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String memberId;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String business;

	@Column(nullable = false)
	private String personalPhoneNumber;

	@Column(nullable = false)
	private String businessPhoneNumber;

	@Column(nullable = false)
	private UUID uuid;

	@Column(nullable = false)
	private int customerCount;

	@Column(nullable = false)
	private int messageCount;

	@Column
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime createdAt;

	@Column
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime updatedAt;

	@Column(nullable = false)
	private boolean isDeleted = false;

	@OneToMany(mappedBy = "member")
	private List<Message> messages;

	@OneToMany(mappedBy = "member")
	private List<Tag> tags;

	@OneToMany(mappedBy = "member")
	private List<Customer> customers;

	@OneToMany(mappedBy = "member")
	private List<CustomTemplate> customTemplates;

	@Builder
	public Member(String memberId, String password, String name, String business, String personalPhoneNumber,
		String businessPhoneNumber, UUID uuid) {
		this.memberId = memberId;
		this.password = password;
		this.name = name;
		this.business = business;
		this.personalPhoneNumber = personalPhoneNumber;
		this.businessPhoneNumber = businessPhoneNumber;
		this.uuid = uuid;
	}

	public void update(MemberUpdateRequest request) {
		this.business = request.getBusiness();
		this.personalPhoneNumber = request.getPersonalPhoneNumber();
		this.businessPhoneNumber = request.getBusinessPhoneNumber();
	}

	public void updatePassword(String password) {
		this.password = password;
	}
}
