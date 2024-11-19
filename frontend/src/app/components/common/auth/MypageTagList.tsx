"use client";

import { useState } from "react";
import TagList from "../tag/TagList";
import { TagType } from "@/types/tag/tagTypes";

interface MypageTagListProps {
  tags: TagType[];
}

export default function MypageTagList({ tags }: MypageTagListProps) {
  const [selectedTags, setSelectedTags] = useState<TagType[]>(tags);

  return <TagList tags={selectedTags} setTags={setSelectedTags} />;
}
