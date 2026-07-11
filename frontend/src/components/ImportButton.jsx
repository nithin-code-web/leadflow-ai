import api from "../api/api";

function ImportButton({ importId, setImportResult }) {

    const handleImport = async () => {

        const response = await api.post("/import", {
            importId
        });

        console.log("Import response:", response.data);

        setImportResult(response.data);

    };

    return (
        <button onClick={handleImport}>
            Import
        </button>
    );
}

export default ImportButton;