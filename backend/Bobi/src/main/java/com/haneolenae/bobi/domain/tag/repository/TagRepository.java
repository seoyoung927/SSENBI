package com.haneolenae.bobi.domain.tag.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.haneolenae.bobi.domain.tag.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
	List<Tag> findByIdIn(List<Long> tagIds);

	Optional<Tag> findByIdAndMemberId(Long tagId, Long memberId);
}
