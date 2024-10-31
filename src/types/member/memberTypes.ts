// 회원가입 데이터 타입
export type SignupFormData = {
  memberId: string;
  password: string;
  name: string;
  business: string;
  personalPhoneNumber: string;
  businessPhoneNumber: string;
};

// 로그인 데이터 타입
export type LoginFormData = {
  loginId: string;
  password: string;
};

// 회원정보 수정 데이터 타입
export type PutMemberFormData = {
  business: string;
  personalPhoneNumber: string;
  businessPhoneNumber: string;
};
