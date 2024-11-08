"use client";

import React, { useState, useEffect, Suspense } from "react";
import "./page.css";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/components/layout/Header";
import Modal from "@/app/components/common/modal/Modal";
import ChatAIContainer from "@/app/components/chat/ChatAIContainer";
import TagList from "@/app/components/common/tag/TagList";
import { TagType } from "@/types/tag/tagTypes";
import { CustomerType } from "@/types/customer/customerType";
import { postSendMessageAPI } from "@/app/api/message/messageAPI";
import { MessagePostPropsType } from "@/types/message/messageTypes";
import Cookies from "js-cookie";
import { getCustomTemplateAPI } from "@/app/api/customized/customizedAPI";
import HashLoading from "@/app/components/common/loading/HashLoading";
import UploadIcon from "@/app/assets/svg/Upload.svg";
import CustomizedListSelector from "@/app/components/common/customized/CustomizedListSelector";
import BatchTextEditor from "@/app/components/common/input/BatchTextEditor";

function MessageCreateContent() {
  const [isAIEditModalOpen, setIsAIEditModalModalOpen] =
    useState<boolean>(false);
  const [isCustomListModalOpen, setIsCustomListModalOpen] =
    useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [tags, setTags] = useState<TagType[]>([]);
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [content, setContent] = useState<string>("");
  // State for batch editing
  const [batchTextFrom, setBatchTextFrom] = useState<string>("");
  const [batchTextTo, setBatchTextTo] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const templateId = searchParams.get("id") || "";
    setId(templateId);
  }, [searchParams]);

  useEffect(() => {
    if (id) {
      fetchCustomTemplate(id);
    }
  }, [id]);

  const fetchCustomTemplate = async (templateId: string) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) return;

      const data = await getCustomTemplateAPI({ token, templateId });

      console.log(data);

      const { templateContent, templateCustomers, templateTags } = data.result;
      setCustomers(templateCustomers);
      setContent(templateContent);
      setTags(templateTags);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  const handleSend = async () => {
    try {
      const messageData: MessagePostPropsType = {
        messageCustomerIds: customers.map((customer) => customer.customerId),
        messageTagIds: tags.map((tag) => tag.tagId),
        messageContent: content,
      };

      console.log("Sending message data:", messageData);
      const response = await postSendMessageAPI(messageData);
      console.log("Post response:", response);
    } catch (err) {
      console.error("Error sending message:", err);
    }
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

  const handleTags = (newTags: TagType[]) => {
    setTags(newTags);
  };

  const openCustomListModal = () => {
    setIsCustomListModalOpen(true);
  };

  const closeCustomListModal = () => {
    setIsCustomListModalOpen(false);
  };

  const handleBatchTextChange = () => {
    if (batchTextFrom) {
      const updatedContent = content.replace(
        new RegExp(batchTextFrom, "g"),
        batchTextTo,
      );
      setContent(updatedContent);
    }
  };

  const getCustomTemplate = (customId: number) => {
    setId(customId.toString());
    closeCustomListModal();
  };

  return (
    <div className="page-container">
      <Header title="새 메시지" showBackIcon={true} />

      <div className="message-form">
        <div className="space-between">
          <div className="form-group">
            <label className="form-group_label body-small">받는 사람</label>
            <div className="tag-container">
              <TagList tags={tags} setTags={handleTags} />
            </div>
          </div>

          <button
            type="button"
            className="message-get_button"
            onClick={openCustomListModal}
          >
            템플릿에서 가져오기
            <UploadIcon className="upload-icon" />
          </button>
        </div>

        <div className="form-group">
          <label className="label body-small">내용</label>
          <textarea
            className="form-group_textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <BatchTextEditor
          batchTextFrom={batchTextFrom}
          batchTextTo={batchTextTo}
          setBatchTextFrom={setBatchTextFrom}
          setBatchTextTo={setBatchTextTo}
          isEdit={true}
          handleBatchTextChange={handleBatchTextChange}
        />
        <div className="message-new_button-group">
          <button
            onClick={handleCancel}
            type="button"
            className="message_button message-new_button-cancel"
          >
            취소
          </button>
          <button
            onClick={openAIModal}
            type="button"
            className="message_button message-new_button-send gradient_button"
          >
            쎈비 AI 도움 받기
          </button>
          <button
            onClick={handleSend}
            type="button"
            className="message_button message-new_button-send"
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

      {isCustomListModalOpen && (
        <Modal
          isOpen={isCustomListModalOpen}
          onClose={closeCustomListModal}
          className="modal-container"
        >
          <div style={{ height: "80vh", overflowY: "auto" }}>
            <CustomizedListSelector getCustomTemplate={getCustomTemplate} />
          </div>
        </Modal>
      )}
    </div>
  );
}
export default function MessageCreatePage() {
  return (
    <Suspense fallback={<HashLoading />}>
      <MessageCreateContent />
    </Suspense>
  );
}
