# DRN Moda Tekstil Website

Modern corporate website for DRN Moda Tekstil built with Next.js, TypeScript, Tailwind CSS, and Strapi CMS.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

### Installation and Setup

1. Clone the repository
```bash
git clone <repository-url>
cd drn-moda-tekstil
```

2. Install dependencies for Next.js project
```bash
cd drn-moda-site
npm install
# or
yarn install
```

3. Install dependencies for Strapi CMS
```bash
cd ../drn-moda-cms
npm install
# or
yarn install
```

### Configuration

1. Set up environment variables for the Next.js project
```bash
# In drn-moda-site folder
cp .env.example .env.local
```

2. If needed, configure environment variables for Strapi CMS
```bash
# In drn-moda-cms folder
cp .env.example .env
```

### Running Development Servers

1. Start Strapi CMS server (run in the drn-moda-cms folder):
```bash
npm run develop
# or
yarn develop
```

2. Start Next.js development server (in another terminal, run in the drn-moda-site folder):
```bash
npm run dev
# or
yarn dev
```

Next.js app will be available at http://localhost:3000 and Strapi admin at http://localhost:1337/admin

## Strapi CMS Setup

For detailed instructions on setting up the Strapi CMS for the services pages, refer to [STRAPI-SETUP.md](./STRAPI-SETUP.md).

## Project Structure

```
drn-moda-tekstil/
├─ drn-moda-site/        # Next.js frontend
│  ├─ public/            # Static assets
│  ├─ src/
│  │  ├─ app/            # Next.js pages using App Router
│  │  ├─ components/     # React components
│  │  ├─ lib/            # Utility functions and API clients
│  │  └─ types/          # TypeScript type definitions
│  ├─ .env.local         # Environment variables
│  └─ ...
│
└─ drn-moda-cms/         # Strapi CMS backend
   ├─ src/               # Strapi source code
   ├─ public/            # Public assets
   └─ ...
```

## Features

- Modern, responsive design with Tailwind CSS
- Type-safe development with TypeScript
- Content management with Strapi CMS
- Dynamic pages with Next.js App Router
- Animations with Framer Motion
- SEO optimization
- Multi-language support (Turkish and English)

## Deployment

### Frontend (Next.js)

The Next.js application can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting.

```bash
npm run build
# or
yarn build
```

### Backend (Strapi CMS)

Strapi can be deployed to various hosting providers like Heroku, Digital Ocean, or directly to a VPS.

For production deployment, follow the [official Strapi deployment documentation](https://docs.strapi.io/dev-docs/deployment).
