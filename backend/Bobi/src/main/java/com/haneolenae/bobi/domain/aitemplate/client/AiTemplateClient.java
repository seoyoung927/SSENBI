package com.haneolenae.bobi.domain.aitemplate.client;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.haneolenae.bobi.domain.aitemplate.dto.request.OpenAiRequest;
import com.haneolenae.bobi.domain.aitemplate.dto.response.OpenAiResponse;

import reactor.core.publisher.Mono;

@Component
public class AiTemplateClient {
	private final WebClient webClient;

	public AiTemplateClient(WebClient webClient) {
		this.webClient = webClient;
	}

	public Mono<OpenAiResponse> getChatCompletion(OpenAiRequest request) {
		return webClient.post()
			.uri("/chat/completions")
			.bodyValue(request)
			.retrieve()
			.bodyToMono(OpenAiResponse.class);
	}
}
