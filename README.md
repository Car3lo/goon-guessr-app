# Goon Guessr

## PRIVATE REPOSITORY AS IT HAS MY KV NAMESPACE ID DO NOT SHARE - CARLOIT

A daily guessing game where players try to identify a different model from various sources. The game resets every 24 hours at 8:00 AM UTC+8.

## Features

- Daily rotating images
- Real-time counter of correct guesses
- Timer tracking
- Progressive reveal of correct letters
- Countdown to next puzzle

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Cloudflare Workers + KV
- Shadcn UI Components

## Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Start the Cloudflare Worker (in a separate terminal):
```bash
cd workers
wrangler dev counter.js
```

## Deployment

1. Deploy the Cloudflare Worker:
```bash
cd workers
wrangler deploy
```

2. Update the worker URL in `src/components/Counter.tsx`

## Environment Setup

- Node.js 18+
- Cloudflare account
- KV namespace for the counter

## License

MIT
