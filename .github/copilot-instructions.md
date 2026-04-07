# Workspace Instructions for simpleEditor

This repository is a minimal web-based code editor for students, built as a static client served by a small Express server.

## When to use this file
- Use this as the primary guide for making changes in this workspace.
- Apply to any request related to features, bug fixes, UI updates, deployment, or project conventions.
- This file is intentionally lightweight and focused on the actual project structure.

## Project overview
- Frontend: `public/index.html`, `public/styles.css`, `public/script.js`
- Backend: `server.js` serves static files from `public`
- No build step is required; the app runs directly from source.
- Dependencies are minimal: `express` on the server, plus browser CDN imports for Tailwind, CodeMirror, and Lucide icons.

## Run commands
- Install dependencies: `npm install`
- Start production server locally: `npm start`
- Start development server with auto-reload: `npm run dev`

## Key files and roles
- `public/index.html`: main editor UI, layout, and page structure
- `public/styles.css`: custom styling for the editor interface
- `public/script.js`: client logic for CodeMirror editors, live preview, download, and UI controls
- `server.js`: Express server that serves the `public` folder
- `package.json`: project metadata and `start`/`dev` scripts
- `README.md`: project description and deployment notes

## Design and implementation guidance
- Keep changes small and consistent with the existing Spanish UI.
- Use the current CodeMirror-based editor and live preview pattern rather than introducing a heavier frontend framework.
- If a server-side change is needed, keep `server.js` simple and focused on static delivery.
- Prefer editing existing files over adding new tooling or build configuration.

## Deployment
- This project is intended for deployment on Vercel.
- The existing setup is compatible with Vercel auto-detection.
- Use `vercel` or `vercel --prod` to deploy from the repository root.

## Notes for agents
- When asked to implement a feature, identify whether it belongs in the static client (`public/*`) or in the server (`server.js`).
- For UI/UX work, most changes belong in `public/index.html`, `public/styles.css`, and `public/script.js`.
- For infrastructure or runtime changes, update `package.json` scripts and `server.js` only when necessary.
- Preserve the current folder layout and avoid adding new build tooling unless the user explicitly requests it.
