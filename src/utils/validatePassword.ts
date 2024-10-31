export const validatePassword = (pwd: string) => {
  const hasKorean = /[가-힣]/.test(pwd);
  const isLengthValid = pwd.length >= 8 && pwd.length <= 20;
  const hasLowercase = /[a-z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);

  if (hasKorean) {
    return "비밀번호에 한글 문자를 사용할 수 없습니다.";
  }
  if (!isLengthValid) {
    return "비밀번호는 8자리 이상 20자리 이하이어야 합니다.";
  }
  if (!hasLowercase) {
    return "비밀번호에 영어 소문자를 최소 1개 이상 포함해야 합니다.";
  }
  if (!hasNumber) {
    return "비밀번호에 숫자를 최소 1개 이상 포함해야 합니다.";
  }
  return "";
};
