"use client";

import { postCustomersFromExcel } from "@/app/api/customer/customerAPI";
import {
  CustomerCreationType,
  GenderType,
} from "@/types/customer/customerType";
import getRandomTagColor from "@/utils/getRandomTagColor";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as XLSX from "xlsx";
import "./CustomerExcel.css";

interface RowData {
  [key: string]: any;
}

export default function CustomerExcel() {
  const router = useRouter();
  const [headers, setHeaders] = useState<string[]>([]);
  const [excelData, setExcelData] = useState<RowData[]>([]);

  const handleDownload = () => {
    const fileUrl = "/assets/excel/SSENBI_엑셀고객등록양식.xlsx";

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "SSENBI_엑셀고객등록양식.xlsx";
    link.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json: RowData[] = XLSX.utils
          .sheet_to_json<RowData>(worksheet, {
            defval: "",
            raw: false,
          })
          .slice(1);

        if (json.length > 0) {
          const firstKey = Object.keys(json[0])[0];

          const excludedColumns = ["번호 길이", "메모 글자수", "주의사항"];

          const allHeaders = Object.keys(json[0]).filter(
            (key) => !excludedColumns.includes(key),
          );
          setHeaders(allHeaders);

          const filteredData = json
            .filter(
              (row) =>
                row[firstKey] !== undefined &&
                row[firstKey] !== null &&
                row[firstKey].toString().trim() !== "",
            )
            .map((row) => {
              const newRow: RowData = {};
              allHeaders.forEach((key) => {
                newRow[key] = row[key];
              });
              return newRow;
            });

          setExcelData(filteredData);
        } else {
          setExcelData([]);
        }
      };
      reader.readAsArrayBuffer(file);
    }
    event.target.value = "";
  };

  const handleSubmit = async () => {
    const customers: CustomerCreationType[] = excelData.map((customer) => ({
      customerName: customer["고객 이름"] as string,
      customerAge: customer["고객 나이"] as number,
      customerGender: customer["고객 성별"] as GenderType,
      customerPhoneNumber: customer["고객 전화번호"] as string,
      customerMemo: customer["고객 메모"] as string,
      customerColor: getRandomTagColor(),
      customerTags: [],
    }));
    const customersData = {
      customers,
    };

    try {
      await postCustomersFromExcel(customersData);

      router.replace("/customer");
    } catch {
      alert("고객 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="customer-create-excel_form">
        <div className="customer-create-excel_info">
          <p className="body customer-create-excel_button-download-label">
            기본 제공되는 엑셀 양식입니다.
            <br />
            양식을 다운로드한 후, 내용을 작성하여 업로드해주세요.
          </p>
          <button
            onClick={handleDownload}
            className="customer-create-excel_button-download body-medium"
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
        </div>
      </div>
      {excelData.length > 0 && (
        <table className="styled-table">
          <thead>
            <tr>
              {headers.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.map((row, idx) => (
              <tr key={idx}>
                {headers.map((key, i) => (
                  <td key={i}>{row[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="button-group">
        <button onClick={router.back} className="button body-strong">
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="button primary body-strong"
          disabled={excelData.length === 0}
        >
          추가
        </button>
      </div>
    </>
  );
}
