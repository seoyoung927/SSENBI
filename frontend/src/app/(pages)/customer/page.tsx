import CustomerList from "@/app/components/common/customer/CustomerList";
import Header from "@/app/components/layout/Header";

export default function CustomerPage() {
  return (
    <div className="page-container">
      <Header title="고객" />
      <CustomerList />
    </div>
  );
}
