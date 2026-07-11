function ResultTable({ records }) {

    if (!records.length) return null;

    const headers = Object.keys(records[0]);

    return (

        <div>

            <h2>Standard CRM Records</h2>

            <table border="1">

                <thead>

                    <tr>

                        {headers.map(header => (
                            <th key={header}>{header}</th>
                        ))}

                    </tr>

                </thead>

                <tbody>

                    {records.map((record, index) => (

                        <tr key={index}>

                            {headers.map(header => (
                                <td key={header}>
                                    {record[header]}
                                </td>
                            ))}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ResultTable;