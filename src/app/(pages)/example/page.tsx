import ContentCard from "@/app/components/common/ContentCard";
import ResponsiveTabBar from "@/app/components/layout/ResponsiveTabBar";

export default function Default() {
  return (
    <>
      <ContentCard
        imgSrc={"https://via.placeholder.com/150"}
        title={"제목"}
        description={"설명"}
      />
      <ResponsiveTabBar />
    </>
  );
}
