function MappingTable({ mapping }) {

    const fields = mapping.fieldMapping;

    return (
        <div>

            <h2>AI Header Mapping</h2>

            <table border="1">

                <thead>

                    <tr>
                        <th>CSV Header</th>
                        <th>CRM Field</th>
                    </tr>

                </thead>

                <tbody>

                    {Object.entries(fields).map(([csv, crm]) => (

                        <tr key={csv}>
                            <td>{csv}</td>
                            <td>{crm}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );

}

export default MappingTable;