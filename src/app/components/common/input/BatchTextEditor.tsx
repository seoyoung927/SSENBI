import RightArrowIcon from "@/app/assets/svg/RightArrow.svg";
import "./BatchTextEditor.css";

interface BatchTextEditorProps {
  batchTextFrom: string;
  batchTextTo: string;
  setBatchTextFrom: (value: string) => void;
  setBatchTextTo: (value: string) => void;
  isEdit: boolean;
  handleBatchTextChange: () => void;
}

export default function BatchTextEditor({
  batchTextFrom,
  batchTextTo,
  setBatchTextFrom,
  setBatchTextTo,
  isEdit,
  handleBatchTextChange,
}: BatchTextEditorProps) {
  return (
    <div className="text-collection">
      <p className="subheading">텍스트 일괄 수정</p>
      <div className="row">
        <input
          className="body text-input"
          value={batchTextFrom}
          onChange={(e) => setBatchTextFrom(e.target.value)}
          disabled={!isEdit}
        />
        <div style={{ width: 24, height: 24 }}>
          <RightArrowIcon />
        </div>
        <input
          className="body text-input"
          value={batchTextTo}
          onChange={(e) => setBatchTextTo(e.target.value)}
          disabled={!isEdit}
        />
        <button
          className="white_button sub-button"
          onClick={handleBatchTextChange}
          disabled={!isEdit}
        >
          변경하기
        </button>
      </div>
    </div>
  );
}
