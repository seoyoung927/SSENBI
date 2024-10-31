package com.haneolenae.bobi.domain.custom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.haneolenae.bobi.domain.custom.entity.CustomTemplate;

@Repository
public interface CustomTemplateRepository extends JpaRepository<CustomTemplate, Long> {

	@Query("SELECT t FROM CustomTemplate t LEFT JOIN FETCH t.templateCustomers LEFT JOIN FETCH t.templateTags WHERE t.id IN (:templateIds)")
	Optional<CustomTemplate> findTemplateWithCustomersAndTags(@Param("templateIds") List<Long> templateIds);

	@Query("SELECT t FROM CustomTemplate t " +
		"WHERE " +
		"(:templateTags IS NULL OR EXISTS (" +
		"    SELECT 1 FROM TemplateTag tt JOIN tt.tag tag " +
		"    WHERE tt.customTemplate = t AND tag.id IN :templateTags" +
		")) " +
		"AND (:templateCustomer IS NULL OR EXISTS (" +
		"    SELECT 1 FROM TemplateCustomer tc JOIN tc.customer customer " +
		"    WHERE tc.customTemplate = t AND customer.id IN :templateCustomer" +
		")) " +
		"AND (:templateSearch IS NULL OR " +
		"     t.title LIKE %:templateSearch% OR t.content LIKE %:templateSearch%)")
	Page<CustomTemplate> findTemplates(
		Pageable pageable,
		@Param("templateTags") List<Integer> templateTags,
		@Param("templateCustomer") List<Integer> templateCustomer,
		@Param("templateSearch") String templateSearch
	);
}
