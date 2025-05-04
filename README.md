# ☕ Coffee GPT — Café Recommendation AI

**Coffee GPT** is an AI-powered café recommendation assistant built with FastAPI, LangChain, and Next.js. It provides real-time, location-based coffee shop suggestions using advanced natural language models.

## 🌟 Features

- 🧠 AI-generated café recommendations tailored to user location
- ⚡ FastAPI backend with LangChain and OpenRouter
- 💬 Conversational UI built with Next.js and React
- 🔄 Real-time chat experience with persistent messaging
- 🔐 Environment-secured API access using `.env`

---

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

- The user types a message (e.g., _"Find a good café in Brooklyn"_).
- The message is sent to the FastAPI backend via the `/recommend` endpoint.
- LangChain + OpenRouter process the message using a system prompt tailored for location-based café discovery.
- The AI returns personalized suggestions with real-world cafés.

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

> **User:** I'm in Lemon Grove, California. Got any good coffee spots?

> **AI:** Of course! I'd be happy to help you find coffee spots in Lemon Grove, California. Here are two highly-recommended cafés: 1. **Steady State Coffee**: A popular spot in the heart of Lemon Grove, known for its welcoming atmosphere and delicious coffee. 2. **The Fresh Brew**: Located near the Lemon Grove Depot, this café offers artisanal coffee and pastries in a cozy setting. Both of these cafés are excellent choices for a great cup of coffee. Enjoy your café hopping in Lemon Grove! Let me know if you'd like more recommendations in this area or if you'd like to explore other nearby neighborhoods.

---

## 🛠 Future Ideas

- 🌍 Add map integration for café locations
- ❤️ Favorites & user profiles
- 📱 PWA/mobile support
- 🌐 Multilingual support
- Integrate social media (Tik tok, Instagram, etc.)
