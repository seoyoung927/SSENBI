"use client";

import React, { useState } from "react";
import "./page.css";
import { useRouter } from "next/navigation";
import Header from "@/app/components/layout/Header";
import Modal from "@/app/components/common/modal/Modal";
import CustomizedModifyAI from "@/app/components/chat/CustomizedModifyAI";

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

  const handleSaveMessage = () => {};

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
          title={"AI 쎈비와 수정하기"}
        >
          <CustomizedModifyAI
            templateId={templateI}
            onClose={closeAIEditModal}
            onSave={handleSaveMessage}
          />
        </Modal>
      )}
    </div>
  );
};

export default MessageNew;
