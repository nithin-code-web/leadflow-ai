function MappingTable({ mapping }) {
  const fields = mapping?.fieldMapping ?? {};
  const entries = Object.entries(fields);

  return (
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon" style={{ background: "linear-gradient(135deg, #a259ff 0%, #4f8ef7 100%)" }}>
          🧠
        </div>
        <div style={{ flex: 1 }}>
          <div className="section-title">AI Header Mapping</div>
          <div className="section-subtitle">
            {entries.length} field{entries.length !== 1 ? "s" : ""} mapped to CRM schema
          </div>
        </div>
        <div className="ai-badge">
          <span className="ai-badge-dot" />
          Gemini AI
        </div>
      </div>

      {/* Summary chips */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "0.75rem", fontWeight: 600,
          background: "rgba(255,181,71,0.1)", border: "1px solid rgba(255,181,71,0.3)",
          borderRadius: "999px", padding: "3px 12px", color: "var(--accent-amber)"
        }}>
          📋 CSV Headers → CRM Fields
        </span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "0.75rem", fontWeight: 600,
          background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.3)",
          borderRadius: "999px", padding: "3px 12px", color: "var(--accent-green)"
        }}>
          ✓ {entries.length} fields resolved
        </span>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: "40px", textAlign: "center", color: "var(--text-muted)" }}>#</th>
              <th>Your CSV Header</th>
              <th style={{ width: "60px", textAlign: "center" }}></th>
              <th>CRM Field</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([csv, crm], index) => (
              <tr key={csv}>
                <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>
                  {index + 1}
                </td>
                <td className="mapping-csv-col">{csv}</td>
                <td className="arrow-cell">→</td>
                <td className="mapping-crm-col">{crm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MappingTable;