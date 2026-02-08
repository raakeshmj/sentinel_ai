# SENTINEL AI — Frontend

SENTINEL AI is a frontend application built using **React, Vite, and TypeScript**.  
This repository contains the **client-side interface only**. Any AI analysis or API-backed functionality is expected to be run **locally** using environment variables or via a separate backend service.

The deployed GitHub Pages version serves **static assets only** and does not embed or expose any API keys.

---

## Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v18 or later recommended)
- **npm** (bundled with Node.js)

Verify installation:

```bash
node -v
npm -v
```

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/sentinel-ai.git
cd sentinel-ai
```

---

### 2. Install Dependencies

```bash
npm install
```

This installs all required project dependencies, including Vite and React.

---

### 3. Environment Variable Configuration

Create a `.env` file in the project root directory:

```bash
touch .env
```

Add the following entry:

```env
GEMINI_API_KEY=your_api_key_here
```

**Notes:**
- This key is used **only for local development**
- Do **not** commit the `.env` file
- The deployed frontend does **not** rely on this key

---

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

The development server supports hot module reloading.

---

## Production Build (Local)

To generate a production-ready static build:

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## GitHub Pages Deployment

This project is deployed using **GitHub Pages**.

### Deployment Characteristics

- The deployed site serves **static files only**
- No environment variables or secrets are embedded
- The production build output is committed under the `docs/` directory
- Intended for UI demonstration and non-production use

---

### Base Path Configuration

The Vite configuration uses a repository-based base path:

```ts
base: "/sentinel_ai/"
```

If you fork the repository or rename it, update this value in `vite.config.ts` and rebuild the project.

---

## Security Considerations

- Frontend environment variables are **not secure**
- API keys must never be committed or embedded in builds
- For production use, API calls should be routed through a backend service
- The frontend is designed to operate without secrets in deployed environments

---

## Available Scripts

| Command | Description |
|-------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Generate production build |
| `npm run preview` | Preview production build |

---

## License

This project is intended for internal, academic, or demonstration use.
