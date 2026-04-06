# Development & Deployment Guide - Student Management System (SMS)

Complete guide for local setup, development, database management, and deployment of the SMS application.

---

## Table of Contents

1. [Local Setup Instructions](#local-setup-instructions)
2. [Server Start & Operations](#server-start--operations)
3. [Database Commands](#database-commands)
4. [Git Workflow for Development](#git-workflow-for-development)
5. [Building for Production](#building-for-production)
6. [Deployment Instructions](#deployment-instructions)
7. [Environment Variables](#environment-variables)
8. [Troubleshooting](#troubleshooting)

---

## Local Setup Instructions

### Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher (comes with Node.js)
- **PostgreSQL**: v12 or higher (for production) or local PostgreSQL instance
- **Git**: v2.x or higher

### Step 1: Clone the Repository

```bash
git clone https://github.com/srescs/sms.git
cd sms
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all dependencies listed in `package.json`:
- Next.js 14
- Prisma ORM
- TypeScript
- Tailwind CSS
- And other supporting libraries

### Step 3: Setup Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Or manually create `.env` with the following content:

```env
# Database Connection (PostgreSQL)
DATABASE_URL="postgres://user:password@localhost:5432/sms_db"

# JWT Secret for Authentication
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Node Environment
NODE_ENV="development"
```

**For Development**: Use a local PostgreSQL instance or a cloud PostgreSQL service (like Prisma Cloud)

**For Production**: Use the provided Prisma Database URL or your own PostgreSQL instance

### Step 4: Setup Database

#### Option A: Using Existing PostgreSQL with Provided Credentials

```bash
# The DATABASE_URL is already set in .env
npx prisma migrate deploy
```

#### Option B: Using Local PostgreSQL

```bash
# Create a local PostgreSQL database
createdb sms_db

# Update DATABASE_URL in .env to point to local database
# DATABASE_URL="postgres://localhost/sms_db"

npx prisma migrate deploy
```

### Step 5: Seed Database with Test Data

```bash
npm run db:seed
```

This will populate the database with sample data:
- 1 Admin user
- 2 Sample students
- 2 Sample parents
- Student-parent relationships
- Attendance records
- Exam results

### Step 6: Verify Setup

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser. You should see the login page.

---

## Server Start & Operations

### Development Mode

**Start development server with hot-reload:**

```bash
npm run dev
```

- Development server runs on `http://localhost:3000`
- Hot-reload enabled for instant updates during development
- Debug information printed to console
- Database auto-sync with schema changes

**Keep running in terminal and view logs for debugging:**

```bash
npm run dev -- -p 3001
```
*(Run on different port if needed)*

### Production Mode

**Build for production:**

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

**Start production server:**

```bash
npm start
```

- Production server runs on `http://localhost:3000`
- No hot-reload; restart required for code changes
- Better performance than development mode

### Linting

**Check code quality and style issues:**

```bash
npm run lint
```

**Fix linting issues automatically (where possible):**

```bash
npm run lint -- --fix
```

### Full Server Operations Checklist

```bash
# 1. Start development environment
npm run dev

# 2. In another terminal, run linting
npm run lint

# 3. Build for testing
npm run build

# 4. Test production build
npm start

# 5. Stop server
Ctrl + C

# 6. Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

---

## Database Commands

### Prisma Migrations

**Check database sync status:**

```bash
npx prisma migrate status
```

**Create and apply a new migration (after schema changes):**

```bash
npx prisma migrate dev --name <migration_name>
```

Example:

```bash
npx prisma migrate dev --name add_exam_schedule
```

**Deploy migrations to production:**

```bash
npx prisma migrate deploy
```

**Reset database (⚠️ CAUTION: Deletes all data):**

```bash
npx prisma migrate reset
```

### Prisma Studio (GUI Database Browser)

**Open interactive database explorer in browser:**

```bash
npx prisma studio
```

This opens a web interface to:
- View all records in each table
- Create, read, update, delete records
- Explore relationships between tables

### Seed Database

**Run seed script:**

```bash
npm run db:seed
```

**or using Prisma directly:**

```bash
npx prisma db seed
```

### Manual SQL Execution

**Execute custom SQL file:**

```bash
npx prisma db execute --file seed.sql
```

**View generated SQL schema:**

```bash
cat prisma/migrations/20260406155604_init_postgres/migration.sql
```

---

## Git Workflow for Development

### Initial Setup

**Configure git (first time):**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Feature Development Workflow

**1. Create and switch to feature branch:**

```bash
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/authentication` - New feature
- `bugfix/login-error` - Bug fix
- `hotfix/critical-issue` - Urgent fix
- `docs/update-readme` - Documentation

**2. Make changes and check status:**

```bash
git status
```

**3. Stage specific files:**

```bash
git add file1.ts file2.tsx
```

**Or stage all changes:**

```bash
git add .
```

**4. Commit changes with descriptive message:**

```bash
git commit -m "Add authentication middleware for protected routes"
```

**Commit message format:**
```
<type>: <short description>

<optional detailed explanation>

Fixes #123
```

**Types:** feat, fix, docs, style, refactor, test, chore

**5. Push to remote repository:**

```bash
git push origin feature/your-feature-name
```

**6. Create a Pull Request (PR) on GitHub**

Go to: `https://github.com/srescs/sms/pulls`

### Syncing with Main Branch

**Fetch latest changes from remote:**

```bash
git fetch origin
```

**Pull latest changes to current branch:**

```bash
git pull origin main
```

**Rebase your feature on latest main:**

```bash
git rebase origin/main
```

### Viewing History

**View commit history:**

```bash
git log
```

**View commit history in compact format:**

```bash
git log --oneline
```

**View changes in a specific commit:**

```bash
git show <commit-hash>
```

**View diffs for current changes:**

```bash
git diff
```

### Merging to Main (After PR Approval)

**Switch to main branch:**

```bash
git checkout main
```

**Update main with latest remote:**

```bash
git pull origin main
```

**Merge feature branch:**

```bash
git merge feature/your-feature-name
```

**Push merged main to remote:**

```bash
git push origin main
```

### Common Git Scenarios

**Undo last local commit (keep changes):**

```bash
git reset --soft HEAD~1
```

**Undo last local commit (discard changes):**

```bash
git reset --hard HEAD~1
```

**View all branches:**

```bash
git branch -a
```

**Delete local branch:**

```bash
git branch -d feature/your-feature-name
```

**Delete remote branch:**

```bash
git push origin --delete feature/your-feature-name
```

---

## Building for Production

### Pre-Build Checklist

```bash
# 1. Install dependencies
npm install

# 2. Run linter
npm run lint

# 3. Check environment variables
cat .env

# 4. Verify database connection
npx prisma db execute --stdin < test-query.sql
```

### Build Process

**Build the application:**

```bash
npm run build
```

This:
- Compiles TypeScript
- Optimizes JavaScript bundles
- Creates static optimization report
- Generates `.next` folder with production-ready code

**Output example:**

```
Route (pages)                              Size
┌ /_app                                    50 kB
├ ○ /404                                   3.2 kB
├ ○ /login                                 8.5 kB
├ ○ /dashboard                             12 kB
├ ○ /students                              15 kB
├ ○ /attendance                            14 kB
├ ○ /exam                                  16 kB
├ ○ /results                               12 kB
└ ○ /api/[...routes]                       5 kB
```

### Verify Production Build Locally

```bash
# Clear previous build
rm -rf .next

# Build again
npm run build

# Start production server
npm start

# Visit http://localhost:3000
```

---

## Deployment Instructions

### Prerequisites for Deployment

- Production PostgreSQL database URL
- Production JWT secret
- Server/hosting platform (Vercel, Heroku, AWS, DigitalOcean, etc.)
- Domain name (optional)

### Option 1: Deploy to Vercel (Recommended for Next.js)

**1. Install Vercel CLI:**

```bash
npm install -g vercel
```

**2. Login to Vercel:**

```bash
vercel login
```

**3. Initialize Vercel project:**

```bash
vercel
```

Follow prompts to connect your GitHub repository.

**4. Set environment variables in Vercel dashboard:**

```
DATABASE_URL = postgres://...
JWT_SECRET = your-production-secret
NODE_ENV = production
```

**5. Deploy:**

```bash
vercel --prod
```

Your app will be available at `https://your-project-name.vercel.app`

### Option 2: Deploy to Heroku

**1. Install Heroku CLI:**

Refer to: https://devcenter.heroku.com/articles/heroku-cli

**2. Login to Heroku:**

```bash
heroku login
```

**3. Create Heroku app:**

```bash
heroku create your-app-name
```

**4. Set environment variables:**

```bash
heroku config:set DATABASE_URL="postgres://..."
heroku config:set JWT_SECRET="your-production-secret"
heroku config:set NODE_ENV="production"
```

**5. Add Procfile to project:**

Create `Procfile`:

```
web: npm start
```

**6. Deploy:**

```bash
git push heroku main
```

### Option 3: Deploy to AWS/DigitalOcean/VPS

**1. Prepare server (Ubuntu/Debian):**

```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install Nginx (reverse proxy)
sudo apt install nginx
```

**2. Clone repository on server:**

```bash
cd ~
git clone https://github.com/srescs/sms.git
cd sms
```

**3. Install dependencies:**

```bash
npm install
npm run build
```

**4. Set environment variables:**

```bash
nano .env
```

Add production values.

**5. Setup systemd service for auto-restart:**

Create `/etc/systemd/system/sms.service`:

```ini
[Unit]
Description=Student Management System
After=network.target postgresql.service

[Service]
User=www-data
WorkingDirectory=/home/ubuntu/sms
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable sms
sudo systemctl start sms
```

**6. Setup Nginx reverse proxy:**

Create `/etc/nginx/sites-available/sms`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/sms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**7. Setup SSL with Let's Encrypt:**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Deployment Verification

After any deployment:

```bash
# Check if server is running
curl http://your-domain.com/api/auth

# View logs
# Vercel: vercel logs your-app-name
# Heroku: heroku logs --tail
# VPS: sudo journalctl -u sms -f

# Test login page
# Open in browser: http://your-domain.com/login
```

---

## Environment Variables

### Development Environment

Create `.env` for local development:

```env
DATABASE_URL="postgres://user:password@localhost:5432/sms_dev"
JWT_SECRET="dev-secret-key-change-for-production"
NODE_ENV="development"
```

### Production Environment

Set these on your hosting platform:

```env
DATABASE_URL="postgres://production-user:secure-password@prod-db-host:5432/sms"
JWT_SECRET="long-random-secure-key-minimum-32-characters"
NODE_ENV="production"
```

### Generate Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Troubleshooting

### Issue: Port 3000 Already in Use

**Solution:**

```bash
# Kill process on port 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Issue: Database Connection Failed

**Check connection string:**

```bash
echo $DATABASE_URL
```

**Test PostgreSQL connection:**

```bash
psql $DATABASE_URL -c "SELECT 1;"
```

**Verify Prisma connection:**

```bash
npx prisma db execute --stdin < <(echo "SELECT 1;")
```

### Issue: Build Fails with TypeScript Errors

**Solution:**

```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix common issues
npm run lint -- --fix

# Rebuild
rm -rf .next
npm run build
```

### Issue: Node Modules Corrupted

**Solution:**

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database Migrations Failed

**Check migration status:**

```bash
npx prisma migrate status
```

**Resolve migration issues:**

```bash
# Reset database (⚠️ Deletes all data)
npx prisma migrate reset

# Or manually resolve:
npx prisma migrate resolve --rolled-back <migration-name>
```

### Issue: Seed Script Not Working

**Debug seed script:**

```bash
npm run db:seed -- --verbose
```

**Check environment variables are loaded:**

```bash
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL);"
```

### Issue: Changes Not Reflecting After Deploy

**Clear cache and rebuild:**

```bash
git clean -fd
git reset --hard HEAD
npm install
npm run build
```

### Need Help?

Check log files:

```bash
# Development logs
tail -f .next/logs/*.log

# Database query logs
npx prisma studio

# Git logs
git log --oneline -10
```

---

## Quick Commands Reference

```bash
# Setup
git clone <repo> && cd sms && npm install

# Development
npm run dev                    # Start dev server
npm run lint                   # Check code quality
npm run build                  # Build for production
npm start                      # Start production server

# Database
npx prisma migrate dev         # Create migration
npx prisma migrate deploy      # Apply migrations
npx prisma studio            # Open database GUI
npm run db:seed               # Seed test data
npx prisma db reset           # Reset database

# Git
git status                     # Check status
git add .                      # Stage changes
git commit -m "message"        # Commit changes
git push origin main           # Push to remote
git pull origin main           # Fetch and merge
git branch -a                  # List branches

# Troubleshooting
lsof -ti:3000 | xargs kill -9 # Kill port 3000
npx tsc --noEmit              # Check TypeScript
npm install                    # Reinstall node modules
```

---

## Support & Documentation

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **GitHub**: https://github.com/srescs/sms

Last Updated: April 6, 2026
