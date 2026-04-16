# Sambhav AI - Frontend

A production-ready React frontend for AI Document Q&A system with ChatGPT-style interface.

## Features

- Chat-based interaction with AI
- Document URL input mode
- Real-time loading indicators
- Clean, modern UI with Tailwind CSS
- Responsive design
- Error handling

## Tech Stack

- React (Vite)
- Tailwind CSS
- Axios for API calls
- PostCSS

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```
VITE_API_URL=https://madhav33-sambhav-ai.hf.space/hackrx/run
VITE_API_KEY=your_actual_api_key
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:5173

## Build for Production

```bash
npm run build
```

The build files will be in the `dist/` directory.

## Deployment (Vercel)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set root directory to `frontend`
4. Add environment variables in Vercel dashboard:
   - `VITE_API_URL`
   - `VITE_API_KEY`
5. Deploy

## Usage

1. Enter a document URL in the input field
2. Ask questions about the document
3. View AI responses in chat format

## API Integration

The frontend connects to:
- Endpoint: `VITE_API_URL`
- Method: POST
- Headers: Authorization Bearer token
- Body: `{ documents: "<url>", questions: ["<question>"] }`

## Project Structure

```
frontend/
src/
  components/
    ChatWindow.jsx    # Main chat display
    MessageBubble.jsx # Individual message component
    InputBar.jsx      # Input and controls
  App.jsx             # Main application with state management
  index.css           # Tailwind CSS + custom styles
```
