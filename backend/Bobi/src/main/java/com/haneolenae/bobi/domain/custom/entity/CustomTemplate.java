package com.haneolenae.bobi.domain.custom.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.haneolenae.bobi.domain.custom.dto.request.EditCustomTemplateRequest;
import com.haneolenae.bobi.domain.member.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedAttributeNode;
import jakarta.persistence.NamedEntityGraph;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NamedEntityGraph(
	name = "CustomTemplate.withTagsAndCustomers",
	attributeNodes = {
		@NamedAttributeNode("templateTags"),
		@NamedAttributeNode("templateCustomers")
	}
)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CustomTemplate {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String title;

	@Column
	private String content;

	@Column
	private Integer count;

	@Column
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime createdAt;

	@Column
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime updatedAt;

	@OneToMany(mappedBy = "customTemplate", fetch = FetchType.LAZY)
	private List<TemplateCustomer> templateCustomers;

	@OneToMany(mappedBy = "customTemplate", fetch = FetchType.LAZY)
	private List<TemplateTag> templateTags;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	public CustomTemplate(String title, String content, Integer count) {
		this.title = title;
		this.content = content;
		this.count = count;
	}

	@Builder
	public CustomTemplate(String title, String content, Integer count, Member member) {
		this.title = title;
		this.content = content;
		this.count = count;
		this.member = member;
	}

	public void editTitleAndContent(EditCustomTemplateRequest request) {
		this.title = request.getTemplateTitle();
		this.content = request.getTemplateContent();
	}

	public CustomTemplate(String title, String content) {
		this.title = title;
		this.content = content;
	}

	public CustomTemplate replicateMe() {
		return CustomTemplate.builder()
			.title(this.title + " (복사)")
			.content(this.content)
			.member(this.member)
			.count(0)
			.build();
	}
}
