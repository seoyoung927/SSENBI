import { getTemplateAPI } from "@/app/api/template/templateAPI";
import Banner from "@/app/components/common/banner/Banner";
import TemplateList from "@/app/components/common/template/TemplateList";

interface MessageTemplateType {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  image: string;
  usageCount: number;
}

interface ApiResponseType {
  categoryName: string;
  generalTemplates: MessageTemplateType[];
}

export default async function TemplatePage() {
  const fetchTemplates = async () => {
    try {
      const response = await getTemplateAPI();
      return response.result;
    } catch (error) {
      if (error instanceof Error) {
        return [];
      }
    }
  };

  const response = await fetchTemplates();

  const allCategories: string[] = [];
  const templatesByCategory: MessageTemplateType[][] = [];
  const allTemplates: MessageTemplateType[] = [];

  response.forEach((categoryData: ApiResponseType) => {
    const categoryName = categoryData.categoryName;
    allCategories.push(categoryName);

    const categoryTemplates = categoryData.generalTemplates.map(
      (template: MessageTemplateType) => ({
        templateId: template.templateId,
        templateTitle: template.templateTitle,
        templateContent: template.templateContent,
        usageCount: template.usageCount,
        image: template.image,
      }),
    );

    templatesByCategory.push(categoryTemplates);
    allTemplates.push(...categoryTemplates);
  });

  if (allCategories.length !== 0) allCategories.unshift("인기");
  const top10Templates = allTemplates
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 10);
  templatesByCategory.unshift(top10Templates);

  return (
    <div className="page-container">
      <Banner />
      <div className="pc-layout">
        <TemplateList
          categoryList={allCategories}
          allMessageTemplates={templatesByCategory}
        />
      </div>
    </div>
  );
}
