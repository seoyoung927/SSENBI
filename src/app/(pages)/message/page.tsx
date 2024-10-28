import SearchBar from "@/app/components/common/input/SearchBar";

export default function MessagePage() {
  const onChan = () => {};

  return (
    <>
      <SearchBar onChange={onChan} placeholder="검색어 (이름, 제목, 태그)" />
    </>
  );
}
