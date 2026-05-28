# PeterPayV2 Registration "Failed to Fetch" Analysis

## Problem Summary

The registration page shows **"Failed to fetch"** error when users attempt to sign up. This is a network-level error, not an API validation error.

## Root Cause Analysis

### 1. **Missing Backend API Server**
The project is a **frontend-only Vite React application** with no backend implementation:
- No Express, Fastify, or other HTTP server in the codebase
- `package.json` contains only frontend dependencies (React, Vite, TailwindCSS)
- `update.database.js` only sets up database schema and admin user—it's not a server
- No `/api` routes or backend handlers exist

### 2. **Incorrect API Base URL**
The frontend is hardcoded to call: `https://api.peterpay.com/v1`

**Issues:**
- `api.peterpay.com` **does not resolve** (DNS lookup fails)
- The actual PeterPay service runs at `https://www.peterpay.link/api/v1` (different domain)
- The frontend cannot reach the hardcoded endpoint, causing "Failed to fetch"

### 3. **No Runtime Configuration**
The config system expects `window.__PETERPAY_CONFIG__` to be set at runtime:
```typescript
// src/lib/config.ts
export const API_BASE_URL = cfg.API_BASE_URL || 'https://api.peterpay.com/v1';
```

**But:**
- `index.html` has no script that sets this global object
- The app falls back to the unreachable hardcoded URL
- No environment variable injection mechanism exists

## Solutions

### Option 1: Use External PeterPay Service (Recommended for Testing)
Update the API base URL to point to the actual PeterPay service:

**File:** `src/lib/config.ts`
```typescript
export const API_BASE_URL = cfg.API_BASE_URL || 'https://www.peterpay.link/api/v1';
```

**Note:** The actual PeterPay API uses different endpoints than what the frontend expects:
- Frontend expects: `/auth/register`, `/auth/login`
- PeterPay offers: `/create_order`, `/direct_pay`, `/order_status`

You'll need to adapt the frontend to match the actual API or create a backend adapter.

### Option 2: Build a Backend Server (Recommended for Production)
Create a Node.js/Express backend that:
1. Implements `/auth/register` and `/auth/login` endpoints
2. Handles user registration in the Neon PostgreSQL database
3. Issues JWT tokens for authentication
4. Proxies or adapts PeterPay payment endpoints as needed

**Suggested structure:**
```
PeterPayV2/
├── frontend/          (current Vite app)
├── backend/           (new Node.js/Express server)
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── payments.ts
│   │   └── ...
│   ├── middleware/
│   ├── models/
│   └── server.ts
└── ...
```

### Option 3: Configure Runtime API URL
Inject the API base URL at build/runtime:

**Update `index.html`:**
```html
<script>
  window.__PETERPAY_CONFIG__ = {
    API_BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    ENVIRONMENT: 'sandbox'
  };
</script>
```

**Update `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL)
  }
})
```

## Error Flow Diagram

```
User submits registration form
    ↓
Register.tsx calls useRegister()
    ↓
usePeterPay.ts calls api.post('/auth/register', ...)
    ↓
apiClient.ts makes fetch() to: https://api.peterpay.com/v1/auth/register
    ↓
Browser DNS lookup fails (api.peterpay.com doesn't exist)
    ↓
fetch() throws network error
    ↓
useApi.ts catches error and wraps as ApiRequestError(0, 'network_error')
    ↓
Register.tsx displays: error.message = "Failed to fetch"
```

## Files Involved

| File | Issue |
|------|-------|
| `src/lib/config.ts` | Hardcoded unreachable API URL |
| `index.html` | No runtime config injection |
| `vite.config.ts` | No environment variable handling |
| `src/hooks/useApi.ts` | Correctly catches network errors |
| `src/pages/marketing/Register.tsx` | Correctly displays error messages |

## Recommended Next Steps

1. **Immediate Fix:** Update `src/lib/config.ts` to use the correct PeterPay domain
2. **Short-term:** Implement a backend server to handle authentication
3. **Long-term:** Set up proper environment variable injection for different deployment environments (sandbox, staging, production)

## Testing the Fix

After implementing a solution:
```bash
# Test with curl
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "User",
    "email": "test@example.com",
    "password": "TestPass123",
    "business_name": "Test Business",
    "country": "TZ"
  }'
```

Expected response:
```json
{
  "access_token": "...",
  "refresh_token": "...",
  "user": { ... }
}
```
