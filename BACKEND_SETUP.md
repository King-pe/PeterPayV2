# PeterPayV2 Backend Setup Guide

## Overview

This guide explains how to create a backend server for PeterPayV2 to handle authentication and payment operations. The backend will bridge the frontend with the database and external payment services.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Vite React)                    │
│                                                             │
│  src/lib/config.ts → API_BASE_URL = http://localhost:3000  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Node.js/Express)                  │
│                                                             │
│  ├── POST /auth/register      → Create user in DB          │
│  ├── POST /auth/login         → Verify & issue JWT         │
│  ├── GET  /me                 → Get current user           │
│  ├── POST /payments           → Create payment             │
│  ├── GET  /payments           → List payments              │
│  └── ...                                                    │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
   Neon DB         PeterPay API      External Services
   (PostgreSQL)    (peterpay.link)   (webhooks, etc)
```

## Step 1: Create Backend Directory Structure

```bash
cd /home/ubuntu/PeterPayV2
mkdir -p backend/{src/{routes,middleware,models,utils},dist}
cd backend
npm init -y
```

## Step 2: Install Dependencies

```bash
npm install express cors dotenv jsonwebtoken bcryptjs uuid
npm install @neondatabase/serverless
npm install -D typescript @types/express @types/node ts-node
```

## Step 3: Create Environment File

**File:** `backend/.env`
```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@host/dbname

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRY=7d

# PeterPay Integration
PETERPAY_API_KEY=your-peterpay-api-key
PETERPAY_API_URL=https://www.peterpay.link/api/v1

# Frontend
FRONTEND_URL=http://localhost:5173
```

## Step 4: Create TypeScript Configuration

**File:** `backend/tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Step 5: Create Main Server File

**File:** `backend/src/server.ts`
```typescript
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import paymentRoutes from './routes/payments';
import { authenticateToken } from './middleware/auth';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/payments', authenticateToken, paymentRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: {
      code: err.code || 'internal_error',
      message: err.message || 'Internal server error'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

## Step 6: Create Authentication Middleware

**File:** `backend/src/middleware/auth.ts`
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: { code: 'unauthorized', message: 'No token provided' }
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({
        error: { code: 'forbidden', message: 'Invalid token' }
      });
    }
    req.user = user;
    next();
  });
}
```

## Step 7: Create Authentication Routes

**File:** `backend/src/routes/auth.ts`
```typescript
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { neon } from '@neondatabase/serverless';

const router = express.Router();
const sql = neon(process.env.DATABASE_URL || '');

interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  business_name: string;
  country: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

// Register endpoint
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, business_name, country }: RegisterRequest = req.body;

    // Validate input
    if (!first_name || !last_name || !email || !password || !business_name || !country) {
      return res.status(400).json({
        error: { code: 'validation_error', message: 'Missing required fields' }
      });
    }

    // Check if user exists
    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json({
        error: { code: 'user_exists', message: 'User already registered' }
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const merchantId = uuidv4();

    // Create merchant
    await sql`
      INSERT INTO merchants (id, legal_name, trading_name, country, status, kyc_status, created_at)
      VALUES (${merchantId}, ${business_name}, ${business_name}, ${country}, 'pending', 'pending', NOW())
    `;

    // Create user
    await sql`
      INSERT INTO users (id, email, first_name, last_name, password_hash, merchant_id, role, created_at)
      VALUES (${userId}, ${email}, ${first_name}, ${last_name}, ${hashedPassword}, ${merchantId}, 'merchant', NOW())
    `;

    // Generate tokens
    const accessToken = jwt.sign(
      { id: userId, email, role: 'merchant' },
      process.env.JWT_SECRET || '',
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    const refreshToken = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET || '',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: userId,
        email,
        first_name,
        last_name,
        role: 'merchant'
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: { code: 'registration_failed', message: error.message }
    });
  }
});

// Login endpoint
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: { code: 'validation_error', message: 'Email and password required' }
      });
    }

    // Find user
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (users.length === 0) {
      return res.status(401).json({
        error: { code: 'invalid_credentials', message: 'Invalid email or password' }
      });
    }

    const user = users[0];

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({
        error: { code: 'invalid_credentials', message: 'Invalid email or password' }
      });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || '',
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || '',
      { expiresIn: '30d' }
    );

    res.json({
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      error: { code: 'login_failed', message: error.message }
    });
  }
});

export default router;
```

## Step 8: Create Payment Routes

**File:** `backend/src/routes/payments.ts`
```typescript
import express, { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get payments
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    // TODO: Implement payment listing
    res.json({ payments: [] });
  } catch (error: any) {
    res.status(500).json({ error: { message: error.message } });
  }
});

// Create payment
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    // TODO: Implement payment creation
    res.status(201).json({ payment: {} });
  } catch (error: any) {
    res.status(500).json({ error: { message: error.message } });
  }
});

export default router;
```

## Step 9: Update Frontend Configuration

**File:** `src/lib/config.ts`
```typescript
export const API_BASE_URL = cfg.API_BASE_URL || 'http://localhost:3000';
```

## Step 10: Update Package Scripts

**File:** `package.json` (root)
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "vite",
    "dev:backend": "cd backend && npm run dev",
    "build": "npm run build:frontend && npm run build:backend",
    "build:frontend": "vite build",
    "build:backend": "cd backend && npm run build"
  }
}
```

**File:** `backend/package.json`
```json
{
  "scripts": {
    "dev": "ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

## Running the Application

```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Run development servers
npm run dev

# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

## Testing Registration

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Peter",
    "last_name": "Joram",
    "email": "peter@example.com",
    "password": "SecurePass123",
    "business_name": "My Business",
    "country": "TZ"
  }'
```

Expected response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "peter@example.com",
    "first_name": "Peter",
    "last_name": "Joram",
    "role": "merchant"
  }
}
```

## Database Schema Requirements

Ensure your Neon database has these tables:

```sql
CREATE TABLE merchants (
  id UUID PRIMARY KEY,
  legal_name VARCHAR(255) NOT NULL,
  trading_name VARCHAR(255),
  country VARCHAR(2),
  status VARCHAR(50),
  kyc_status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  password_hash VARCHAR(255),
  merchant_id UUID REFERENCES merchants(id),
  role VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Next Steps

1. Implement payment endpoints that integrate with PeterPay API
2. Add webhook handlers for payment notifications
3. Implement dashboard statistics endpoints
4. Add admin endpoints
5. Set up proper error handling and logging
6. Add rate limiting and security headers
7. Deploy to production (Vercel, Railway, Heroku, etc.)

## Deployment

For production, consider:
- **Vercel**: Frontend + Serverless backend
- **Railway**: Full-stack deployment
- **Heroku**: Simple Node.js deployment
- **AWS/GCP/Azure**: Full infrastructure control
