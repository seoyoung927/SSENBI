import { getSingleTemplateAPI } from "@/app/api/template/templateAPI";
import Header from "@/app/components/layout/Header";
import TemplateClientButtons from "@/app/components/common/template/TemplateClientButtons";
import "./page.css";

interface MessageTemplateType {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  image: string;
  usageCount: number;
  createdAt: string;
}

const DEFAULT_TEMPLATE_DATA: MessageTemplateType = {
  templateId: 0,
  templateTitle: "",
  templateContent: "",
  image: "",
  usageCount: 0,
  createdAt: "",
};

async function fetchTemplateData(id: number) {
  try {
    const response = await getSingleTemplateAPI({ templateId: id });
    return response.result || { ...DEFAULT_TEMPLATE_DATA, templateId: id };
  } catch (error) {
    if (error instanceof Error) {
      return { ...DEFAULT_TEMPLATE_DATA, templateId: id };
    }
  }
}

export default async function TemplateIdPage({
  params,
}: {
  params: { id: number };
}) {
  const templateData: MessageTemplateType = await fetchTemplateData(params.id);

  return (
    <div className="page-container">
      <Header title={templateData.templateTitle} showBackIcon={true} />
      <TemplateClientButtons id={params.id} templateData={templateData} />
      <p className="template-id_count body-small">
        커스텀 사용횟수: {templateData.usageCount}
      </p>
      <div className="template-id_content body">
        {templateData.templateContent}
      </div>
    </div>
  );
}
