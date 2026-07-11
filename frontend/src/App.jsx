import { useState } from "react";
import UploadForm from "./components/UploadForm";
import PreviewTable from "./components/PreviewTable";
import ImportButton from "./components/ImportButton";
import MappingTable from "./components/MappingTable";
import ResultTable from "./components/ResultTable";

function App() {
  const [previewData, setPreviewData] = useState(null);
  const [importResult, setImportResult] = useState(null);

  return (
    <div>
      <h1>LeadFlow AI</h1>

      <UploadForm setPreviewData={setPreviewData} />

      {previewData && (
        <>
          <PreviewTable previewData={previewData} />

          <ImportButton
            importId={previewData.importId}
            setImportResult={setImportResult}
          />
        </>
      )}

      {importResult && (
        <>
          <MappingTable mapping={importResult.mapping} />
          <ResultTable records={importResult.records} />
        </>
      )}
    </div>
  );
}

export default App;