# MeetingMind AI

An AI-powered meeting intelligence platform that transforms meeting audio into actionable insights.

---

## Overview

MeetingMind AI automatically converts meeting recordings into structured intelligence including:

* AI-generated meeting titles
* Meeting summaries
* Action items
* Decisions
* Follow-ups
* Risk identification

The platform enables teams to search, analyze, and revisit meetings without manually taking notes.

---

## Features

### AI Meeting Intelligence

* Automatic transcription
* AI-generated titles
* Summaries
* Action items extraction
* Decision extraction
* Follow-up tracking
* Risk identification

### Dashboard

* Meeting workspace
* Search functionality
* Analytics dashboard
* Meeting details view
* Settings workspace

### Analytics

* Total meetings
* Action tracking
* Decision analysis
* Risk analysis
* Productivity insights

---

## Architecture

```text
Frontend (React + Vite)
            ↓
FastAPI Backend
            ↓
Groq Whisper API
            ↓
Groq Llama API
            ↓
Supabase Database
```

---

## Tech Stack

### Frontend

* React
* Vite
* Axios
* React Router

### Backend

* FastAPI
* Python
* Uvicorn

### AI

* Groq Whisper
* Llama 3

### Database

* Supabase

### Deployment

* Vercel
* Render

---

## Project Structure

```text
meetingmind-ai/

├── backend/
│   ├── ai/
│   ├── services/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/manalpatil13/meetingmind-ai.git

cd meetingmind-ai
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

### Backend

```env
SUPABASE_URL=

SUPABASE_KEY=

GROQ_API_KEY=

MODEL_NAME=llama-3.1-8b-instant
```

### Frontend

```env
VITE_API_URL=
```

---

## Deployment

### Backend

* Render

### Frontend

* Vercel

---

## Screenshots

### Dashboard

(Add screenshot)

### Meeting Workspace

(Add screenshot)

### Analytics

(Add screenshot)

---

## Future Improvements

* User authentication
* Team workspaces
* Meeting sharing
* Calendar integration
* Speaker identification
* PDF export
* Email summaries

---

## Author

**Manal Patil**

Computer Science Engineering Student

GitHub:
https://github.com/manalpatil13

LinkedIn:
(Add LinkedIn URL)

---

## License

MIT License
