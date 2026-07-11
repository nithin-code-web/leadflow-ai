# 🚀 LeadFlow AI

> AI-powered CRM data import platform that transforms messy CSV files into a standardized CRM schema using Google Gemini.

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Express](https://img.shields.io/badge/Express-5.x-black)
![Google Gemini](https://img.shields.io/badge/Google-Gemini-blue)
![PapaParse](https://img.shields.io/badge/PapaParse-CSV-orange)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## 📖 Overview

LeadFlow AI is an AI-assisted CRM import system designed to eliminate one of the biggest problems in customer data onboarding: inconsistent CSV formats.

Instead of forcing users to manually map every CSV column, LeadFlow AI uses **Google Gemini** to intelligently understand uploaded headers and automatically map them to a standardized CRM schema.

The backend is built with a clean layered architecture using **Node.js**, **Express.js**, and **Google Gemini AI**, making it scalable, modular, and easy to extend.

---

## ✨ Features

- 📂 CSV Upload
- 📋 CSV Preview
- 🤖 AI Header Mapping
- 🔄 Automatic Row Transformation
- 🧠 Temporary In-Memory Import Session
- 🛡 CSV Validation
- ⚡ Fast Parsing with PapaParse
- 🧹 Automatic Cleanup of Uploaded Files
- ❌ Global Error Handling
- 🏗 Layered Backend Architecture

---

## 🏛 Architecture

```text
                CSV Upload
                     │
                     ▼
             Multer Middleware
                     │
                     ▼
              CSV Validation
                     │
                     ▼
              PapaParse Service
                     │
                     ▼
           Temporary Memory Store
                     │
                     ▼
               Preview Response
                     │
             User Confirms Import
                     │
                     ▼
          Google Gemini AI Mapping
                     │
                     ▼
         JavaScript Row Transformer
                     │
                     ▼
         Standard CRM JSON Records
```

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- Google Gemini API
- PapaParse
- Multer
- UUID
- dotenv

### Frontend

- React
- Vite
- Tailwind CSS
- Axios

### Development

- Git
- GitHub
- Postman
- CodeRabbit
- VS Code

---

## 📂 Project Structure

```text
leadflow-ai
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── routes
│   │   ├── services
│   │   ├── storage
│   │   ├── prompts
│   │   ├── validators
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── uploads
│
├── frontend
│
└── docs
```

---

## ⚙️ Backend Workflow

### Step 1

Upload CSV

↓

Validate CSV

↓

Parse CSV

↓

Generate Preview

↓

Store Import Session

### Step 2

User clicks Import

↓

Retrieve Import Session

↓

AI Header Mapping

↓

Transform Records

↓

Return Standard CRM Records

---

## 📡 API Endpoints

### Preview CSV

```http
POST /api/v1/preview
```

Returns

- Preview Records
- Headers
- Import ID

---

### Import CSV

```http
POST /api/v1/import
```

Returns

- AI Generated Header Mapping
- Standard CRM Records

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/nithin-code-web/leadflow-ai.git
```

### Backend

```bash
cd backend
npm install
```

### Configure Environment

```env
PORT=5000
GEMINI_API_KEY=YOUR_API_KEY
```

### Start Backend

```bash
npm run dev
```

---

## 📌 Current Capabilities

✅ Single CSV Import

✅ AI Header Mapping

✅ CRM Record Transformation

✅ Temporary Import Session

✅ Automatic Cleanup

---

## 🚧 Roadmap

- Multi-file Upload
- Folder Upload
- Duplicate Detection
- Background Processing
- Import History
- Database Persistence
- Authentication
- Progress Tracking
- Export Cleaned Data

---

## 🤝 Contributing

Contributions, ideas, and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Nithin Budime**

Backend Developer | AI Enthusiast

GitHub: https://github.com/nithin-code-web

LinkedIn: *https://linkedin.com/in/nithin-budime*