import { useState } from "react";

function ResultTable({ records }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  if (!records || records.length === 0) return null;

  const headers = Object.keys(records[0]);

  // Filter
  const filtered = records.filter((record) =>
    Object.values(record).some((val) =>
      String(val ?? "").toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Paginate
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon" style={{ background: "linear-gradient(135deg, #00e5a0 0%, #4f8ef7 100%)" }}>
          ✅
        </div>
        <div style={{ flex: 1 }}>
          <div className="section-title">Standard CRM Records</div>
          <div className="section-subtitle">
            {records.length} record{records.length !== 1 ? "s" : ""} transformed successfully
          </div>
        </div>
      </div>

      {/* Stats + Search row */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        <div className="stats-row" style={{ flex: 1, minWidth: "240px", marginBottom: 0 }}>
          <div className="stat-card">
            <div className="stat-value">{records.length.toLocaleString()}</div>
            <div className="stat-label">Records</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{headers.length}</div>
            <div className="stat-label">CRM Fields</div>
          </div>
          {searchQuery && (
            <div className="stat-card">
              <div className="stat-value" style={{ fontSize: "1.4rem" }}>{filtered.length}</div>
              <div className="stat-label">Matched</div>
            </div>
          )}
        </div>

        {/* Search */}
        <div style={{ position: "relative", minWidth: "220px" }}>
          <span style={{
            position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
            color: "var(--text-muted)", fontSize: "0.85rem", pointerEvents: "none"
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search records…"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              width: "100%",
              padding: "8px 12px 8px 36px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-primary)",
              fontSize: "0.85rem",
              fontFamily: "var(--font-sans)",
              outline: "none",
              transition: "border-color var(--transition-fast)",
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent-blue)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border-subtle)"}
          />
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
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  style={{ textAlign: "center", color: "var(--text-muted)", padding: "32px", fontStyle: "italic" }}
                >
                  No records match your search.
                </td>
              </tr>
            ) : (
              paged.map((record, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>
                    {(currentPage - 1) * PAGE_SIZE + index + 1}
                  </td>
                  {headers.map((header) => (
                    <td key={header} title={record[header]}>
                      {record[header] !== undefined && record[header] !== ""
                        ? record[header]
                        : <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>—</span>
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "8px", marginTop: "16px", flexWrap: "wrap"
        }}>
          <button
            className="btn btn-ghost"
            style={{ padding: "6px 14px", fontSize: "0.8rem" }}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            ← Prev
          </button>

          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                className="btn"
                style={{
                  padding: "6px 12px",
                  fontSize: "0.8rem",
                  background: currentPage === page ? "var(--gradient-primary)" : "var(--bg-card)",
                  border: currentPage === page ? "none" : "1px solid var(--border-subtle)",
                  color: currentPage === page ? "#fff" : "var(--text-secondary)",
                  boxShadow: currentPage === page ? "var(--shadow-glow)" : "none",
                  minWidth: "36px",
                }}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          {totalPages > 7 && currentPage < totalPages - 3 && (
            <span style={{ color: "var(--text-muted)" }}>…</span>
          )}

          <button
            className="btn btn-ghost"
            style={{ padding: "6px 14px", fontSize: "0.8rem" }}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next →
          </button>

          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "8px" }}>
            Page {currentPage} of {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}

export default ResultTable;