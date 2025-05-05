# 🍽️ Whatever.AI — Group-Friendly Food & Dessert Recommendations

**Whatever.AI** is an AI-powered chatbot designed to end indecisive group food debates. Whether you're out with friends and nobody can agree on where to eat, or you're just craving something sweet nearby — **Whatever.AI** has you covered.

Built using **FastAPI**, **LangChain**, and **Next.js**, this app delivers personalized food and dessert recommendations based on real-time location and natural language input.

---

## 🤔 Why Whatever.AI?

> _“Are you ever with a group of people and no one can decide where to eat?”_

That’s the problem **Whatever.AI** solves. Just ask it, and it’ll suggest quality food or dessert spots nearby — fast, conversational, and always ready to recommend something tasty.

---

## 🌟 Features

- 🧠 AI-generated food & dessert spot recommendations  
- 📍 Location-aware suggestions tailored to your query  
- 💬 Chatbot UI for natural, conversational interaction  
- ⚡ FastAPI + LangChain backend for intelligent processing  
- 🔄 Real-time chat experience with persistent message history  
- 🔐 Secure API access using environment variables  

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/whatever-ai.git
cd whatever-ai


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/coffee-gpt.git
cd coffee-gpt
```

### 2. Database Setup (PostgreSQL)

> Download and install PostgreSQL from postgresql.org
> Create a new local database:

```bash
psql -U postgres
```
Create a new database
`CREATE DATABASE your_database_name;`

Create a user (optional)
`CREATE USER your_username WITH PASSWORD 'your_password';`

Grant privileges
`GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_username;`

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
URL_DATABASE=postgresql+asyncpg://your_username:your_password@localhost:5432/your_database_name
```

> Replace `your_openrouter_api_key` with your actual API key from [OpenRouter](https://openrouter.ai).
> Replace `postgresql+asyncpg://your_username:your_password@localhost:5432/your_database_name` with your actual key from Postgresql

---

### 3. Backend Setup (FastAPI)

```bash
cd backend
pip install -r requirements.txt  # Add a requirements.txt if not already present
uvicorn main:app --reload
```

The backend runs on `http://localhost:8000`.

---

### 4. Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000`.

---

## 🧠 How It Works

- A user enters a message like:
- “We’re in San Diego, La Jolla and want recommendations.”
- The message is sent to the FastAPI backend via the `/recommend` endpoint.
- LangChain and OpenRouter process the request using a location-aware system prompt.
- The chatbot returns a curated list of places — whether it’s boba, tacos, churros, or all of the above.

---

## 📦 Dependencies

### Backend

- FastAPI
- Uvicorn
- LangChain
- OpenRouter
- python-dotenv
- pydantic
- openai
- asyncpg
- uuid
- requests
- sse-starlette
- sqlmodel
- Postgresql

### Frontend

- React + Next.js
- Axios (used via `api.ts`)
- Tailwind CSS
- React Icons

---

## ✨ Example Prompt

>User: We’re near Koreatown in LA and want dessert. Any ideas?
>AI: Here are some sweet spots to check out near Koreatown:

1. Sul & Beans — Korean shaved ice desserts and toasts.

2. Oakobing — Known for its bingsu and late-night vibe.

> Let me know if you're in the mood for something different!


---

## 🛠 Future Ideas

- 🌍 Add map integration for café locations
- ❤️ Favorites & user profiles
- 📱 PWA/mobile support
- 🌐 Multilingual support
- Integrate social media (Tik tok, Instagram, etc.)
