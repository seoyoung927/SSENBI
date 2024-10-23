import ContentCard from "@/app/components/common/ContentCard";
import InputField from "@/app/components/common/InputField";
// import ResponsiveTabBar from "@/app/components/layout/ResponsiveTabBar";

export default function Default() {
  return (
    <>
      <ContentCard
        imgSrc={"https://via.placeholder.com/150"}
        title={"제목"}
        description={"설명"}
      />
      <InputField label="이메일" type="email" />
      <InputField label="비밀번호" type="password" />
      {/* <ResponsiveTabBar /> */}
    </>
  );
}
