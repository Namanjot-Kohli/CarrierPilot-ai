# 🚀 CareerPilot AI

**An AI-powered career advisor that helps students and professionals discover suitable careers, identify skill gaps, generate personalized learning roadmaps, recommend projects & certifications, and answer career-related questions.**

Built with a **multi-agent AI architecture** powered by Google's Gemini API — not a simple chatbot, but an autonomous system of 8 specialized AI agents that collaborate to produce intelligent, personalized career guidance.

---

## ✨ Features

### 🤖 AI Agent System
- **8 Specialized Agents**: Planner, Resume Analysis, Skill Gap, Career Recommendation, Learning Roadmap, Project Recommendation, Certification, Career Mentor
- **Agent Orchestrator**: Coordinates agents to produce unified responses
- **Intelligent Planning**: Planner Agent analyzes user intent and creates execution plans
- **Conversation Memory**: Full conversation history for contextual responses
- **Personalized Recommendations**: Based on user profile, skills, and career goals

### 🔐 Authentication
- JWT-based authentication (access + refresh tokens)
- Secure httpOnly cookie-based refresh tokens
- Protected routes
- Password hashing with bcrypt

### 📊 Dashboard
- Career statistics overview
- Quick action cards for common tasks
- Recent activity feed
- Skills visualization
- Responsive grid layout

### 💬 Chat Interface
- Real-time AI conversations
- Agent thinking indicators
- Markdown-rendered responses
- Conversation history sidebar
- Quick prompt suggestions
- Auto-generated roadmaps and recommendations from conversations

### 🗺️ Learning Roadmaps
- AI-generated week-by-week learning plans
- Interactive milestone tracking
- Progress visualization
- Resource links for each milestone
- Difficulty levels

### ⭐ Recommendations
- Career path suggestions
- Portfolio project ideas
- Certification recommendations
- Save/bookmark functionality
- Filterable by type

### 🎨 UI/UX
- Premium glassmorphism design
- Dark/light mode
- Smooth animations (Framer Motion)
- Fully responsive (mobile-first)
- Toast notifications
- Loading skeletons
- Clean typography (Inter)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                │
│   Landing │ Dashboard │ Chat │ Roadmaps │ Recommendations │
├─────────────────────────────────────────────────────────┤
│                    REST API (Express.js)                  │
│         Auth │ Chat │ Roadmaps │ Recommendations │ Users  │
├─────────────────────────────────────────────────────────┤
│              Multi-Agent AI System (Gemini)               │
│  Planner → Resume │ SkillGap │ Career │ Roadmap │ ...    │
├─────────────────────────────────────────────────────────┤
│                    MongoDB (Mongoose)                     │
│     Users │ Conversations │ Messages │ Roadmaps │ Recs    │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS 3, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| AI | Google Gemini API (gemini-2.0-flash) |
| Auth | JWT (access + refresh tokens), bcrypt |
| HTTP Client | Axios |
| Icons | React Icons |
| Markdown | React Markdown |

---

## 📦 Project Structure

```
careerpilot-ai/
├── backend/
│   ├── agents/
│   │   ├── core/           # BaseAgent, Orchestrator, Registry
│   │   ├── specialized/    # 8 specialized agent classes
│   │   ├── prompts/        # Agent system prompts
│   │   └── tools/          # Agent utility tools
│   ├── config/             # Database, environment config
│   ├── controllers/        # Route controllers
│   ├── middleware/          # Auth, error handling, validation
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes
│   ├── services/           # Business logic layer
│   ├── utils/              # Helpers, validators, logger
│   ├── server.js           # Express entry point
│   └── package.json
│
├── frontend/
│   ├── public/             # Static assets
│   └── src/
│       ├── api/            # Axios API layer
│       ├── components/
│       │   ├── auth/       # Login, Signup, ProtectedRoute
│       │   ├── chat/       # ChatWindow, MessageBubble, etc.
│       │   ├── dashboard/  # StatsCard, QuickActions, etc.
│       │   ├── profile/    # ProfileForm, SkillsEditor
│       │   ├── recommendations/ # Recommendation cards
│       │   ├── roadmap/    # Timeline, Milestone components
│       │   └── ui/         # Reusable UI components
│       ├── context/        # Auth, Theme, Toast providers
│       ├── hooks/          # Custom React hooks
│       ├── pages/          # Page components
│       ├── utils/          # Constants, formatters, validators
│       ├── App.jsx         # Root component with routing
│       ├── main.jsx        # Entry point
│       └── index.css       # Global styles + Tailwind
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ 
- **MongoDB** (local or Atlas cloud)
- **Google Gemini API Key** ([Get one here](https://aistudio.google.com/apikey))

### 1. Clone the Repository

```bash
git clone <repository-url>
cd careerpilot-ai
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your values (see Environment Variables below)

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/careerpilot
JWT_SECRET=your_jwt_secret_here_min_32_chars
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here_min_32_chars
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

> **⚠️ Important**: Generate strong random strings for JWT_SECRET and JWT_REFRESH_SECRET. You can use `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` to generate them.

---

## 🚢 Deployment

### Backend on Render

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add all environment variables from `backend/.env`
6. Set `NODE_ENV=production`
7. Update `CLIENT_URL` to your Vercel frontend URL

### Frontend on Vercel

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Set root directory to `frontend`
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Add environment variable: `VITE_API_URL=https://your-render-backend-url.onrender.com/api`

---

## 🤖 AI Agent Architecture

The system uses a custom multi-agent orchestration framework:

```
User Message
    │
    ▼
┌──────────────────┐
│   Orchestrator    │  Coordinates the entire flow
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Planner Agent   │  Analyzes intent, creates execution plan
└────────┬─────────┘
         │
         ▼ (dispatches to relevant agents)
┌────────┴─────────────────────────────────────┐
│                                               │
▼         ▼          ▼         ▼         ▼      │
Resume   SkillGap  Career   Roadmap   Project   ▼
Agent    Agent     Agent    Agent     Agent   Cert & Mentor
│         │          │         │         │      Agents
└─────────┴──────────┴─────────┴─────────┴──────┘
                     │
                     ▼
              ┌──────────────┐
              │  Synthesizer  │  Combines all agent outputs
              └──────┬───────┘
                     │
                     ▼
              Final Response (Markdown)
```

Each agent has:
- **Specialized system prompt** defining its expertise
- **Access to user profile** for personalization
- **Conversation history** for context
- **Structured output format** for reliable parsing

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Refresh token |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Current user |

### Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message |
| GET | `/api/chat/conversations` | List conversations |
| GET | `/api/chat/conversations/:id` | Get conversation |
| DELETE | `/api/chat/conversations/:id` | Delete conversation |
| PATCH | `/api/chat/conversations/:id` | Update conversation |

### Roadmaps
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/roadmaps` | List roadmaps |
| GET | `/api/roadmaps/:id` | Get roadmap |
| PATCH | `/api/roadmaps/:id` | Update progress |
| PATCH | `/api/roadmaps/:id/milestones/:mid` | Toggle milestone |
| DELETE | `/api/roadmaps/:id` | Delete roadmap |

### Recommendations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recommendations` | List (filter by type) |
| GET | `/api/recommendations/:id` | Get single |
| PATCH | `/api/recommendations/:id/save` | Toggle save |
| DELETE | `/api/recommendations/:id` | Delete |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get profile |
| PUT | `/api/users/profile` | Update profile |
| PUT | `/api/users/password` | Change password |

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google.dev/) for AI capabilities
- [React](https://react.dev/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [MongoDB](https://www.mongodb.com/) for the database
