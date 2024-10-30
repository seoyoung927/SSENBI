package com.haneolenae.bobi.domain.tag.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.haneolenae.bobi.domain.tag.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
	List<Tag> findByIdIn(List<Long> tagIds);
}
