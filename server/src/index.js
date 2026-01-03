import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profiles.js';
import projectRoutes from './routes/projects.js';
import freelancerRoutes from './routes/freelancers.js';
import jobRoutes from './routes/jobs.js';
import trainingRoutes from './routes/training.js';
import taxonomyRoutes from './routes/taxonomy.js';
import notificationRoutes from './routes/notifications.js';
import messageRoutes from './routes/messages.js';
import uploadRoutes from './routes/upload.js';

// Middleware
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS configuration - Support multiple origins for Render deployment
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    const allowedOrigins = [];
    
    // Add explicit frontend URL from env
    if (process.env.FRONTEND_URL) {
      allowedOrigins.push(process.env.FRONTEND_URL);
    }
    
    // Add localhost for development
    if (process.env.NODE_ENV !== 'production') {
      allowedOrigins.push(
        'http://localhost:5173',
        'http://localhost:4173',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:4173'
      );
    }
    
    // Allow any .onrender.com subdomain in production (Render frontend URLs)
    if (process.env.NODE_ENV === 'production') {
      if (origin.match(/^https?:\/\/.*\.onrender\.com$/)) {
        return callback(null, true);
      }
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many authentication attempts, please try again later.' }
});
app.use('/api/auth/', authLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '2.0.0'
  });
});

// =====================
// API Routes
// =====================

// Authentication
app.use('/api/auth', authRoutes);

// Profiles (user profiles, skills, experience, portfolio)
app.use('/api/profiles', profileRoutes);

// Projects (freelance opportunities)
app.use('/api/projects', projectRoutes);

// Freelancers (search, hire freelancers)
app.use('/api/freelancers', freelancerRoutes);

// Jobs (full-time employment)
app.use('/api/jobs', jobRoutes);

// Training (programs, enrollments)
app.use('/api/training', trainingRoutes);

// Taxonomy (platforms, skills, certifications)
app.use('/api/taxonomy', taxonomyRoutes);

// Notifications
app.use('/api/notifications', notificationRoutes);

// Messages (conversations, direct messages)
app.use('/api/messages', messageRoutes);

// File uploads
app.use('/api/upload', uploadRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server - listen on 0.0.0.0 for Render deployment
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  const apiUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.BACKEND_URL || `http://${HOST}:${PORT}`}/api`
    : `http://localhost:${PORT}/api`;
  
  console.log(`
  ╔════════════════════════════════════════════════════════════════╗
  ║                                                                ║
  ║   🚀 RPA HELPLINE SERVER v2.0                                  ║
  ║                                                                ║
  ╠════════════════════════════════════════════════════════════════╣
  ║                                                                ║
  ║   Environment: ${(process.env.NODE_ENV || 'development').padEnd(45)}║
  ║   Host: ${String(HOST).padEnd(54)}║
  ║   Port: ${String(PORT).padEnd(53)}║
  ║   API URL: ${apiUrl.padEnd(47)}║
  ║                                                                ║
  ╠════════════════════════════════════════════════════════════════╣
  ║                                                                ║
  ║   USER TYPES SUPPORTED:                                        ║
  ║   • RPA Freelancer     - Take on automation projects           ║
  ║   • RPA Job Seeker     - Find full-time RPA positions          ║
  ║   • RPA Trainer        - Offer training programs               ║
  ║   • RPA BA/PM          - Business Analyst / Project Manager    ║
  ║   • Client             - Hire freelancers for projects         ║
  ║   • Employer           - Post job listings                     ║
  ║                                                                ║
  ╠════════════════════════════════════════════════════════════════╣
  ║                                                                ║
  ║   ENDPOINTS:                                                   ║
  ║   POST   /api/auth/register    - Register new user             ║
  ║   POST   /api/auth/login       - User login                    ║
  ║   GET    /api/auth/me          - Get current user              ║
  ║                                                                ║
  ║   GET    /api/profiles         - Search profiles               ║
  ║   GET    /api/profiles/me      - Get my full profile           ║
  ║   PUT    /api/profiles/me      - Update my profile             ║
  ║                                                                ║
  ║   GET    /api/projects         - Browse projects               ║
  ║   POST   /api/projects         - Post new project              ║
  ║                                                                ║
  ║   GET    /api/freelancers      - Search freelancers            ║
  ║   GET    /api/jobs             - Browse job listings           ║
  ║   GET    /api/training         - Browse training programs      ║
  ║                                                                ║
  ║   GET    /api/taxonomy/*       - Platforms, skills, certs      ║
  ║   GET    /api/notifications    - User notifications            ║
  ║   GET    /api/messages/*       - Conversations & messages      ║
  ║                                                                ║
  ╚════════════════════════════════════════════════════════════════╝
  `);
});

export default app;
