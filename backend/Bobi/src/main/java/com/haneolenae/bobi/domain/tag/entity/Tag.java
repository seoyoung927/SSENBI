package com.haneolenae.bobi.domain.tag.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.haneolenae.bobi.domain.custom.entity.TemplateTag;
import com.haneolenae.bobi.domain.customer.entity.CustomerTag;
import com.haneolenae.bobi.domain.member.entity.Member;
import com.haneolenae.bobi.domain.tag.dto.request.TagRequest;
import com.haneolenae.bobi.domain.tag.dto.request.TagUpdateRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Tag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String name;

	@Column
	private String color;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToMany(mappedBy = "tag")
	private List<TemplateTag> templateTags = new ArrayList<>();

	@OneToMany(mappedBy = "tag")
	private List<CustomerTag> customerTags = new ArrayList<>();

	@Builder
	public Tag(String name, String color, Member member) {
		this.name = name;
		this.color = color;
		this.member = member;
	}

	public void update(TagRequest request) {
		this.name = request.getName();
		this.color = request.getColor();
	}

	public void addCustomerTag(CustomerTag customerTag) {
		customerTags.add(customerTag);
		customerTag.setTag(this);
	}
}
