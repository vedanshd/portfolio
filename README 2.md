# Modern Portfolio Website

A modern, Apple-inspired portfolio website built with React and Express.js featuring smooth animations and comprehensive content sections.

## Features

- 🎨 Modern, minimalist design inspired by Apple's aesthetic
- 🌓 Dark/Light mode toggle
- 🎭 Smooth scroll animations using Framer Motion
- 📱 Fully responsive design
- 🔄 Interactive UI elements
- 📬 Contact form with backend integration
- 🎯 Section-based navigation

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Shadcn/ui Components
  - React Query

- **Backend:**
  - Express.js
  - PostgreSQL (with Drizzle ORM)
  - Zod for validation

## Project Structure

```
portfolio/
├── public/               # Static assets (resume.pdf, etc.)
├── src/                  # Frontend React application
│   ├── components/       # React components
│   │   ├── layout/       # Layout components (Navbar, etc.)
│   │   ├── sections/     # Section components (Hero, About, etc.)
│   │   └── ui/           # UI components (Button, Card, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── pages/            # Page components
├── server/               # Backend Express application
│   ├── routes.ts         # API routes
│   └── storage.ts        # Database interface
└── shared/               # Shared types and schemas
    └── schema.ts         # Database schema
```

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open `http://localhost:5000` in your browser

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=your_database_url_here
```

## License

MIT
