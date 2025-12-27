# RPA Helpline 🚀

A futuristic, mission-control themed platform for connecting businesses with RPA (Robotic Process Automation) developers, freelancers, trainers, and talent.

## 🎯 Features

- **Mission Control UI**: Dark, futuristic design with NASA-inspired aesthetics
- **Role-Based Portals**: Dedicated dashboards for Clients, Freelancers, Developers, Trainers, and Job Seekers
- **AI Chat Interface**: Integrated ChatGPT-style chat terminal
- **Live Telemetry**: Real-time stats and metrics display
- **Responsive Design**: Works seamlessly on all devices

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Icons & Lucide React** - Icon libraries

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd RPAHELPLINE
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Preview production build
```bash
npm run preview
```

## 📦 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI globally
```bash
npm i -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Deploy
```bash
vercel
```

4. For production deployment
```bash
vercel --prod
```

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

### Configuration

The project includes a `vercel.json` configuration file that:
- Handles client-side routing (SPA)
- Sets proper headers for security
- Configures asset caching
- Optimizes build output

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── hero/      # Hero section components
│   ├── layout/    # Layout components (Navbar, Footer)
│   ├── ui/        # Base UI components (Button, Card, etc.)
│   └── telemetry/ # Telemetry/metrics components
├── pages/         # Page components
│   ├── Dashboard/ # Role-based dashboards
│   └── Register/  # Registration pages
├── routes/        # Route configuration
├── store/         # Zustand state stores
├── hooks/         # Custom React hooks
├── mock/          # Mock data
└── styles/        # Global styles
```

## 🎨 Design System

### Colors
- **Primary Red**: `#ff3333`
- **Primary Blue**: `#4da6ff`
- **Accent Yellow**: `#ffd700`
- **Status Green**: `#00ff00`
- **Dark Background**: `#0a0a0a`

### Fonts
- **Display**: Orbitron, Audiowide (for headings)
- **Monospace**: Space Mono, Share Tech Mono (for technical text)
- **Body**: Rajdhani, Exo 2 (for regular text)

## 🌐 Environment Variables

Currently, the project uses mock data stored in localStorage. For production, you may want to add:

```env
VITE_API_URL=your-api-url
VITE_ENVIRONMENT=production
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔗 Key Routes

- `/` - Home page with hero section
- `/sign-in` - Sign in page
- `/register` - Registration page with role selection
- `/dashboard` - User dashboard (role-based)
- `/projects` - Browse projects
- `/how-it-works` - Information page

## 🤝 Contributing

This is a private project, but feel free to submit issues or suggestions!

## 📄 License

Private - All rights reserved

---

**Built with ❤️ for the RPA community**
