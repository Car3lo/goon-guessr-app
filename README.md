# Goon Guessr

A daily guessing game where players try to identify different models from various platforms.

## Features

- Daily rotating puzzles
- Timer tracking
- Image carousel
- Social media integration
- Responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudflare account
- GitHub account

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/goon-guessr.git
cd goon-guessr
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Cloudflare Pages

### Initial Setup

1. Create a Cloudflare account if you don't have one at [cloudflare.com](https://www.cloudflare.com/)

2. Install the Cloudflare CLI (Wrangler):
```bash
npm install -g wrangler
# or
yarn global add wrangler
```

3. Login to Cloudflare:
```bash
wrangler login
```

### GitHub Integration Setup

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/goon-guessr.git
git push -u origin main
```

2. Set up Cloudflare Pages with GitHub:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Click on "Pages" in the left sidebar
   - Click "Create a project"
   - Select "Connect to Git"
   - Choose "GitHub" as your Git provider
   - Authorize Cloudflare to access your GitHub account
   - Select your repository (goon-guessr)

3. Configure build settings:
   - Build command: `npm run build` or `yarn build`
   - Build output directory: `dist`
   - Node version: 16 (or higher)
   - Environment variables (if needed):
     ```
     NODE_VERSION=16
     ```

4. Click "Save and Deploy"

### Automatic Deployments

Once set up, your site will automatically deploy when you:
- Push to the main branch
- Create a pull request
- Merge a pull request

You can monitor deployments in the Cloudflare Pages dashboard.

### Custom Domain Setup

1. In the Cloudflare Pages dashboard, select your project
2. Go to "Custom domains"
3. Click "Set up a custom domain"
4. Enter your domain name
5. Follow the DNS configuration instructions provided by Cloudflare

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_CLOUDFLARE_API_TOKEN=your_api_token_here
```

For GitHub deployments, add these variables in the Cloudflare Pages dashboard:
1. Go to your project settings
2. Navigate to "Environment variables"
3. Add your variables there

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
