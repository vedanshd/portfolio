# Vedansh Dhawan - Portfolio Website

A modern, responsive portfolio website with a minimalist dark theme design inspired by Apple aesthetics.

## Features

- Clean, dark-themed UI with blue accent colors
- Responsive design that works on mobile, tablet, and desktop
- Smooth scroll animations using Framer Motion
- Section-based layout with modern design elements
- Resume download functionality

## Tech Stack

- React 
- TypeScript
- Tailwind CSS
- ShadCN UI Components
- Framer Motion for animations
- Vite for development and building

## Setup Instructions

### Local Development

1. Clone the repository
   ```
   git clone https://github.com/your-username/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Run the development server
   ```
   npm run dev
   ```
   
4. Open your browser to `http://localhost:5000`

### Deployment on GitHub Pages

1. Update the `vite.config.ts` file with your repository name:
   ```
   base: '/your-repo-name/'
   ```

2. Build the project
   ```
   npm run build
   ```

3. Deploy to GitHub Pages
   ```
   npm run deploy
   ```

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - UI components
  - `/src/components/sections` - Portfolio sections
  - `/src/components/layout` - Layout components
  - `/src/hooks` - Custom React hooks
  - `/src/lib` - Utility functions
  - `/src/pages` - Page components

- `/public` - Static assets including resume PDF
- `/server` - Express server for serving the application

## License

MIT