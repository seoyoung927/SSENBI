package com.haneolenae.bobi.domain.custom.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.haneolenae.bobi.domain.custom.entity.TemplateTag;

public interface TemplateTagRepository extends JpaRepository<TemplateTag, Long> {
	List<TemplateTag> findByTagIdIn(List<Long> tagIds);

	//memberId 추가 해야한다.
	@Modifying
	@Query("DELETE FROM TemplateTag t WHERE t.customTemplate.id = :customTemplateId")
	void deleteByCustomTemplateId(Long customTemplateId);

	@Query
	void deleteByTagId(Long tagId);

	void deleteByTagIdAndCustomTemplateId(Long tagId, Long customTemplateId);

	@Query("SELECT t.tag.id FROM TemplateTag t WHERE t.customTemplate.id = :templateId")
	Set<Long> getTagIdsByTemplateId(long templateId);
}
