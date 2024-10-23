import ContentCard from "@/app/components/common/ContentCard";

/*
  모든 페이지는 
  width: "calc(100vw - 100px)" or var(--divWidth), marginLeft: 100  있어야함!!
*/

export default function Example() {
  return (
    <div style={{ width: "var(--divWidth)", marginLeft: 100 }}>
      <ContentCard />
    </div>
  );
}
