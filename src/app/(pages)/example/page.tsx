import ContentCard from "@/app/components/common/ContentCard";
import InputField from "@/app/components/common/InputField";
import Tag from "@/app/components/common/Tag";

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
      <Tag color="RED" tagName="빨강" />
      <Tag color="PINK" tagName="핑크" />
      <Tag color="SALMON" tagName="살몬" />
      <Tag color="ORANGE" tagName="주황" />
      <Tag color="YELLOW" tagName="노랑" />
      <Tag color="LIME" tagName="라임" />
      <Tag color="GREEN" tagName="초록" />
      <Tag color="SKYBLUE" tagName="하늘" />
      <Tag color="BLUE" tagName="파랑" />
      <Tag color="PURPLE" tagName="보라" />
      <Tag color="BEIGE" tagName="베이지" />
      <Tag color="GRAY" tagName="회색" />
    </div>
  );
}
