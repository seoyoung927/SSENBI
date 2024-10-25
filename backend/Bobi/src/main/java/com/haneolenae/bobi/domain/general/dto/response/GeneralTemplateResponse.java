package com.haneolenae.bobi.domain.general.dto.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class GeneralTemplateResponse {
    private long templateId;
    private String templateTitle;
    private String templateContent;
    private long count;
    private LocalDateTime createdAt;
}

