import ContentCard from "@/app/components/common/ContentCard";
import InputField from "@/app/components/common/InputField";

/*
필수!!
  모든 페이지는 첫 줄에
 <div className="page-container"> 필수
 bottom 바 스타일 조정때문!! 
*/

export default function Example() {
  return (
    <div className="page-container">
      <ContentCard
        imgSrc={"https://via.placeholder.com/150"}
        title={"제목"}
        description={"설명"}
      />
      <InputField label="이메일" type="email" />
    </div>
  );
}
