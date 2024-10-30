package com.haneolenae.bobi.domain.custom.entity;

import com.haneolenae.bobi.domain.tag.entity.Tag;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class TemplateTag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "custom_template_id")
	private CustomTemplate customTemplate;

	@ManyToOne
	@JoinColumn(name = "tag_id")
	private Tag tag;

	public TemplateTag(CustomTemplate customTemplate, Tag tag) {
		this.customTemplate = customTemplate;
		this.tag = tag;
	}
}
