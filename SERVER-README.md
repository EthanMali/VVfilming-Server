# Node.js Server Setup

This project includes a simple Node.js/Express server to serve the `videos.json` file.

## Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Enable CORS for frontend requests

### 2. Start the Server

```bash
npm run server
```

The server will start on `http://localhost:3000`

### 3. Start the Frontend (in a separate terminal)

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## API Endpoints

### GET /api/videos.json
Returns the videos.json data

**Example:**
```bash
curl http://localhost:3000/api/videos.json
```

### PUT /api/videos.json
Updates the videos.json file (requires JSON body)

**Example:**
```bash
curl -X PUT http://localhost:3000/api/videos.json \
  -H "Content-Type: application/json" \
  -d @public/videos.json
```

### GET /api/health
Health check endpoint

**Example:**
```bash
curl http://localhost:3000/api/health
```

## Configuration

The API URL can be configured via environment variable:

Create a `.env.local` file in the project root:
```
VITE_API_URL=http://localhost:3000
```

For production, set it to your production server URL:
```
VITE_API_URL=https://api.yourdomain.com
```

## How It Works

1. The Node.js server (`server.js`) serves the `videos.json` file from the `public` directory
2. The frontend components (`Portfolio.tsx`, `PrivateVideo.tsx`, `clientLogin.tsx`) fetch data from the server API endpoint
3. The configuration is centralized in `src/config.ts`

## Development Workflow

1. Start the server: `npm run server`
2. Start the frontend: `npm run dev` (in another terminal)
3. Both will run concurrently - the frontend on port 5173, the server on port 3000

## Production Deployment

For production, you'll need to:

1. Deploy the Node.js server to a hosting service (e.g., Heroku, Railway, DigitalOcean)
2. Set the `VITE_API_URL` environment variable to point to your deployed server
3. Build and deploy your frontend with `npm run build`

## Troubleshooting

**CORS Errors:**
The server has CORS enabled by default. If you still see CORS errors, check that the server is running.

**Connection Refused:**
Make sure the server is running on port 3000. Check with:
```bash
curl http://localhost:3000/api/health
```

**Videos Not Loading:**
1. Check that `public/videos.json` exists
2. Check the browser console for errors
3. Verify the API endpoint in `src/config.ts`
