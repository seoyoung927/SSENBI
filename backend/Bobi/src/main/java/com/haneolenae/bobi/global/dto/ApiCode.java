package com.haneolenae.bobi.global.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ApiCode {

	// Success
	S10000("SUCCESS"),
	S10001("CREATED"),

	// Auth
	A40001("ID 또는 비밀번호를 다시 확인하세요."),
	A40002("Refresh Token이 입력되지 않았습니다. 다시 확인해 주세요."),
	A40101("리프레시 토큰이 만료되었습니다. 다시 로그인 해주세요."),
	A40102("액세스 토큰 유효하지 않습니다. 갱신을 받아주세요."),
	A40301("토큰이 일치하지 않습니다."),

	// Member
	M40001("입력된 데이터가 잘못되었습니다."),
	M40101("비밀번호가 일치하지 않습니다."),
	M40401("사용자가 존재하지 않습니다."),
	M40901("이미 가입된 회원이 존재합니다."),

	// General
	G40401("유효한 제내랄 템플릿을 찾지 못했습니다"),

	// Customer
	C40401("고객이 존재하지 않습니다."),

	// Tag
	T40401("적절하지 않은 태그입니다."),

	// Message
	MS50001("메시지 전송에 실패하였습니다."),
	MS40401("존재하지 않는 메시지입니다."),

	// Error
	E10001("This Error is sample error"),

	X10000("SERVER_ERROR");

	private final String msg;
}
