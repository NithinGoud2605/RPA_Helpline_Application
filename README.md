# RPA Helpline Application

A modern, production-ready frontend application for connecting businesses with RPA (Robotic Process Automation) developers, freelancers, and trainers. Built with React, Vite, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Multi-role Authentication System** - Support for Clients, Freelancers, Developers, Trainers, and Job Seekers
- **Project Management** - Browse, search, filter, and apply to RPA projects
- **Interactive Chat Assistant** - AI-powered chat for user support
- **Dashboard Views** - Role-specific dashboards with personalized content
- **Registration System** - Streamlined onboarding for all user types

### Production-Ready Enhancements
- ✅ **Error Boundary** - Global error handling with user-friendly error pages
- ✅ **Loading States** - Skeleton loaders and spinners for better UX
- ✅ **Toast Notifications** - Real-time user feedback system
- ✅ **Protected Routes** - Authentication guards for secure pages
- ✅ **Form Validation** - Comprehensive client-side validation
- ✅ **Search & Filter** - Advanced filtering for projects
- ✅ **Pagination** - Efficient data pagination
- ✅ **404 Page** - Custom not found page
- ✅ **Modal Component** - Reusable modal dialogs
- ✅ **API Service Layer** - Ready for backend integration
- ✅ **SEO Optimization** - Meta tags and Open Graph support
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Accessibility** - ARIA labels and keyboard navigation
- ✅ **Environment Configuration** - .env support for configuration

## 🛠️ Tech Stack

- **React 19** - Latest React with hooks
- **Vite 7** - Fast build tool and dev server
- **React Router 7** - Client-side routing
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd RPA_Helpline_Application
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

6. Preview production build:
```bash
npm start
# or
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components (ErrorBoundary, Toast, Loading, etc.)
│   ├── chat/            # Chat components
│   ├── dashboard/       # Dashboard-specific components
│   ├── hero/            # Hero section components
│   ├── layout/          # Layout components (Navbar, Footer, Container)
│   ├── telemetry/       # Telemetry components
│   └── ui/              # UI primitives (Button, Card, Input, etc.)
├── hooks/               # Custom React hooks
├── layouts/             # Page layouts
├── mock/                # Mock data and responses
├── pages/                # Page components
├── routes/               # Route configuration
├── services/             # API service layer
├── store/                # Zustand stores
├── styles/               # Global styles
└── utils/                # Utility functions
```

## 🎨 Key Components

### Common Components
- **ErrorBoundary** - Catches React errors and displays user-friendly error pages
- **ToastContainer** - Toast notification system
- **LoadingSpinner** - Loading indicators
- **ProtectedRoute** - Route protection with authentication
- **Modal** - Reusable modal dialog
- **SEO** - SEO meta tag management

### Pages
- **Home** - Landing page with hero section
- **Projects** - Project listing with search and filters
- **ProjectDetail** - Individual project view
- **Dashboard** - Role-specific dashboards
- **SignIn** - Authentication page
- **Register** - Registration pages for different user types
- **NotFound** - 404 error page

## 🔐 Authentication

The app uses Zustand for state management with localStorage persistence. Authentication state is managed in `src/store/authStore.js`.

### User Roles
- **Client** - Post projects and hire talent
- **Freelancer** - Offer RPA services
- **Developer** - Full-stack RPA developers
- **Trainer** - RPA training providers
- **Job Seeker** - Find RPA job opportunities

## 🎯 API Integration

The app includes a ready-to-use API service layer in `src/services/api.js`. To connect to a backend:

1. Set `VITE_API_BASE_URL` in your `.env` file
2. Update the API endpoints in `src/services/api.js`
3. Replace mock data calls with actual API calls

Example:
```javascript
import { authApi } from '../services/api';

const handleLogin = async (credentials) => {
  try {
    const response = await authApi.login(credentials);
    // Handle response
  } catch (error) {
    // Handle error
  }
};
```

## 🎨 Styling

The app uses Tailwind CSS with a custom dark theme. Key design tokens:

- **Primary Colors**: Red (`#ff3333`), Blue (`#4da6ff`), Yellow (`#ffd700`)
- **Dark Theme**: Black backgrounds with subtle starfield pattern
- **Typography**: Tech-focused fonts (Orbitron, Space Mono, Rajdhani)

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
The app includes `vercel.json` for easy Vercel deployment:

```bash
vercel
```

### Render.com
The app is configured for Render.com deployment:

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Render will automatically detect the configuration from `render.yaml`
4. Or manually set:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

The app will automatically:
- Listen on `0.0.0.0` (required for Render)
- Use the `PORT` environment variable provided by Render
- Serve the production build from the `dist` folder

### Other Platforms
1. Build the app: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure routing to serve `index.html` for all routes (SPA)
4. For platforms requiring a server, use: `npm start`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENV=production
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Preview production build
- `npm run lint` - Run ESLint

## 🐛 Error Handling

- **Error Boundary** - Catches React component errors
- **API Error Handling** - Centralized error handling in API service
- **Form Validation** - Client-side validation with error messages
- **Toast Notifications** - User-friendly error messages

## 🎯 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Payment integration
- [ ] Video conferencing
- [ ] File upload system
- [ ] Email notifications
- [ ] Advanced search with AI
- [ ] Multi-language support (i18n)
- [ ] PWA support
- [ ] Unit and integration tests

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. For contributions, please contact the project maintainers.

---

Built with ❤️ using React and modern web technologies.
