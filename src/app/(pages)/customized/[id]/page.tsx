"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/layout/Header";
import BorderTag from "@/app/components/common/tag/BorderTag";
import { useRouter } from "next/navigation";
import {
  deleteCustomTemplateAPI,
  getCustomTemplateAPI,
  postCustomTemplateAPI,
  putCustomTemplateAPI,
} from "@/app/api/customized/customizedAPI";
import { TagType } from "@/types/tag/tagTypes";
import Cookies from "js-cookie";
import { PutCustomTemplateParamsType } from "@/types/customized/customizedTypes";
import ChatAIContainer from "@/app/components/chat/ChatAIContainer";
import "./page.css";
import { CustomerType } from "@/types/customer/customerType";
import TagList from "@/app/components/common/tag/TagList";
import CustomerTagList from "@/app/components/common/tag/CustomerTagList";
import SendIcon from "@/app/assets/svg/Send.svg";
import FilledTag from "@/app/components/common/tag/FilledTag";
import BatchTextEditor from "@/app/components/common/input/BatchTextEditor";
import AiModal from "@/app/components/common/modal/AiModal";

// Custom Template type definition
interface CustomTemplate {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  templateUsageCount: number;
  templateCreatedAt: string;
  templateTags: TagType[];
  templateCustomers: CustomerType[];
}

// ApiResponse type definition
type ApiResponse = CustomTemplate;

interface CustomizedIdPageProps {
  params: {
    id: string;
  };
}

