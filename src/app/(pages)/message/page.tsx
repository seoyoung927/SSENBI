import SearchBar from "@/app/components/common/input/SearchBar";

export default function MessagePage() {
  const onChan = () => {};

  return (
    <div className="page-container">
      <SearchBar onChange={onChan} placeholder="검색어 (이름, 제목, 태그)" />
    </div>
  );
}
