package com.haneolenae.bobi.domain.custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.haneolenae.bobi.domain.custom.entity.CustomTemplate;

@Repository
public interface CustomTemplateRepository extends JpaRepository<CustomTemplate, Long> {

}
