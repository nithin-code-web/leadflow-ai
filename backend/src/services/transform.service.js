const CRM_FIELDS = [
    'fullName',
    'email',
    'phone',
    'company',
    'city',
    'state',
    'country',
    'leadStatus',
    'source',
    'notes'
]

const createEmptyCrmRecord = () => {
    return CRM_FIELDS.reduce((record, field) => {
        record[field] = ''
        return record
    }, {})
}

const transformRows = (rows, mapping) => {
    if (!Array.isArray(rows)) {
        throw new Error('rows must be an array')
    }

    if (!mapping || typeof mapping !== 'object') {
        throw new Error('mapping must be an object')
    }

    return rows.map((row) => {
        const crmRecord = createEmptyCrmRecord()

        Object.entries(mapping).forEach(([sourceHeader, crmField]) => {
            if (crmField === 'unknown' || !CRM_FIELDS.includes(crmField)) {
                return
            }

            const value = row[sourceHeader] ?? ''

            if (!crmRecord[crmField]) {
                crmRecord[crmField] = value
            }
        })

        return crmRecord
    })
}

module.exports = {
    transformRows
}
