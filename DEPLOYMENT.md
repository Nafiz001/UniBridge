# UniBridge Deployment Guide

## Quick Setup for Development

### 1. Prerequisites Check
```bash
node --version  # Should be 18 or higher
npm --version
psql --version  # PostgreSQL should be installed
```

### 2. Database Setup

#### Option A: Local PostgreSQL
```bash
# Create database
createdb unibridge

# Run seed file
psql -d unibridge -f seed.sql
```

#### Option B: Using psql command line
```bash
psql -U postgres
CREATE DATABASE unibridge;
\c unibridge
\i seed.sql
\q
```

### 3. Environment Variables
```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your PostgreSQL credentials
# DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/unibridge
```

### 4. Install and Run
```bash
npm install
npm run dev
```

Visit http://localhost:3000

---

## Production Deployment

### Option 1: Vercel + Neon (Recommended)

#### Database (Neon)
1. Go to [Neon.tech](https://neon.tech)
2. Create free account
3. Create new project
4. Copy connection string
5. In Neon SQL Editor, paste contents of `seed.sql` and run

#### Frontend (Vercel)
1. Push code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variable:
   - Name: `DATABASE_URL`
   - Value: Your Neon connection string
5. Deploy!

### Option 2: Railway (All-in-One)

1. Go to [Railway.app](https://railway.app)
2. New Project → "Deploy from GitHub repo"
3. Select your UniBridge repository
4. Add PostgreSQL service
5. Connect database to your app
6. Add environment variables from Railway's PostgreSQL service
7. In PostgreSQL service, go to "Query" tab and run `seed.sql`
8. Deploy!

### Option 3: Heroku

```bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:essential-0

# Get database URL
heroku config:get DATABASE_URL

# Deploy
git push heroku main

# Seed database
heroku pg:psql < seed.sql
```

---

## Troubleshooting

### Database Connection Issues

**Error: "ECONNREFUSED"**
- Check if PostgreSQL is running: `pg_isready`
- Start PostgreSQL: 
  - macOS: `brew services start postgresql`
  - Linux: `sudo systemctl start postgresql`
  - Windows: Start PostgreSQL service from Services

**Error: "password authentication failed"**
- Verify username/password in `.env.local`
- Check PostgreSQL user exists: `psql -U postgres -c "\du"`

**Error: "database does not exist"**
- Create database: `createdb unibridge`
- Or: `psql -U postgres -c "CREATE DATABASE unibridge;"`

### Build Errors

**Error: "Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
npm run lint
# Fix any issues, then
npm run build
```

---

## Testing the Application

### 1. Test Database Connection
Create a test script `test-db.js`:
```javascript
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function test() {
  const result = await pool.query('SELECT COUNT(*) FROM universities');
  console.log('Universities in database:', result.rows[0].count);
  await pool.end();
}

test();
```

Run: `node test-db.js`

### 2. Test API Endpoints

```bash
# Get all universities
curl http://localhost:3000/api/universities

# Filter by country
curl "http://localhost:3000/api/universities?country=USA"

# Compare universities
curl -X POST http://localhost:3000/api/compare \
  -H "Content-Type: application/json" \
  -d '{"universityIds": [1, 2]}'
```

### 3. Test Features
- ✅ Hero section loads with animation
- ✅ Search filters work (country, degree level)
- ✅ Tuition slider updates results in real-time
- ✅ GPA/IELTS inputs show eligibility badges
- ✅ Select 2-3 universities and compare
- ✅ Apply to eligible university
- ✅ Submit application with validation

---

## Performance Optimization

### For Production

1. **Enable caching**:
   - Add ISR to API routes
   - Cache database queries

2. **Database optimization**:
   ```sql
   -- Already included in seed.sql:
   CREATE INDEX idx_universities_country ON universities(country);
   CREATE INDEX idx_universities_degree_level ON universities(degree_level);
   CREATE INDEX idx_universities_tuition_fee ON universities(tuition_fee);
   ```

3. **Connection pooling**:
   - Increase pool size for production in `lib/db.ts`

---

## Monitoring

### Production Checklist
- [ ] Database connection pool configured
- [ ] Environment variables set
- [ ] SSL enabled for database (if using cloud)
- [ ] Error logging configured
- [ ] Analytics added (optional)
- [ ] CORS configured if needed
- [ ] Rate limiting added (optional)

---

## Support

For issues:
1. Check this guide first
2. Review README.md
3. Check database seed was successful
4. Verify environment variables
5. Check browser console and terminal for errors

---

Built with Next.js 15, PostgreSQL, Tailwind CSS, and Framer Motion
