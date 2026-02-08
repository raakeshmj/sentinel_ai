# SENTINEL AI — Frontend

SENTINEL AI is a frontend application built using **React, Vite, and TypeScript**.  
This repository contains **only the client-side interface**. Any AI analysis or API-backed functionality is expected to be run **locally** using environment variables or via a separate backend service.

The deployed version on GitHub Pages serves **static assets only** and does not include or expose any API keys.

---

## Prerequisites

Before running the project locally, ensure you have the following installed:

- **Node.js** (v18 or later recommended)
- **npm** (included with Node.js)

Verify installation:

```bash
node -v
npm -v
Running the Project Locally
1. Clone the Repository
bash
Copy code
git clone https://github.com/<your-username>/sentinel-ai.git
cd sentinel-ai
2. Install Dependencies
bash
Copy code
npm install
This installs all required dependencies, including Vite and React.

3. Environment Variable Setup
Create a .env file in the project root:

bash
Copy code
touch .env
Add the following variable:

env
Copy code
GEMINI_API_KEY=your_api_key_here
Important notes:

This API key is intended only for local development

Do not commit the .env file

The .env file is ignored by Git by default

The deployed GitHub Pages site does not use this key

4. Start the Development Server
bash
Copy code
npm run dev
The application will be available at:

arduino
Copy code
http://localhost:3000
The dev server supports hot reloading.

Production Build (Local)
To generate a production-ready static build:

bash
Copy code
npm run build
This creates a dist/ directory containing optimized static assets.

To preview the production build locally:

bash
Copy code
npm run preview
GitHub Pages Deployment
This project is deployed using GitHub Pages.

Deployment Characteristics
The deployed site serves static files only

No environment variables or API keys are embedded

The production build output is committed under the docs/ directory

The deployment is suitable for UI demonstration purposes

Base Path Configuration
The Vite configuration uses a repository-based base path:

ts
Copy code
base: "/sentinel-ai/"
If you fork the repository or change its name, update this value in vite.config.ts accordingly and rebuild the project.

Security Considerations
Environment variables in frontend applications are not secure

Any API key used in local development should be treated as temporary

For production or public usage, API calls should be routed through a backend service

Never commit .env files or secrets to the repository

Available Scripts
Command	Description
npm install	Install project dependencies
npm run dev	Start local development server
npm run build	Generate production build
npm run preview	Preview production build locally

License
This project is intended for internal, academic, or demonstration use.