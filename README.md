📝 README.md — MatchMyResume (Full-Stack AI Resume Analyzer)
<p align="center"> <img src="https://img.shields.io/badge/Framework-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" /> <img src="https://img.shields.io/badge/Frontend-React-61DBFB?style=for-the-badge&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/ML-Vector%20Similarity%20%7C%20XGBoost-orange?style=for-the-badge" /> <img src="https://img.shields.io/badge/Auth-JWT-green?style=for-the-badge" /> </p> <p align="center"> <strong>AI-powered Resume ↔ Job Description Matching System with Employer Ranking & Candidate Transparency</strong> </p> <p align="center"> <img width="650" src="https://dummyimage.com/900x400/0f172a/ffffff&text=Project+Screenshot+Placeholder" /> <br/> <em>(Add screenshots from your app here!)</em> </p>
🚀 MatchMyResume – Overview

MatchMyResume is a full-stack AI screening tool that:

👤 For Candidates

✔ Upload resume
✔ Paste job description
✔ Get match score
✔ See detailed explanation (skills match, missing keywords, cosine similarity)

🧑‍💼 For Employers

✔ Upload up to 50 resumes
✔ Rank candidates using a trained ML model
✔ Accept / Reject candidates manually
✔ Auto-filter candidates using a score threshold
✔ Save decisions locally (persistent across reloads)

🔐 Authentication Included

✔ Email signup
✔ JWT login
✔ Resend email verification
✔ Protected employer dashboard

🏗 Tech Stack
Backend – FastAPI

ML scoring (XGBoost model + text preprocessing)

Resume processing (DOCX/PDF → text)

Candidate ranking

JWT auth using passlib + python-jose

Email verification with Resend

Frontend – React + Vite + Tailwind

Beautiful modern UI

Tab-based Candidate & Employer modes

File uploading, score badges, animations

Full auth flow (login, signup, email verify)

📁 Project Structure
ResAnal/
│
├── Backend/
│   ├── app/
│   │   ├── routers/
│   │   │   ├── predict.py
│   │   │   ├── rank.py
│   │   │   └── auth.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   ├── mailer.py
│   │   ├── utils/
│   │   └── main.py
│   ├── requirements.txt
│   └── auth.db (ignored)
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── common/
    │   ├── lib/api.js
    │   ├── AppRouter.jsx
    │   ├── App.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js

🔐 Environment Variables
Backend .env
SECRET_KEY=your-secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

DATABASE_URL=sqlite:///./auth.db

RESEND_API_KEY=your_resend_key
SMTP_USER=no-reply@yourdomain.com
SMTP_NAME=Resume AI

FRONTEND_URL=http://localhost:5173

Frontend .env
VITE_API_BASE=http://127.0.0.1:8000

🧪 Run Locally
Backend
cd Backend
pip install -r requirements.txt
uvicorn app.main:app --reload


Backend runs at:

http://127.0.0.1:8000

Frontend
cd Frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

📬 Email Verification (Resend)

You must verify your domain on
🔗 https://resend.com/dashboard/domains

Then use:

RESEND_API_KEY=...
SMTP_USER=no-reply@yourdomain.com


Verification email example:

“Click to verify your email:
http://localhost:5173/verify-email?token=…”

🧠 AI Scoring – How It Works
Candidate Mode

Text extracted → cleaned

JD text vectorized

Resume vectorized

Cosine similarity

Keyword overlap

ML model predicts final composite score

Employer Mode

All resumes processed in a batch

Ranked descending

Actions available:

Accept

Reject

Auto-reject by threshold

📊 Feature Preview
✔ Candidate View

Upload resume

Paste JD

Get score

Explanation accordion showing:

Skill matches

Missing skills

Cosine similarity

Keyword hits

✔ Employer View

Upload 1–50 resumes

Ranked table

Accept/Reject buttons

Three-dot dropdown actions (optional)

Score threshold filtering

✨ Screenshots (Add later)
![Landing Page]()
![Login Page]()
![Candidate Dashboard]()
![Employer Dashboard]()
![Score Details]()

🛡 Security Notes

✔ .env is excluded via .gitignore
✔ JWT tokens stored in localStorage
✔ Passwords hashed with bcrypt
✔ Email verification required for login

🚀 Future Enhancements

Export accepted candidates as CSV

Full resume viewer

Recruiter notes per candidate

Cloud resume parsing (OCR)

Improved ML scoring model
