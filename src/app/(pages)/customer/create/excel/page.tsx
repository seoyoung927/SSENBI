import "../../layout.css";
import Header from "@/app/components/layout/Header";
import CustomerExcel from "@/app/components/common/customer/CustomerExcel";

export default function CustomerCreateExcelPage() {
  return (
    <div className="page-container flex-column">
      <Header title="엑셀 파일 업로드" showBackIcon />

      <CustomerExcel />
    </div>
  );
}
