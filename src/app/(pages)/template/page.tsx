import { getTemplateAPI } from "@/app/api/template/templateAPI";
import Banner from "@/app/components/common/banner/Banner";
import TemplateList from "@/app/components/common/template/TemplateList";

interface MessageTemplateType {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  templateUsageCount: number;
  image: string;
  usageCount: number;
}

export default async function TemplatePage() {
  const response = await getTemplateAPI();

  const fetchedCategories: string[] = ["인기"];
  const templatesByCategory: MessageTemplateType[][] = [];
  const allTemplates: MessageTemplateType[] = [];

  response.result.forEach((categoryData: any) => {
    const categoryName = categoryData.categoryName;
    fetchedCategories.push(categoryName);

    const categoryTemplates = categoryData.generalTemplates.map(
      (template: any) => ({
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

  const top10Templates = allTemplates
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 10);
  templatesByCategory.unshift(top10Templates);

  return (
    <div className="page-container">
      <Banner />
      <TemplateList
        categoryList={fetchedCategories}
        allMessageTemplates={templatesByCategory}
      />
    </div>
  );
}
