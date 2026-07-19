<div align="center">

<br/>

<img src="https://img.shields.io/badge/Nexus%20AI-Frontend-6366f1?style=for-the-badge&logo=react&logoColor=white" alt="Nexus AI Frontend" />

<br/><br/>

## Nexes Live Demo

[Nexes AI Website](https://nexes-ai-client.vercel.app/)

<h1>🧠 Nexus AI — Client</h1>

<p><strong>A next-generation Agentic AI project management interface built with Next.js 15, React 19, and TypeScript.</strong><br/>
Dark-mode-first, blazing fast, and powered by Gemini AI under the hood.</p>

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

<br/>

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Design System](#-design-system)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Deployment](#-deployment-vercel)

---

## 🌟 Overview

**Nexus AI Client** is the frontend layer of the Nexus AI platform — an intelligent project workspace that combines modern project management with an embedded **Agentic AI chat interface** powered by Google Gemini.

Key highlights:

- ⚡ **Turbopack-powered** development with instant HMR
- 🌙 **Dark/Light mode** with seamless system preference detection
- 🤖 **AI Chat Interface** with real-time Markdown rendering per project
- 📊 **Interactive dashboards** with animated charts and live project stats
- 🔒 **JWT authentication** with Google OAuth 2.0 support
- 📱 **Fully responsive** — desktop, tablet, and mobile ready
- 🎞️ **Framer Motion** page transitions and micro-animations throughout

---

## 🛠️ Tech Stack

| Category          | Technology                   | Version     |
| ----------------- | ---------------------------- | ----------- |
| **Framework**     | Next.js (App Router)         | `15.5.20`   |
| **UI Library**    | React                        | `19.1.0`    |
| **Language**      | TypeScript                   | `^5`        |
| **Styling**       | Tailwind CSS v4 + shadcn/ui  | `^4`        |
| **Animations**    | Framer Motion                | `^12`       |
| **Data Fetching** | TanStack Query (React Query) | `^5`        |
| **HTTP Client**   | Axios                        | `^1.18`     |
| **Forms**         | React Hook Form + Zod        | `^7` / `^4` |
| **Charts**        | Recharts                     | `^3`        |
| **Icons**         | Lucide React                 | `^1.25`     |
| **Theme**         | next-themes                  | `^0.4`      |
| **Auth**          | @react-oauth/google          | `^0.13`     |
| **File Upload**   | React Dropzone               | `^19`       |
| **Notifications** | React Hot Toast              | `^2.6`      |
| **Markdown**      | React Markdown               | `^10`       |
| **Top Loader**    | nextjs-toploader             | `^3.9`      |

---

## 📁 Project Structure

```
nexus-ai-client/
├── src/
│   ├── app/                              # Next.js 15 App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx             # Login page (email + Google OAuth)
│   │   │   └── register/
│   │   │       └── page.tsx             # Registration page
│   │   ├── dashboard/
│   │   │   └── page.tsx                 # Dashboard — stats, charts, recent projects
│   │   ├── profile/
│   │   │   └── page.tsx                 # User profile management
│   │   ├── projects/
│   │   │   ├── page.tsx                 # Projects list (search, filter, pagination)
│   │   │   ├── new/page.tsx             # Create new project workspace
│   │   │   └── [id]/page.tsx            # Project workspace + AI Agent chat
│   │   ├── layout.tsx                   # Root layout — fonts, providers, top loader
│   │   ├── page.tsx                     # Public landing page (Hero, Features, CTA)
│   │   ├── not-found.tsx                # Custom 404 page
│   │   ├── globals.css                  # Global styles + CSS variables
│   │   └── providers.tsx                # QueryClient, AuthProvider, Toaster setup
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.tsx               # Responsive sticky navbar + dark mode toggle
│   │   └── ui/                          # shadcn/ui auto-generated components
│   ├── contexts/
│   │   └── AuthContext.tsx              # Auth state: user, login, logout, Google OAuth
│   ├── hooks/
│   │   └── useDebounce.ts               # Debounce hook for search inputs
│   └── lib/
│       ├── axios.ts                     # Axios instance + JWT interceptor
│       └── utils.ts                     # Utility helpers (cn, shadcn merge)
├── public/                              # Static assets
├── .env.local                           # Local environment variables (git-ignored)
├── .env.example                         # Environment variable template
├── components.json                      # shadcn/ui configuration
├── next.config.ts                       # Next.js configuration
├── postcss.config.mjs                   # PostCSS configuration
├── tailwind.config.ts                   # Tailwind CSS configuration
└── tsconfig.json                        # TypeScript configuration
```

---

## 🗺️ Pages & Routes

| Route            | Description                                         | Auth Required |
| ---------------- | --------------------------------------------------- | :-----------: |
| `/`              | Landing page — Hero, Features, Testimonials, CTA    |      ❌       |
| `/login`         | Login with email/password or Google OAuth           |      ❌       |
| `/register`      | Create a new user account                           |      ❌       |
| `/dashboard`     | Stats overview, animated charts, recent projects    |      ✅       |
| `/profile`       | Manage user profile and settings                    |      ✅       |
| `/projects`      | Browse all projects with search, filter, pagination |      ✅       |
| `/projects/new`  | Create a new project workspace                      |      ✅       |
| `/projects/[id]` | Project workspace + embedded AI Agent chat          |      ✅       |

> 🔐 Protected routes redirect to `/login` if the user is not authenticated.

---

## 🎨 Design System

### Color & Theme

- **CSS Variables** from shadcn/ui — supports both Light & Dark mode seamlessly
- **Dark-first** design philosophy with `next-themes` system preference detection

### Typography

- **Geist Sans** — loaded via `next/font/google` for optimal performance
- Consistent type scale from `text-sm` to `text-6xl`

### Components & Patterns

- **Glassmorphism** — applied on the hero section, overlays, and modals
- **Rounded-2xl** cards — consistent border-radius across all card components
- **Framer Motion** — smooth page transitions, stagger animations, and micro-interactions
- **Recharts** — responsive, animated data visualizations on the dashboard

### Responsive Breakpoints

| Breakpoint | Width    |
| ---------- | -------- |
| `sm`       | ≥ 640px  |
| `md`       | ≥ 768px  |
| `lg`       | ≥ 1024px |
| `xl`       | ≥ 1280px |
| `2xl`      | ≥ 1536px |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or your preferred package manager)
- The **Nexus AI Server** running at `http://localhost:5000`

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nexes-ai.git
cd nexes-ai/nexus-ai-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the values:

