"use client";

import React, { useState } from "react";
import "./page.css";
import BorderTag from "@/app/components/common/tag/BorderTag";
import Header from "@/app/components/layout/Header";

interface MessageIdPageProps {
  params: {
    id: string;
  };
}

const MessageId = ({ params }: MessageIdPageProps) => {
  const [tags] = useState(["직장인", "학생"]);
  const { id } = params;

  return (
    <div className="page-container">
      {/* TODO: id 삭제(현재 확인용) */}
      <Header title={`보낸 메시지${id}`} />

      <div className="message-info-list">
        <div className="message-info">
          <p className="subheading">보낸 시작</p>
          <p className="body">2024년 10월 3일 오전 8시 34분</p>
        </div>
        <div className="message-info">
          <p className="subheading">보낸사람</p>
          <p className="body">홍길동, 임꺽정, 신사임당</p>
        </div>
        <div className="message-info">
          <p className="subheading">태그</p>
          <div className="message-info_tag-list">
            {tags.map((tag, index) => (
              <BorderTag key={index} color="RED" tagName={tag} />
            ))}
          </div>
        </div>
        <div className="message-info">
          <p className="subheading">내용</p>
          <p className="body">
            보낸 메시지 한두줄정도 미리보기가 있었으면 되나? 속닥속닥속닥
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageId;
