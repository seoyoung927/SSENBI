package com.haneolenae.bobi.domain.general.repository;

import com.haneolenae.bobi.domain.general.entity.GeneralTemplate;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralTemplateRepository extends JpaRepository<GeneralTemplate, Long> {

    Page<GeneralTemplate> findByCategoryId(Long categoryId, Pageable pageable);
}
