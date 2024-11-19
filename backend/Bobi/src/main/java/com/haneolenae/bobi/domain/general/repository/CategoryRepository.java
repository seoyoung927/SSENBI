package com.haneolenae.bobi.domain.general.repository;

import com.haneolenae.bobi.domain.general.entity.Category;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Long> {
    @Override
    List<Category> findAll();

    @Query("SELECT c FROM Category c JOIN FETCH c.generalTemplates")
    List<Category> findAllWithTemplates();
}
