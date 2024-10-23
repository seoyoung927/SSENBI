import ContentCard from "@/app/components/common/ContentCard";
<<<<<<< HEAD
import InputField from "@/app/components/common/InputField";
// import ResponsiveTabBar from "@/app/components/layout/ResponsiveTabBar";
=======
>>>>>>> 4fe9bb0bc81b0d9e641bf956b863a5d5e8bc0ab0

/*
필수!!
  모든 페이지는 첫 줄에
 <div className="page-container"> 필수
 bottom 바 스타일 조정때문!! 
*/

export default function Example() {
  return (
    <>
      <ContentCard
        imgSrc={"https://via.placeholder.com/150"}
        title={"제목"}
        description={"설명"}
      />
<<<<<<< HEAD
      <InputField label="이메일" type="email" />
      <InputField label="비밀번호" type="password" />
      {/* <ResponsiveTabBar /> */}
=======
>>>>>>> 4fe9bb0bc81b0d9e641bf956b863a5d5e8bc0ab0
    </>
  );
}
