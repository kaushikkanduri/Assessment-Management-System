
# 📘 Assessment Management System

A **full-stack web application** built with **MERN Stack**. The system allows:

* User Authentication (register/login)
* PDF Report Generation from pre-existing assessment data
* Authentication: Implemented with JWT tokens, password hashing & comparison for secure login.
* Configuration-driven flexibility (support new assessment types without code changes)


## 🚀 Features

### 🔐 User Authentication

* User **signup** with validation
* Secure **login**
* After login, if the JWT token is valid and not expired, user is automatically redirected to the /generate-report endpoint.
* Backend API for authentication operations
* React + HTML + CSS forms for UI

### 📄 PDF Report Generation

* Generate reports from **pre-existing assessment data** (`data.js` / `data.ts`)
* Dynamic **report templates** based on `assessment_id`
* **Configuration-driven design**: Add new assessment types, mappings, and ranges without touching code
* Uses **Puppeteer** to convert HTML templates into styled PDFs
* Stores generated PDFs in the local filesystem

---

## 🏗️ Architecture

```
Assessment-Management-System/
├── components/               # React components (e.g., AssessmentReport.js)
│   └── AssessmentReport.js
├── config/                   # Config files (sections, mappings, classifications)
├── Controllers/              # Controllers (e.g., reportController.js)
├── middlewares/              # Middlewares (errorHandler.js, tokenHandler.js)
│   ├── errorHandler.js
│   └── tokenHandler.js
├── Models/                   # Database models (if needed for users/auth)
├── node_modules/             # Dependencies
├── public/                   # Public assets (if used for frontend)
├── reports/                  # 📄 Generated PDF reports are saved here
├── Routes/                   # API route definitions
│   ├── reportRoute.js        # Handles /generate-report endpoint
│   └── userRoute.js          # Handles signup/login/auth endpoints
├── views/                    # HTML templates (used by Puppeteer for PDF generation)
├── .env                      # Environment variables (JWT secret, etc.)
├── .gitignore
├── app.js                    # Express app entry point
├── constants.js              # Constant values (config keys, enums, etc.)
├── data.js                   # Pre-existing assessment data (session-based)
├── package.json
├── package-lock.json

```
---

Perfect 👌 Here’s the **updated Setup & Installation section** for your README based on your actual folder structure and implementation:

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/kaushikkanduri/Assessment-Management-System.git
cd Assessment-Management-System
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a **`.env`** file in the root directory with the following keys:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key
TOKEN_EXPIRY=1h
```

### 4️⃣ Run the Application

Start the server:

```bash
node app.js
```

### 5️⃣ Access the System

* **Frontend (React)** runs from `components/` (served by backend or standalone if you configure it).
* **Backend API** runs on `http://localhost:5000`.
* **PDFs** generated will be saved inside the `/reports` directory.

### 6️⃣ Test the Flow

1. Register a user → `POST /auth/signup`
2. Login user → `POST /auth/login` (receives JWT token)
3. If token is valid and not expired → system automatically redirects user to **`/generate-report?session_id=your_session_id`**
4. PDF will appear in `/reports/`.

---

Do you want me to also include **sample API calls with curl/Postman** for signup, login, and report generation in the README?


## 🔑 API Endpoints

### Authentication

* `POST /api/register` → Register user
* `POST /api/login` → Login user

### Report Generation

* `POST /generate-report/:id`

  * **Params**: `{ session_id: "session_001" }`
  * **Action**: Reads `data.js` , identifies `assessment_id`, applies config, generates PDF, saves to `reports/`

---

## 📂 Data Handling

* All sample assessment data lives in **`data.js` **
* Each record has a **`session_id`**
* Example:

```json
{
  "session_id": "session_001",
  "assessment_id": "as_hr_02",
  "accuracy": 80,
  "bodyCompositionData": { "BMI": "33.145" },
  "vitalsMap": {
    "vitals": { "heart_rate": 75, "bp_sys": 124, "bp_dia": 82 }
  }
}
```

---

## ⚡ Configuration System

The core challenge is **maximum flexibility**.

### 🔹 Sections Configuration

```json
{
  "as_hr_02": ["Key Body Vitals", "Heart Health", "Posture", "Body Composition"],
  "as_card_01": ["Key Body Vitals", "Cardiovascular Endurance", "Body Composition"]
}
```

### 🔹 Field Mappings

```json
{
  "overallHealthScore": "accuracy",
  "heartRate": "vitalsMap.vitals.heart_rate",
  "bmi": "bodyCompositionData.BMI",
  "bp_sys": "vitalsMap.vitals.bp_sys",
  "bp_dia": "vitalsMap.vitals.bp_dia"
}
```

### 🔹 Value Classification

```json
{
  "bmi": {
    "underweight": "<18.5",
    "normal": "18.5-24.9",
    "overweight": "25-29.9",
    "obese": "30+"
  }
}
```

📌 **Adding a New Assessment Type:**

1. Add new entry in `config/structedRecord.json`
2. Define field mappings in `config/dataMapper.json`
3. Update classification ranges in `config/classifications.json`
4. Add template in `templates/`
   No code changes required! ✅

---

## 🖥️ Demonstration Workflow

1. **Signup/Login** via frontend UI
2. **Call API** `/generate-report` with `session_id`
3. System:

   * Reads data from `data.js`
   * Determines `assessment_id`
   * Loads config + template
   * Generates PDF using Puppeteer
   * Saves it to `/generated-reports/`
4. Open generated PDF 🎉

---

## 🛠️ Tech Stack

* **Frontend:** React.js, HTML5, CSS3, EJS
* **Backend:** Node.js (JavaScript), Express
* **PDF Generation:** Puppeteer
* **Storage:** Local filesystem (for reports)
* **Data Source:** `data.js`

---
