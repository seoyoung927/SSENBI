"use client";

import "../../layout.css";
import Header from "@/app/components/layout/Header";
import { useState } from "react";
import * as XLSX from "xlsx";
import "./page.css";
import { useRouter } from "next/navigation";

export default function CustomerCreateExcelPage() {
  const router = useRouter();
  const [excelData, setExcelData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownload = () => {
    const fileUrl = "/assets/excel/SSENBI_엑셀고객등록양식.xlsx";

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "SSENBI_엑셀고객등록양식.xlsx";
    link.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      if (data) {
        try {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);
          setExcelData(parsedData);
          setErrorMessage(null);
        } catch (error) {
          setErrorMessage("파일을 처리하는 중 오류가 발생했습니다.");
        }
      }
    };

    reader.onerror = () => {
      setErrorMessage("파일을 읽는 중 오류가 발생했습니다.");
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = () => {
    if (excelData.length === 0) {
      setErrorMessage("데이터가 없습니다. 파일을 업로드해주세요.");
      return;
    }
    router.push("/customer");
  };

  return (
    <div className="page-container flex-column">
      <Header title="엑셀 파일 업로드" showBackIcon />

      <div className="customer-create-excel_form">
        <div className="customer-create-excel_info">
          <p className="body customer-create-excel_button-download-label">
            기본 제공되는 엑셀 양식입니다.
            <br />
            양식을 다운로드한 후, 내용을 작성하여 업로드해주세요.
          </p>
          <button
            onClick={handleDownload}
            className="customer-create-excel_button-download"
          >
            ⬇️ 엑셀 양식 다운로드
          </button>
        </div>

        <div className="customer-create-excel_upload-container">
          <input
            id="excel-upload"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="customer-create-excel_file-input"
          />
          <button
            onClick={handleSubmit}
            className="blue_button customer-create-excel_up_button-submit"
          >
            업로드
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
