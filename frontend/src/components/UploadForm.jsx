import { useState } from "react";
import api from "../api/api";

function UploadForm({setPreviewData}) {
    const [file, setFile] = useState(null);

    const handleFilePreview = async () => {
        const formdata = new FormData();

        formdata.append("file", file);

        const response = await  api.post("/preview",formdata)

        setPreviewData(response.data);
    }

  return (
    <div>
      <h2>Upload CSV</h2>

      <input 
      type="file" 
      accept=".csv"
      onChange={(event) => setFile(event.target.files[0])} />

      <p>{file ? file.name : "No file selected"}</p>

      <button onClick={handleFilePreview}>Preview</button>
    </div>
  );
}

export default UploadForm;