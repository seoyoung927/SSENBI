package com.haneolenae.bobi.domain.tag.util;

import java.util.Arrays;
import java.util.Optional;

public enum TagColor {
	RED("RED"),
	PINK("PINK"),
	SALMON("SALMON"),
	ORANGE("ORANGE"),
	YELLOW("YELLOW"),
	GREEN("GREEN"),
	LIME("LIME"),
	SKYBLUE("SKYBLUE"),
	BLUE("BLUE"),
	PURPLE("PURPLE"),
	BEIGE("BEIGE"),
	GRAY("GRAY");

	private final String value;

	TagColor(String value) {
		this.value = value;
	}

	public static boolean notExistColor(String name) {
		return Arrays.stream(TagColor.values())
			.filter(color -> color.value.equals(name))
			.findFirst().isEmpty();
	}
}
