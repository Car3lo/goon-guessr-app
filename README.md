# Goon Guessr

A daily guessing game where players try to identify different baddies from various platforms.

## Features

- BADDIES TO GOON
- NEW PICTURE EVERY DAY (UTC +0)
- TIMER FOR GOONER
- IMAGE CAROUSEL
- OPTION TO STOP EDGING
- BADDIE SOCIAL MEDIA LINKS AFTER
- COUNTER FOR WHO GOONED TODAY

## Prerequisites

- Node.js (v18 or higher)
- npm
- Cloudflare account

## Local Development / Testing
- `npm install`
- `npm run dev`
- `wrangler dev workers/counter.js`

## Deployment to Cloudflare Pages
- Deploy using github repository
- Make sure bun.lockb is in the repository as Cloudflare uses that. _sadly and honestly, this webapp was initially built with lovable.ai and idk the dependencies are not doing it lol. next time build urself with minimal aid_

**Build configuration**
- `npm run build`
- Build output: `dist`

**Environment Variables**
- NODE_VERSION = 20
- PACKAGE_MANAGER = npm

## Deploy Cloudflare Worker
- explicitly set your kv namespace id (it's fine)
- `npm run deploy` OR `wrangler deploy` (i edited the json to use npm)
- IMPORTANT: counter.tsx should have your worker's dev site (CHECK YOUR WORKERS DASHBOARD YOU CUCK. DONT ADD /COUNT CUS CODE DOES THAT (HELPS WITH DEVELOPMENT))

## Maintenance
- change schedule.ts every week or smth to update baddies
- cloudflare pages and workers dashboard to see how your page/worker is doing

