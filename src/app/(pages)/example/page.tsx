import ContentCard from "@/app/components/common/ContentCard";

/*
필수!!
  모든 페이지는 첫 줄에
 <div className="page-container"> 필수
 bottom 바 스타일 조정때문!! 
*/

export default function Example() {
  return (
    <div className="page-container">
      <ContentCard />
    </div>
  );
}
