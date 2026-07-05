# URL Shortener

Simple URL shortener project with a Node/Express backend and a React (Vite) frontend.

**Repository structure**
- [backend](backend): Express API and Mongoose model
  - [backend/server.js](backend/server.js)
  - [backend/routes/url.js](backend/routes/url.js)
  - [backend/models/Url.js](backend/models/Url.js)
  - [backend/.env](backend/.env)
- [frontend](frontend): Vite + React UI
  - [frontend/src/App.jsx](frontend/src/App.jsx)

## Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB Atlas cluster or local MongoDB instance (if using Atlas, ensure your IP is allowed)

## Backend — quick start
1. Change to the backend folder:

   `cd backend`

2. Install dependencies:

   `npm install`

3. Create a `.env` file (or update the existing one) with at minimum:

   `MONGO_URL=your-mongo-connection-string`

   `PORT=5000`

   `BASE_URL=http://localhost:5000`

   `FRONTEND_URL=http://localhost:5173`

4. Start the backend in development:

   `npm run dev`

Notes:
- If Mongoose fails to connect to Atlas, verify the cluster is reachable and that your current IP address is added under "Network Access" in MongoDB Atlas. For quick testing you can allow access from `0.0.0.0/0` (not recommended for production).
- To use a local MongoDB instance, replace `MONGO_URL` with your local connection string (e.g. `mongodb://localhost:27017/mydb`).

## Frontend — quick start
1. Change to the frontend folder:

   `cd frontend`

2. Install dependencies:

   `npm install`

3. Start the dev server:

   `npm run dev`

The Vite dev server is configured to proxy `/shorten` requests to the backend (`http://localhost:5000`). If you run frontend and backend locally with the ports above, the form in the UI will post to the backend automatically.

## API endpoints
- `POST /shorten` — body: `{ "originalUrl": "https://example.com" }` — returns `{ shortId, shortUrl }`
- `GET /:shortId` — redirect to the original URL

## Useful commands
- Start backend (dev): `cd backend && npm run dev`
- Start frontend (dev): `cd frontend && npm run dev`
- Build frontend for production: `cd frontend && npm run build`

## Next steps / Deployment
- Add environment-specific config and production BASE_URL.
- Secure secrets (do not commit `.env` with credentials).
- Add tests and CI.

---

README created. If you want, I can also add a brief CONTRIBUTING or deploy guide next.