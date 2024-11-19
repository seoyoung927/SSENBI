import "../layout.css";
import Header from "@/app/components/layout/Header";
import CustomerForm from "@/app/components/common/customer/CustomerForm";

export default function CustomerCreatePage() {
  return (
    <div className="page-container flex-column">
      <Header title="새 고객 추가" showBackIcon />
      <CustomerForm />
    </div>
  );
}
