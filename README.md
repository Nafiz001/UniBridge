# UniBridge - University Admission Platform

🚀 **[Live Demo](https://unibridge-green.vercel.app/)** - Deployed on Vercel

A full-stack MVC-structured university admission platform built with Next.js, PostgreSQL (Supabase), Tailwind CSS, and Framer Motion. Featuring 53+ universities across 20+ countries with real-time filtering, eligibility checking, and side-by-side comparison.

## 🚀 Features

- **Real-Time Filtering**: Filter universities by country, degree level, tuition fee, GPA, and IELTS scores
- **Eligibility Checking**: Automatic eligibility validation based on student academic credentials
- **University Comparison**: Side-by-side comparison of 2-3 universities
- **Quick Apply**: Multi-step application form with server-side validation
- **Responsive Design**: Beautiful, mobile-friendly UI with Framer Motion animations
- **Strict MVC Architecture**: Separate Models, Controllers (API routes), and Views (React components)

## 🏗️ Architecture

### MVC Structure

```
/app
├── page.tsx                    # Main home page (View)
├── /api                        # Controllers
│   ├── universities/route.ts  # University filtering API
│   ├── compare/route.ts       # Comparison API
│   └── applications/route.ts  # Application submission API
├── /components                 # View Components
│   ├── HeroSection.tsx
│   ├── SearchBar.tsx
│   ├── TuitionSlider.tsx
│   ├── UniversityCard.tsx
│   ├── CompareModal.tsx
│   └── ApplyForm.tsx
├── /lib                        # Models
│   ├── db.ts                  # Database connection
│   ├── university.model.ts    # University business logic
│   └── application.model.ts   # Application business logic
└── /types                      # TypeScript types
    ├── university.ts
    └── application.ts
```

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL 13+
- Git

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Nafiz001/UniBridge.git
cd UniBridge
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

Create a PostgreSQL database and run the seed file:

```bash
# Create database
createdb unibridge

# Run seed file
psql -d unibridge -f seed.sql
```

Alternatively, connect to PostgreSQL and run:

```sql
\i seed.sql
```
For local development, PostgreSQL can be used. For production, a managed PostgreSQL service such as Supabase or Neon is recommended.

### 4. Environment Configuration

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/unibridge
```

Replace `username` and `password` with your PostgreSQL credentials.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

### Universities Table

| Column        | Type         | Description                      |
|---------------|--------------|----------------------------------|
| id            | SERIAL       | Primary key                      |
| name          | VARCHAR(255) | University name                  |
| country       | VARCHAR(100) | Country location                 |
| degree_level  | VARCHAR(50)  | Bachelor/Master/PhD              |
| min_gpa       | DECIMAL(3,2) | Minimum GPA requirement (0-4.0)  |
| min_ielts     | DECIMAL(3,1) | Minimum IELTS requirement (0-9.0)|
| tuition_fee   | INTEGER      | Annual tuition fee in USD        |
| description   | TEXT         | University description           |
| created_at    | TIMESTAMP    | Record creation timestamp        |

### Applications Table

| Column        | Type         | Description                      |
|---------------|--------------|----------------------------------|
| id            | SERIAL       | Primary key                      |
| university_id | INTEGER      | Foreign key to universities      |
| student_name  | VARCHAR(255) | Student full name                |
| email         | VARCHAR(255) | Student email                    |
| gpa           | DECIMAL(3,2) | Student GPA (0-4.0)              |
| ielts         | DECIMAL(3,1) | Student IELTS score (0-9.0)      |
| created_at    | TIMESTAMP    | Application submission time      |

## 🔌 API Endpoints

### GET /api/universities

Filter universities with optional query parameters:

```
?country=USA
&degreeLevel=Master
&tuitionMin=20000
&tuitionMax=50000
&studentGPA=3.5
&studentIELTS=7.0
```

### POST /api/compare

Compare universities:

```json
{
  "universityIds": [1, 2, 3]
}
```

### POST /api/applications

Submit application:

```json
{
  "university_id": 1,
  "student_name": "John Doe",
  "email": "john@example.com",
  "gpa": 3.5,
  "ielts": 7.0
}
```

## 🎨 Key Features Explained

### 1. Real-Time Filtering

The tuition slider and academic input fields trigger API calls with a 500ms debounce, providing instant results without overwhelming the server.

### 2. Eligibility Validation

- **Client-side**: Visual feedback with badges (✓ Eligible / ✗ Not Eligible)
- **Server-side**: Strict validation before application submission
- Applications are rejected if student doesn't meet minimum requirements

### 3. University Comparison

Select 2-3 universities using checkboxes, then click "Compare Now" to view a side-by-side comparison table in a modal.

### 4. Multi-Step Application Form

- **Step 1**: Personal information (name, email)
- **Step 2**: Academic credentials (GPA, IELTS)
- Full validation on both client and server sides

## 🎭 Technologies Used

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: PostgreSQL
- **ORM**: pg (node-postgres)
- **Deployment**: Vercel-ready

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add `DATABASE_URL` environment variable
4. Deploy

### Database Hosting

Consider using:
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Supabase](https://supabase.com) - PostgreSQL with additional features
- [Railway](https://railway.app) - Full-stack deployment

## 🧪 Testing

The application includes:
- 53 seed universities across 20 countries
- Varied degree levels (Bachelor, Master, PhD)
- Different tuition ranges ($15,000 - $58,000)
- Diverse GPA/IELTS requirements

## 📝 MVC Principles

This project strictly follows MVC architecture:

- **Models** (`/lib/*.model.ts`): Handle all SQL queries and business logic
- **Controllers** (`/api/*/route.ts`): Process HTTP requests, no business logic
- **Views** (`/components/*.tsx`, `page.tsx`): Pure React components, no database access

## 🤝 Contributing

This is an internship task project. For production use, consider adding:

- Authentication and user sessions
- Document upload functionality
- Payment integration
- Email notifications
- Admin dashboard
- Unit and integration tests

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Created as an internship task demonstrating full-stack development skills with strict MVC architecture.

## 🔗 Links

- [Live Application](https://unibridge-green.vercel.app/) - Production Deployment
- [GitHub Repository](https://github.com/Nafiz001/UniBridge)

---

Built with ❤️ using Next.js, PostgreSQL, and Tailwind CSS