export default function CustomizedIdPage({ params }: CustomizedIdPageProps) {
  const router = useRouter();
  const { id } = params;
  const [customMessageTemplate, setCustomMessageTemplate] =
    useState<ApiResponse | null>(null);
  const [modifiedTemplate, setModifiedTemplate] =
    useState<CustomTemplate | null>(null);
  const [isSaveMessageVisible, setIsSaveMessageVisible] =
    useState<boolean>(false);
  const [isSaveAsMessageVisible, setIsSaveAsMessageVisible] =
    useState<boolean>(false);
  const [isAIEditModalOpen, setIsAIEditModalModalOpen] =
    useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // State for batch editing
  const [batchTextFrom, setBatchTextFrom] = useState<string>("");
  const [batchTextTo, setBatchTextTo] = useState<string>("");

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

  const clearBatchText = () => {
    setBatchTextFrom("");
    setBatchTextTo("");
  };

  const displaySaveAsWindow = async () => {
    setIsSaveAsMessageVisible(true);

    await new Promise((resolve) => setTimeout(resolve, 6000));

    setIsSaveAsMessageVisible(false);
  };

  const displayEditWindow = () => {
    setIsSaveMessageVisible(true);
    setTimeout(() => {
      setIsSaveMessageVisible(false);
    }, 3000);
  };
  const handleSaveTemplate = async () => {
    if (!modifiedTemplate) return;

    const templateParams: PutCustomTemplateParamsType = {
      templateId: Number(id),
      title: modifiedTemplate.templateTitle,
      content: modifiedTemplate.templateContent,
      afterCustomerIds: modifiedTemplate.templateCustomers.map(
        (customer) => customer.customerId,
      ),
      afterTags: modifiedTemplate.templateTags.map((tag) => tag.tagId),
    };

    try {
      const response = await putCustomTemplateAPI(templateParams);
      console.log("putCustomTemplateAPI response", response);

      if (response.code === "S10000" && response.message === "SUCCESS") {
        handleSaveMessage();
        setIsEdit(false);
        clearBatchText();
        displayEditWindow();
      }
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
    field: keyof CustomTemplate,
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

  const handleOpenAIModal = () => {
    setIsAIEditModalModalOpen(true);
    setIsEdit(true);
  };

  const handleCloseAIModal = () => {
    setIsAIEditModalModalOpen(false);
  };

  const handleSaveAIContent = (content: string) => {
    handleInputChange({ target: { value: content } } as any, "templateContent");
  };

  const sendMessage = () => {
    router.push(`/message/create?id=${id}`);
  };

  const changeCustomers = (newCustomers: CustomerType[]) => {
    setModifiedTemplate((prev) => {
      if (prev) {
        return { ...prev, templateCustomers: newCustomers };
      } else {
        return {
          templateId: Number(id),
          templateTitle: "",
          templateContent: "",
          templateUsageCount: 0,
          templateCreatedAt: "",
          templateTags: [],
          templateCustomers: newCustomers,
        };
      }
    });
  };

  const changeTags = (newTags: TagType[]) => {
    setModifiedTemplate((prev) => {
      if (prev) {
        return { ...prev, templateTags: newTags };
      } else {
        return {
          templateId: Number(id),
          templateTitle: "",
          templateContent: "",
          templateUsageCount: 0,
          templateCreatedAt: "",
          templateTags: newTags,
          templateCustomers: [],
        };
      }
    });
  };

  const handleBatchTextChange = () => {
    if (modifiedTemplate) {
      const escapedBatchTextFrom = batchTextFrom.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      ); // 특수 문자를 이스케이프 처리
      const updatedContent = modifiedTemplate.templateContent.replace(
        new RegExp(escapedBatchTextFrom, "g"),
        batchTextTo,
      );
      setModifiedTemplate((prev) => {
        if (prev) {
          return { ...prev, templateContent: updatedContent };
        }
        return prev;
      });
    }
  };

  const handleSaveAsTemplate = async () => {
    if (modifiedTemplate) {
      const response = await postCustomTemplateAPI({
        title: modifiedTemplate?.templateTitle,
        content: modifiedTemplate?.templateContent,
        tagIds: modifiedTemplate?.templateTags.map((tag) => tag.tagId),
        customerIds: modifiedTemplate?.templateCustomers.map(
          (customer) => customer.customerId,
        ),
      });

      console.log("handleSaveAsTemplate response", response);

      displaySaveAsWindow();

      router.push(`/customized/`);
    }
  };

  return (
    <div className="page-container">
      <Header title="커스텀" showBackIcon={true} />

      {isSaveMessageVisible && (
        <div className="save-message">글이 수정되었습니다!</div>
      )}

      {isSaveAsMessageVisible && (
        <div className="save-message">글이 복제되었습니다!</div>
      )}

      <div className="customized-info-list">
        <div className="customized-info">
          <div className="space-between">
            <p className="subheading">제목</p>
            <button
              onClick={sendMessage}
              type="button"
              className="customized-send_button"
            >
              메세지 전송
              <SendIcon className="send-icon" />
            </button>
          </div>
          <textarea
            className="body"
            value={modifiedTemplate?.templateTitle || ""}
            onChange={(e) => handleInputChange(e, "templateTitle")}
            maxLength={25}
            disabled={!isEdit}
          />
        </div>
        <div className="customized-info">
          <p className="subheading">고객</p>
          <div className="customized-info_tag-list">
            {isEdit && modifiedTemplate ? (
              <div className="taglist-container">
                <CustomerTagList
                  customers={modifiedTemplate?.templateCustomers || []}
                  setCustomers={changeCustomers}
                />
              </div>
            ) : (
              modifiedTemplate?.templateCustomers.map((tag) => (
                <FilledTag
                  key={tag.customerId}
                  color={tag.customerColor}
                  tagName={tag.customerName}
                />
              ))
            )}
          </div>
        </div>
        <div className="customized-info">
          <p className="subheading">태그</p>
          <div className="customized-info_tag-list">
            {isEdit && modifiedTemplate ? (
              <div className="taglist-container">
                <TagList
                  tags={modifiedTemplate?.templateTags}
                  setTags={changeTags}
                />
              </div>
            ) : (
              modifiedTemplate?.templateTags.map((tag) => (
                <BorderTag
                  key={tag.tagId}
                  color={tag.tagColor}
                  tagName={tag.tagName}
                />
              ))
            )}
          </div>
        </div>
        <div className="customized-info">
          <p className="subheading">내용</p>
          <textarea
            className="textarea-content body"
            value={modifiedTemplate?.templateContent || ""}
            onChange={(e) => handleInputChange(e, "templateContent")}
            disabled={!isEdit}
            maxLength={300}
          />
        </div>
      </div>

      <div className="customized-button-group">
        {isEdit ? (
          <button
            onClick={handleSaveAsTemplate}
            type="button"
            className="customized-detail_button body blue_button"
          >
            {"다른 이름으로 저장하기"}
          </button>
        ) : (
          <button
            onClick={handleDelete}
            type="button"
            className="customized-detail_button body red_button"
          >
            삭제
          </button>
        )}
        <button
          onClick={handleOpenAIModal}
          type="button"
          className="customized-detail_button body gradient_button"
          style={{ borderRadius: 16 }}
        >
          {"쎈비 AI \n도움 받기"}
        </button>
        <button
          onClick={toggleEditMode}
          type="button"
          className="customized-detail_button body blue_button"
        >
          {isEdit ? "수정 완료" : "수정하기"}
        </button>
      </div>

      <AiModal isOpen={isAIEditModalOpen} onClose={handleCloseAIModal}>
        <ChatAIContainer
          content={modifiedTemplate?.templateContent || ""}
          tags={modifiedTemplate?.templateTags}
          customers={modifiedTemplate?.templateCustomers}
          onSave={handleSaveAIContent}
          onClose={handleCloseAIModal}
        />
      </AiModal>
    </div>
  );
}
