package com.haneolenae.bobi.global.properties;

import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "openai")
public class OpenAIProperties {
	private Map<String, String> prompts;

	public Map<String, String> getPrompts() {
		return prompts;
	}

	public void setPrompts(Map<String, String> prompts) {
		this.prompts = prompts;
	}
}