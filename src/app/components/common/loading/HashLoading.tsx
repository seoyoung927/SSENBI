import { HashLoader } from "react-spinners";
import "./HashLoading.css";

export default function HashLoading() {
  return (
    <div className="loading_container">
      <HashLoader color="#008fff" size={150} />
    </div>
  );
}
