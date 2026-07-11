import { useState } from "react";
import api from "../api/api";

function ImportButton({ importId, setImportResult }) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const handleImport = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await api.post("/import", { importId });
      setImportResult(response.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Import failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon" style={{ background: "linear-gradient(135deg, #00e5a0 0%, #00b3ff 100%)" }}>
          ⚡
        </div>
        <div>
          <div className="section-title">AI-Powered Import</div>
          <div className="section-subtitle">
            Google Gemini will map your CSV headers to the standard CRM schema
          </div>
        </div>
      </div>

      {/* Info callout */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        background: "rgba(162, 89, 255, 0.07)",
        border: "1px solid rgba(162, 89, 255, 0.2)",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "20px",
        fontSize: "0.875rem",
        color: "var(--text-secondary)",
        lineHeight: "1.6"
      }}>
        <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>🤖</span>
        <div>
          <strong style={{ color: "var(--accent-purple)", display: "block", marginBottom: "4px" }}>
            How it works
          </strong>
          Gemini AI analyzes your CSV column headers and intelligently maps each one to
          a standardized CRM field (name, email, phone, company, etc.) — even if your
          column names are unconventional.
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="error-banner" style={{ marginBottom: "16px" }}>
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
          <button className="error-close" onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* CTA */}
      <button
        className="btn btn-success btn-lg btn-full"
        onClick={handleImport}
        disabled={loading}
        id="import-btn"
      >
        {loading ? (
          <>
            <span className="spinner" style={{ borderColor: "rgba(2,26,18,0.3)", borderTopColor: "#021a12" }} />
            AI is mapping your data…
          </>
        ) : (
          <>
            <span>🚀</span>
            Run AI Import
          </>
        )}
      </button>

      {loading && (
        <p style={{ textAlign: "center", marginTop: "12px", fontSize: "0.8rem", color: "var(--text-muted)", animation: "fadeIn 0.3s ease" }}>
          Sending headers to Gemini · Transforming records · This may take a moment…
        </p>
      )}
    </div>
  );
}

export default ImportButton;