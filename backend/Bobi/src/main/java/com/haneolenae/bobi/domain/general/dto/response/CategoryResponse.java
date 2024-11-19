package com.haneolenae.bobi.domain.general.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
public class CategoryResponse {
    long categoryId;
    String categoryName;
}
