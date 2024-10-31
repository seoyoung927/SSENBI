package com.haneolenae.bobi.domain.tag.entity;

import java.util.List;

import com.haneolenae.bobi.domain.custom.entity.TemplateTag;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;

@Getter
@Entity
public class Tag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String name;

	@Column
	private String color;

	@OneToMany(mappedBy = "tag")
	private List<TemplateTag> templateTags;

}
