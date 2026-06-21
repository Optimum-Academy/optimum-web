# Optimum Academy - Next.js 15 Web Platform

A modern, high-performance web platform for Optimum Academy, built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and headless WordPress integration.

## 🚀 Features

- **Next.js 15 App Router**: Leveraging the latest React features and server components.
- **Tailwind CSS v4**: Modern styling with zero-runtime CSS.
- **Shadcn UI**: Beautiful, accessible components built on Radix UI.
- **Headless CMS Ready**: Designed for WPGraphQL integration with a robust mock API layer for development.
- **Dynamic Routing**: Automatic generation for Courses and Blog posts.
- **SEO & Performance**: Optimized metadata, image handling, and accessibility.
- **Marketing Ready**: Integrated placeholders for GA4, Meta Pixel, and high-conversion UI sections.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **CMS Client**: [GraphQL Request](https://github.com/jasonkuhrt/graphql-request)
- **Validation**: [Zod](https://zod.dev/)

## 📦 Project Structure

```text
src/
├── app/              # Next.js 15 App Router (Pages, Layouts)
├── components/       # React components (sections, ui, layout, cards)
├── lib/              # Core logic, types, and API clients
│   ├── api/          # CMS interaction layer
│   ├── graphql/      # GraphQL queries and fragments
│   └── types/        # TypeScript interfaces
├── public/           # Static assets (logos, images)
└── styles/           # Global styles and Tailwind configuration
```

## 🏁 Getting Started

### 1. Prerequisites

- Node.js 18.x or later
- npm or yarn

### 2. Installation

```bash
git clone https://github.com/amuhdsal/optimum-web.git
cd optimum-web
npm install
```

### 3. Environment Setup

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

### 4. Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🧪 Testing & Verification

The project includes Playwright for visual verification and end-to-end testing.

```bash
npx playwright test
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
