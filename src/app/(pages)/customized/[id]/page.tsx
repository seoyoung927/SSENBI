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
import { TagType } from "@/types/tag/tagTypes";
import Cookies from "js-cookie";
import { PutCustomTemplateParamsType } from "@/types/customized/customizedTypes";
import ChatAIContainer from "@/app/components/chat/ChatAIContainer";
import "./page.css";
import { CustomerType } from "@/types/customer/customerType";

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
  const [modifiedTemplate, setModifiedTemplate] = useState<ApiResponse>();
  const [isAIEditModalOpen, setIsAIEditModalModalOpen] =
    useState<boolean>(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchCustomTemplate(id);
  }, [id]);

  const fetchCustomTemplate = async (templateId: string) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) return;

      const data = await getCustomTemplateAPI({ token, templateId });
      setCustomMessageTemplate(data.result);
      setModifiedTemplate(data.result);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

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

  const handleSaveMessage = () => {
    if (customMessageTemplate) {
      setCustomMessageTemplate(modifiedTemplate);
    }
  };

  // Handle the save action for the template
  const handleSaveTemplate = async () => {
    if (!modifiedTemplate) return;

    const PutCustomTemplateParamsType: PutCustomTemplateParamsType = {
      templateId: Number(id),
      title: modifiedTemplate.templateTitle,
      content: modifiedTemplate.templateContent,
      // beforeTags,
      // afterTags,
      // beforeCustomerIds,
      // afterCustomerIds,
    };

    try {
      const response = await putCustomTemplateAPI(PutCustomTemplateParamsType);
      console.log("putCustomTemplateAPI response", response);

      handleSaveMessage();
    } catch (error) {
      console.error("Error updating template:", error);
    }
  };

  const toggleEditMode = () => {
    if (isEdit) {
      handleSaveTemplate();
    }

    setIsEdit(!isEdit);
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: "templateTitle" | "templateContent",
  ) => {
    setModifiedTemplate((prev) => {
      if (prev) {
        return { ...prev, [field]: e.target.value };
      } else {
        return {
          templateId: Number(id),
          templateTitle: "",
          templateContent: "",
          templateUsageCount: 0,
          templateCreatedAt: "",
          templateTags: [],
          templateCustomers: [],
        };
      }
    });
  };

  const openAIEditModal = () => {
    setIsAIEditModalModalOpen(true);
  };

  const closeAIEditModal = () => {
    setIsAIEditModalModalOpen(false);
  };

  const handleSaveAIContent = (content: string) => {
    handleInputChange({ target: { value: content } } as any, "templateContent");
  };

  return (
    <div className="page-container">
      <Header title="커스텀" showBackIcon={true} />

      <div className="customized-info-list">
        <div className="customized-info">
          <p className="subheading">제목</p>
          <textarea
            className="body"
            value={modifiedTemplate?.templateTitle || ""}
            onChange={(e) => handleInputChange(e, "templateTitle")}
            disabled={!isEdit}
          />
        </div>
        <div className="customized-info">
          <p className="subheading">고객</p>
          <div className="customized-info_tag-list">
            {modifiedTemplate?.templateCustomers.map((tag) => (
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
            {modifiedTemplate?.templateTags.map((tag) => (
              <BorderTag
                key={tag.tagId}
                color={tag.tagColor}
                tagName={tag.tagName}
              />
            ))}
          </div>
        </div>
        <div className="customized-info">
          <p className="subheading">내용</p>
          <textarea
            className="textarea-content body"
            value={modifiedTemplate?.templateContent || ""}
            onChange={(e) => handleInputChange(e, "templateContent")}
            disabled={!isEdit}
          />
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
          onClick={toggleEditMode}
          type="button"
          className="customized-detail_button blue_button"
        >
          {isEdit ? "수정 완료" : "수정하기"}
        </button>
      </div>

      {/* Modal */}
      {isAIEditModalOpen && (
        <Modal
          isOpen={isAIEditModalOpen}
          onClose={closeAIEditModal}
          title={"AI 쎈비와 수정하기"}
          className="modal"
        >
          <div className="modal-content">
            <ChatAIContainer
              onClose={closeAIEditModal}
              onSave={handleSaveAIContent}
              initialContent={customMessageTemplate?.templateContent}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
