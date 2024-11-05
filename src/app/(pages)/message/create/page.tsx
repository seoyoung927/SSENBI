"use client";

import React, { useState } from "react";
import "./page.css";
import { useRouter } from "next/navigation";
import Header from "@/app/components/layout/Header";
import Modal from "@/app/components/common/modal/Modal";
import ChatAIContainer from "@/app/components/chat/ChatAIContainer";

const MessageNew = () => {
  const [isAIEditModalOpen, setIsAIEditModalModalOpen] =
    useState<boolean>(false);
  const [customer, setCustomer] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const handleSend = () => {
    console.log("전송");
  };

  const handleCancel = () => {
    router.push("/message");
  };

  const closeAIEditModal = () => {
    setIsAIEditModalModalOpen(false);
  };

  const handleSaveMessage = (content: string) => {
    setContent(content);
  };

  const openAIModal = () => {
    setIsAIEditModalModalOpen(true);
  };

  return (
    <div className="page-container">
      <Header title="새 메시지" showBackIcon={true} />

      <div className="message-form">
        <div className="form-group">
          <label className="form-group_label body-small">받는 사람</label>
          <input
            type="text"
            className="form-group_input body"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label body-small">내용</label>
          <textarea
            className="form-group_textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="message-new_button-group">
          <button
            onClick={handleCancel}
            type="button"
            className="message-new_button-cancel"
          >
            취소
          </button>
          <button
            onClick={openAIModal}
            type="button"
            className="message-new_button-send gradient_button"
          >
            쎈비 AI 도움 받기
          </button>
          <button
            onClick={handleSend}
            type="button"
            className="message-new_button-send"
          >
            보내기
          </button>
        </div>
      </div>
      {isAIEditModalOpen && (
        <Modal
          isOpen={isAIEditModalOpen}
          onClose={closeAIEditModal}
          title={"AI 쎈비와 문자 작성하기"}
        >
          <ChatAIContainer
            onClose={closeAIEditModal}
            onSave={handleSaveMessage}
            initialContent={content}
          />
        </Modal>
      )}
    </div>
  );
};

export default MessageNew;
