# Goon Guessr Deployment Guide

## Initial Setup

### 1. Project Configuration
- Ensure `vite.config.ts` is properly configured (already done)
- Base URL is set to '/'
- Build output directory is 'dist'
- Source maps are enabled for debugging

### 2. Cloudflare Worker Deployment
1. Navigate to workers directory:
```bash
cd workers
```

2. Deploy the worker:
```bash
wrangler deploy
```

3. Note down your worker URL (format: `goon-guessr-counter.your-account-name.workers.dev`)

4. Update the worker URL in `src/components/Counter.tsx`

### 3. Frontend Deployment to Cloudflare Pages
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to "Pages"
3. Click "Create a project"
4. Connect your GitHub repository
5. Configure build settings:
   ```
   Framework preset: None
   Build command: npm run build
   Build output directory: dist
   ```
6. Click "Save and Deploy"

## Updating the Application

### Frontend Updates
1. Make your changes locally
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Your changes description"
git push
```
3. Cloudflare Pages will automatically detect changes and deploy

### Worker Updates
1. Make changes to worker code
2. Commit and push to GitHub
3. Deploy the worker manually:
```bash
cd workers
wrangler deploy
```

## Cloudflare Free Tier Limits
Monitor your usage in Cloudflare Dashboard > Workers & Pages:
- Requests: 100,000/day
- KV Operations:
  - Reads: 100,000/day
  - Writes: 1,000/day
- CPU Time: 10ms/request
- Memory: 128MB/request

## Troubleshooting

### Common Issues
1. Worker not responding:
   - Check worker logs in Cloudflare Dashboard
   - Verify worker URL in Counter.tsx
   - Ensure KV namespace is properly configured

2. Frontend deployment failing:
   - Check build logs in Cloudflare Pages
   - Verify build command and output directory
   - Ensure all dependencies are in package.json

3. Counter not updating:
   - Check worker status in Cloudflare Dashboard
   - Verify network requests in browser dev tools
   - Ensure correct timezone settings (UTC 0:00)

### Useful Commands
```bash
# Check worker status
wrangler status

# View worker logs
wrangler tail

# Build project locally
npm run build

# Start development server
npm run dev
```

## Environment Variables
If needed, set these in Cloudflare Pages:
- Production environment
- Preview environment
- Development environment

## Custom Domain Setup (Optional)
1. In Cloudflare Pages, go to project settings
2. Click "Custom domains"
3. Add your domain
4. Follow DNS configuration steps

## Monitoring
Regularly check:
1. Worker metrics in Cloudflare Dashboard
2. Page analytics in Cloudflare Pages
3. Error rates and logs
4. Usage against free tier limits 