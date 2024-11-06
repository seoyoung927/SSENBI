"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/layout/Header";
import BorderTag from "@/app/components/common/tag/BorderTag";
import FilledTag from "@/app/components/common/tag/FilledTag";
import { useRouter } from "next/navigation";
import {
  deleteCustomTemplateAPI,
  getCustomTemplateAPI,
  putCustomTemplateAPI,
} from "@/app/api/customized/customizedAPI";
import Modal from "@/app/components/common/modal/Modal";
import CustomizedModifyForm from "@/app/components/chat/CustomizedModifyForm";
import { CustomerType, TagType } from "@/types/tag/tagTypes";
import Cookies from "js-cookie";
import { PutCustomTemplateParamsType } from "@/types/customized/customizedTypes";
import ChatAIContainer from "@/app/components/chat/ChatAIContainer";
import "./page.css";

// Custom Template 타입 정의
interface CustomTemplate {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  templateUsageCount: number;
  templateCreatedAt: string;
  templateTags: TagType[];
  templateCustomers: CustomerType[];
}

// ApiResponse 타입 정의
type ApiResponse = CustomTemplate;

// dummyData 선언
const dummyData: ApiResponse = {
  templateId: 1,
  templateTitle: "직장인 템플릿",
  templateContent: "이 템플릿의 목적",
  templateUsageCount: 10,
  templateCreatedAt: "2024-10-25T01:22:27",
  templateTags: [{ tagId: 1, tagName: "직장인", tagColor: "GREEN" }],
  templateCustomers: [],
};

interface ModifiedTemplate {
  templateTitle: string;
  templateContent: string;
  templateAfterTagIds: number[];
  templateAfterCustomerIds: number[];
}

interface CustomizedIdPageProps {
  params: {
    id: string;
  };
}

export default function CustomizedIdPage({ params }: CustomizedIdPageProps) {
  const router = useRouter();
  const { id } = params;
  const [customMessageTemplate, setCustomMessageTemplate] =
    useState<ApiResponse>();
  const [modifiedTemplate, setModifiedTemplate] = useState<ModifiedTemplate>();
  const [isAIEditModalOpen, setIsAIEditModalModalOpen] =
    useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchDCustomTemplate = async (templateId: string) => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) return;

        const data = await getCustomTemplateAPI({ token, templateId });
        console.log("templateId : ", templateId, data);
        setCustomMessageTemplate(data.result);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };
    fetchDCustomTemplate(id);
  }, []);

  const handleDelete = async () => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    try {
      const response = await deleteCustomTemplateAPI({
        token,
        templateId: Number(id),
      });
      if (response.code === "S10000") {
        router.push("/customized");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const openAIEditModal = () => {
    setIsAIEditModalModalOpen(true);
  };

  const openEditModal = () => {
    setIsEditModalModalOpen(true);
  };

  const closeAIEditModal = () => {
    setIsAIEditModalModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalModalOpen(false);
  };

  const updateModifiedTemplate = ({
    title,
    content,
    afterTags,
    afterCustomerIds,
  }: Partial<PutCustomTemplateParamsType>) => {
    setModifiedTemplate({
      templateTitle: title || "",
      templateContent: content || "",
      templateAfterTagIds: afterTags || [],
      templateAfterCustomerIds: afterCustomerIds || [],
    });
  };

  const handleSaveTemplate = async (
    title = modifiedTemplate?.templateTitle ?? "",
    content = modifiedTemplate?.templateContent ?? "",
    beforeTags: number[] = [],
    afterTags: number[] = modifiedTemplate?.templateAfterTagIds ?? [],
    beforeCustomerIds: number[] = [],
    afterCustomerIds: number[] = modifiedTemplate?.templateAfterCustomerIds ??
      [],
  ) => {
    if (!modifiedTemplate) return;

    const PutCustomTemplateParamsType: PutCustomTemplateParamsType = {
      token: "your-auth-token",
      templateId: Number(id),
      title,
      content,
      beforeTags,
      afterTags,
      beforeCustomerIds,
      afterCustomerIds,
    };

    try {
      const response = await putCustomTemplateAPI(PutCustomTemplateParamsType);
      console.log("putCustomTemplateAPI response", response);

      updateModifiedTemplate(PutCustomTemplateParamsType);
      closeModals();
    } catch (error) {
      console.error("Error updating template:", error);
    }
  };

  const handleSaveMessage = (content: string) => {
    if (customMessageTemplate) {
      // Update the content of the custom message template
      const updatedTemplate = {
        ...customMessageTemplate,
        templateContent: content, // Update the template content
      };

      setCustomMessageTemplate(updatedTemplate); // Set the updated template
    }
  };

  const closeModals = () => {
    setIsAIEditModalModalOpen(false);
    setIsEditModalModalOpen(false);
  };

  return (
    <div className="page-container">
      <Header title="커스텀" showBackIcon={true} />

      <div className="customized-info-list">
        <div className="customized-info">
          <p className="subheading">제목</p>
          <p className="body">{customMessageTemplate?.templateTitle}</p>
        </div>
        <div className="customized-info">
          <p className="subheading">고객</p>
          <div className="customized-info_tag-list">
            {customMessageTemplate?.templateCustomers.map((tag) => (
              <FilledTag
                key={tag.customerId}
                color={tag.customerColor}
                tagName={tag.customerName}
              />
            ))}
          </div>
        </div>
        <div className="customized-info">
          <p className="subheading">태그</p>
          <div className="customized-info_tag-list">
            {customMessageTemplate?.templateTags.map((tag) => (
              <BorderTag
                key={tag.tagId}
                color={tag.tagColor}
                tagName={tag.tagName}
              />
            ))}
          </div>
        </div>
        <div className="customized-info">
          <div className="customized-info_message-body">
            {customMessageTemplate?.templateContent}
          </div>
        </div>
      </div>

      <div className="customized-detail_button-group">
        <button
          onClick={handleDelete}
          type="button"
          className="customized-detail_button red_button"
        >
          삭제
        </button>
        <button
          onClick={openAIEditModal}
          type="button"
          className="customized-detail_button gradient_button"
          style={{ borderRadius: 16 }}
        >
          쎈비 AI 도움 받기
        </button>
        <button
          onClick={openEditModal}
          type="button"
          className="customized-detail_button blue_button"
        >
          수정하기
        </button>
      </div>

      {/* Modal */}
      {isAIEditModalOpen && (
        <Modal
          isOpen={isAIEditModalOpen}
          onClose={closeAIEditModal}
          title={"AI 쎈비와 수정하기"}
          className="modal" /* 모달 고정 크기를 위한 클래스 추가 */
        >
          <div className="modal-content">
            <ChatAIContainer
              onClose={closeAIEditModal}
              onSave={handleSaveMessage}
              initialContent={customMessageTemplate?.templateContent}
            />
          </div>
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          title={"수정하기"}
        >
          <CustomizedModifyForm
            templateId={id}
            onClose={closeEditModal}
            onSave={handleSaveTemplate}
          />
        </Modal>
      )}
    </div>
  );
}