```env
# Backend API base URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

> ⚠️ Ensure the backend server is running before starting the frontend.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Changes are reflected instantly via Turbopack HMR.

---

## 🔑 Environment Variables

| Variable                       | Description                                                |  Required   |
| ------------------------------ | ---------------------------------------------------------- | :---------: |
| `NEXT_PUBLIC_API_URL`          | Backend API base URL (e.g. `http://localhost:5000/api/v1`) |     ✅      |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID for social login                | ⚠️ Optional |

---

## 📜 Scripts

| Command         | Description                                   |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start development server with Turbopack       |
| `npm run build` | Build optimized production bundle (Turbopack) |
| `npm start`     | Start the production server                   |
| `npm run lint`  | Run ESLint across the codebase                |

---

## ☁️ Deployment (Vercel)

The client is optimized for **zero-config deployment on Vercel**.

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repository.
3. Set the **Root Directory** to `nexus-ai-client`.
4. Set the **Framework Preset** to `Next.js`.
5. Add the required environment variables in the Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api/v1
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   ```
6. Click **Deploy** 🚀

> 💡 Every `git push` to `main` triggers an automatic production deployment.

---

<div align="center">

Built with ❤️ using **Next.js 15** · **React 19** · **TypeScript** · **Tailwind CSS v4**

</div>
