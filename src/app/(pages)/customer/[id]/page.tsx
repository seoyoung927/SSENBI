import "../layout.css";
import Header from "@/app/components/layout/Header";
import CustomerDetail from "./CustomerDetail";

export default function CustomerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="page-container flex-column">
      <Header title="고객 정보" showBackIcon />
      <CustomerDetail id={Number(params.id)} />
    </div>
  );
}
