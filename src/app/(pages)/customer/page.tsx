import Header from "@/app/components/layout/Header";
import CustomerList from "./CustomerList";

export default function CustomerPage() {
  return (
    <div className="page-container">
      <Header title="고객" />
      <CustomerList />
    </div>
  );
}
