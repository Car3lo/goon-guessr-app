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

### Deploying the Site

1. Build the project:
```bash
npm run build
# or
yarn build
```

2. Deploy to Cloudflare Pages:
```bash
wrangler pages deploy dist
```

### Automatic Deployments

For automatic deployments, you can connect your GitHub repository to Cloudflare Pages:

1. Go to the Cloudflare Dashboard
2. Navigate to "Pages"
3. Click "Create a project"
4. Select "Connect to Git"
5. Choose your repository
6. Configure build settings:
   - Build command: `npm run build` or `yarn build`
   - Build output directory: `dist`
   - Node version: 16 (or higher)
7. Click "Save and Deploy"

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
