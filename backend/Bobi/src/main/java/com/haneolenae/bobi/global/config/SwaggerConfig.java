package com.haneolenae.bobi.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@OpenAPIDefinition(
	servers = {
		@Server(url = "https://www.ssenbi.co.kr/api/v1/ssenbi", description = "ssenbi https 서버입니다."),
		@Server(url = "http://www.ssenbi.co.kr/api/v1/ssenbi", description = "ssenbi http 서버입니다."),
		@Server(url = "http://localhost:8080/api/v1/ssenbi", description = "ssenbi local 서버입니다.")
	}
)
@Configuration
public class SwaggerConfig {
	@Bean
	public OpenAPI openAPI() {
		return new OpenAPI()
			.components(new Components())
			.info(apiInfo());
	}

	private Info apiInfo() {
		return new Info()
			.title("SSENBI API")
			.description("SSENBI API description")
			.version("1.0.0");
	}
}
