const buildHeaderMappingPrompt = (headers) => {
    if (!Array.isArray(headers)) {
        throw new Error('headers must be an array')
    }

    return `
You are a CRM field mapping assistant.

Analyze only the headers.

Your task is to map uploaded CSV headers to a standard CRM schema.

Allowed CRM fields:
- fullName
- email
- phone
- company
- city
- state
- country
- leadStatus
- source
- notes

If a header does not match any of these fields, return "unknown".

Return valid JSON only using this exact format:

{
  "fieldMapping": {
    "Lead Name": "fullName",
    "Email": "email",
    "Phone": "phone"
  }
}

Do not include explanations.
Do not include markdown.
Do not wrap the response in code fences.

Headers:
${JSON.stringify(headers, null, 2)}
`.trim()
}

module.exports = {
    buildHeaderMappingPrompt
}
