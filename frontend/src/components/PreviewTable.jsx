

function PreviewTable({ previewData }) {
    return (
        <div>
            <h2>Preview Table</h2>

            <p>Total Rows: {previewData.totalRows}</p>

            <table border="1">
                <thead>
                    <tr>
                        {previewData.headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {previewData.preview.map((row, index) => (
                        <tr key={index}>
                            {previewData.headers.map((header) => (
                                <td key={header}>{row[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PreviewTable;