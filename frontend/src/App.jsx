import { useState } from "react";
import UploadForm from "./components/UploadForm";
import PreviewTable from "./components/PreviewTable";
import ImportButton from "./components/ImportButton";
import MappingTable from "./components/MappingTable";
import ResultTable from "./components/ResultTable";

// Step definition
const STEPS = [
  { id: 1, label: "Upload",  icon: "📂" },
  { id: 2, label: "Preview", icon: "👁️" },
  { id: 3, label: "Import",  icon: "⚡" },
  { id: 4, label: "Results", icon: "✅" },
];

function getActiveStep(previewData, importResult) {
  if (importResult)  return 4;
  if (previewData)   return 3;
  return 1;
}

function App() {
  const [previewData, setPreviewData]   = useState(null);
  const [importResult, setImportResult] = useState(null);

  const activeStep = getActiveStep(previewData, importResult);

  const handleReset = () => {
    setPreviewData(null);
    setImportResult(null);
  };

  return (
    <>
      {/* Ambient background */}
      <div className="app-bg" />

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-logo">🚀</div>
          <span className="navbar-title">LeadFlow AI</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span className="navbar-badge">Powered by Gemini</span>
          {(previewData || importResult) && (
            <button className="btn btn-ghost" onClick={handleReset} style={{ padding: "6px 16px", fontSize: "0.8rem" }}>
              ↩ Reset
            </button>
          )}
        </div>
      </nav>

      {/* Main content */}
      <div className="app-wrapper">

        {/* Hero */}
        <section className="hero">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            AI-Powered CRM Import Platform
          </div>
          <h1 className="hero-title">
            Transform Your CSV Data <br />
            <span className="hero-title-gradient">Instantly with AI</span>
          </h1>
          <p className="hero-subtitle">
            Upload any CSV file and let Google Gemini AI automatically map your
            columns to a standardized CRM schema — no manual work required.
          </p>
        </section>

        {/* Stepper */}
        <div className="stepper">
          {STEPS.map((step, i) => {
            const isDone   = activeStep > step.id;
            const isActive = activeStep === step.id;

            return (
              <div className="step" key={step.id}>
                <div className="step-item">
                  <div className={`step-circle ${isDone ? "done" : isActive ? "active" : ""}`}>
                    {isDone ? "✓" : step.icon}
                  </div>
                  <span className={`step-label ${isDone ? "done" : isActive ? "active" : ""}`}>
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`step-connector ${isDone ? "done" : isActive ? "active" : ""}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Upload Section — always visible */}
        {!importResult && (
          <UploadForm setPreviewData={setPreviewData} previewData={previewData} />
        )}

        {/* Preview + Import */}
        {previewData && !importResult && (
          <>
            <PreviewTable previewData={previewData} />
            <ImportButton
              importId={previewData.importId}
              setImportResult={setImportResult}
            />
          </>
        )}

        {/* Results */}
        {importResult && (
          <>
            <div className="success-banner">
              <span>🎉</span>
              Import complete! AI successfully mapped your CSV to the standard CRM schema.
            </div>
            <MappingTable mapping={importResult.mapping} />
            <ResultTable records={importResult.records} />
          </>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>
            Built by <a href="https://github.com/nithin-code-web" target="_blank" rel="noreferrer">Nithin Budime</a>
            <span className="footer-divider">·</span>
            Powered by <a href="https://ai.google.dev" target="_blank" rel="noreferrer">Google Gemini</a>
            <span className="footer-divider">·</span>
            LeadFlow AI © {new Date().getFullYear()}
          </p>
        </footer>

      </div>
    </>
  );
}

export default App;