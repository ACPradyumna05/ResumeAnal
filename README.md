<h1 align="center">🚀 MatchMyResume (MMR)</h1>
<p align="center">
  <b>AI-powered Resume ↔ Job Description Matching System</b><br/>
  Built with <b>FastAPI</b>, <b>React + Vite</b>, <b>TailwindCSS</b>, and ML-based scoring models.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%2FVite-61dafb?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/ML-XGBoost-orange?style=for-the-badge&logo=xgboost"/>
  <img src="https://img.shields.io/badge/Auth-JWT-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Email-Resend-red?style=for-the-badge"/>
</p>


## 🌟 Overview

MatchMyResume is a modern, full-stack resume analysis and ranking system designed for:

- **Candidates** → upload resume + JD → get score, insights, and improvement tips  
- **Employers** → upload up to 50 resumes → batch screening → automatic ranking  


## ✨ Key Features

### 🧑‍💼 Candidate Portal
- Upload PDF/DOCX resume  
- Paste job description  
- ML-powered similarity score  
- Transparent stats (keyword overlap, similarity, etc.)  
- Clean analytics UI  

### 🏢 Employer Portal
- Upload upto 50 resumes  
- Batch scoring + ranking  
- Accept/Reject tagging  
- Auto-reject threshold  
- Local persistence via `localStorage`

### 🔐 Authentication
- Full JWT-based login/signup  
- Email verification via **Resend**  

### 🧠 Machine Learning
- Preprocessing pipeline (TF-IDF, embeddings)  
- Cosine similarity, keyword extraction  
- XGBoost model output  
- Combined score → ranked output


## 🏗️ Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS
- Custom components (ScoreBadge, FileUpload, LoadingOverlay)
- React Router
- LocalStorage-based JWT session

### **Backend**
- FastAPI (Python)
- SQLAlchemy + SQLite (local)
- Pydantic v2
- JWT auth (python-jose)
- Resend email API
- XGBoost resume scoring model




## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<yourname>/<your-repo>.git
cd <your-repo>

⚡ Backend Setup (FastAPI)
2️⃣ Create virtual environment
cd Backend
python -m venv torchenv
torchenv\Scripts\activate  # Windows

3️⃣ Install dependencies
pip install -r requirements.txt

4️⃣ Create .env
SECRET_KEY=your_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

DATABASE_URL=sqlite:///./auth.db

RESEND_API_KEY=your_resend_key
EMAIL_FROM=your_email@domain.com

FRONTEND_URL=http://localhost:5173

5️⃣ Start FastAPI server
uvicorn app.main:app --reload


Backend runs at 👉 http://127.0.0.1:8000

⚡ Frontend Setup (React + Vite)
6️⃣ Install dependencies
cd Frontend
npm install

7️⃣ Add Vite env

Inside Frontend/.env:

VITE_API_BASE=http://127.0.0.1:8000

8️⃣ Start dev server
npm run dev


Frontend runs at 👉 http://localhost:5173
