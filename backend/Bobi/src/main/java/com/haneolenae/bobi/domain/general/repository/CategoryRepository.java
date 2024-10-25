package com.haneolenae.bobi.domain.general.repository;

import com.haneolenae.bobi.domain.general.entity.Category;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Long> {
    @Override
    List<Category> findAll();
}
