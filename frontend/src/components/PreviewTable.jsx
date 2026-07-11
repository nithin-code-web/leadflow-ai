function PreviewTable({ previewData }) {
  const { headers = [], preview = [], totalRows = 0, importId } = previewData;

  return (
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">👁️</div>
        <div style={{ flex: 1 }}>
          <div className="section-title">CSV Preview</div>
          <div className="section-subtitle">
            Showing {Math.min(preview.length, totalRows)} of {totalRows} rows
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{totalRows.toLocaleString()}</div>
          <div className="stat-label">Total Rows</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{headers.length}</div>
          <div className="stat-label">Columns</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{preview.length}</div>
          <div className="stat-label">Preview</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ fontSize: "1rem", paddingTop: "2px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {importId?.slice(0, 8)}…
            </span>
          </div>
          <div className="stat-label">Import ID</div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: "48px", textAlign: "center", color: "var(--text-muted)" }}>#</th>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>
                  {index + 1}
                </td>
                {headers.map((header) => (
                  <td key={header} title={row[header]}>
                    {row[header] !== undefined && row[header] !== ""
                      ? row[header]
                      : <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>—</span>
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalRows > preview.length && (
        <p style={{ marginTop: "12px", fontSize: "0.78rem", color: "var(--text-muted)", textAlign: "center" }}>
          + {totalRows - preview.length} more rows will be imported
        </p>
      )}
    </div>
  );
}

export default PreviewTable;