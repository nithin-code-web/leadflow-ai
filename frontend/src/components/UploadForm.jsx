import { useState } from "react";
import api from "../api/api";

function UploadForm({ setPreviewData, previewData }) {
  const [file, setFile]         = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      setError("Only .csv files are supported.");
      return;
    }
    setError(null);
    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    handleFileChange(dropped);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFilePreview = async () => {
    if (!file) {
      setError("Please select a CSV file first.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.post("/preview", formData);
      setPreviewData(response.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to preview CSV. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // If preview already loaded, show compact confirmation
  if (previewData) {
    return (
      <div className="section-card">
        <div className="section-header">
          <div className="section-icon">📂</div>
          <div>
            <div className="section-title">File Uploaded</div>
            <div className="section-subtitle">CSV parsed successfully</div>
          </div>
        </div>
        <div className="upload-file-badge" style={{ fontSize: "0.875rem", padding: "8px 16px" }}>
          <span className="upload-file-icon">✅</span>
          {file?.name || "Uploaded file"} — ready to import
        </div>
      </div>
    );
  }

  return (
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">📂</div>
        <div>
          <div className="section-title">Upload CSV File</div>
          <div className="section-subtitle">Drag & drop or click to browse your CSV</div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
          <button className="error-close" onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* Drop Zone */}
      <div
        className={`upload-zone ${dragging ? "dragging" : ""} ${file ? "has-file" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{ position: "relative" }}
      >
        <input
          type="file"
          accept=".csv"
          onChange={(e) => handleFileChange(e.target.files[0])}
        />

        {file ? (
          <>
            <span className="upload-icon">📄</span>
            <div className="upload-file-badge">
              <span className="upload-file-icon">📊</span>
              {file.name}
              <span style={{ color: "var(--text-muted)", fontWeight: 400, marginLeft: "4px" }}>
                ({formatFileSize(file.size)})
              </span>
            </div>
            <p className="upload-text-secondary">File selected — click Preview to continue</p>
          </>
        ) : (
          <>
            <span className="upload-icon">☁️</span>
            <p className="upload-text-primary">Drop your CSV file here</p>
            <p className="upload-text-secondary">or click anywhere to browse files</p>
            <div className="upload-format-chips">
              <span className="format-chip">.csv</span>
              <span className="format-chip">UTF-8</span>
              <span className="format-chip">Max 10MB</span>
            </div>
          </>
        )}
      </div>

      {/* Action */}
      <div className="btn-actions">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleFilePreview}
          disabled={!file || loading}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Parsing CSV...
            </>
          ) : (
            <>
              <span>👁️</span>
              Preview CSV
            </>
          )}
        </button>
        {file && (
          <button
            className="btn btn-ghost"
            onClick={() => { setFile(null); setError(null); }}
            disabled={loading}
          >
            ✕ Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default UploadForm;