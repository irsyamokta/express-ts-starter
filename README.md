# Express Typescript Starter

Starter pack backend modern menggunakan **Express + TypeScript** dengan arsitektur terstruktur, autentikasi lengkap, dan fitur siap pakai untuk membangun REST API dengan cepat.

## ✨ Fitur Utama

- ✅ Express + TypeScript
- ✅ Register & Login
- ✅ JWT Access & Refresh Token
- ✅ Email verification (dengan token)
- ✅ Nodemailer support
- ✅ Session management berbasis refresh token
- ✅ Prisma ORM + PostgreSQL/MySQL
- ✅ Validation dengan Joi
- ✅ Swagger API Docs
- ✅ Middleware terstruktur (auth, error handler, role)
- ✅ Rate limiter otomatis aktif untuk semua request (default: 100 requests per 15 menit per IP).
- ✅ Modular folder structure
- ✅ Command line tools untuk generate secret

## 🚀 Tech Stack

| Layer         | Teknologi              |
| ------------- | ---------------------- |
| Backend       | Node.js + Express      |
| Language      | TypeScript             |
| ORM           | Prisma                 |
| Database      | PostgreSQL, MySQL      |
| Auth          | JWT (access + refresh) |
| Mailer        | Nodemailer             |
| Validation    | Joi                    |
| Documentation | Swagger                |
| Env Config    | dotenv                 |
| Linter/Tools  | ESLint, Prettier, tsup |

## 📦 Instalasi

### 1. Jalankan starter dengan NPX

```bash
npx create-express-ts <nama-project>
cd <nama-project>
```

### 2. Copy dan sesuaikan environment variables

```bash
cp .env.example .env
```

Isi variabel .env sesuai dengan konfigurasi lokalmu:

```bash
PORT=3000

# Aplikasi
APP_NAME=MyApp
NODE_ENV=development
PORT=5000

# CORS
ALLOWED_ORIGINS=http://127.0.0.1:5173,http://localhost:5173,http://127.0.0.1:5000,http://localhost:5000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Email SMTP
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=youremail@example.com
EMAIL_PASS=yourapppassword
CLIENT_URL=http://localhost:5173

# JWT Secret
JWT_SECRET=isi_otomatis_setelah_generate
REFRESH_TOKEN_SECRET=isi_otomatis_setelah_generate
```

### 3. Generate JWT Secrets

```bash
npm run generate:secrets
```

Output

```bash
JWT_SECRET=7f41d3d0e9...
REFRESH_TOKEN_SECRET=1fa8bca4e3...
```

### 4. Install dependency

```bash
npm install
```

### 5. Migrasi database (via Prisma)

```bash
npx prisma migrate dev --name init
```

### 6. Jalankan development server

```bash
npm run dev
```

## 🗂️ Struktur Folder

```bash
src/
├── api
│   └── server.ts # Entry point Express
├── config/
│   ├── env.ts # Env config
│   ├── logger.ts # Logger morgan config
│   └── prisma.ts # Prisma Client
├── error/
│   └── ApiError.ts # ApiError handler
├── middleware/
│   ├── auth.middleware.ts # Auth & JWT middleware
│   ├── error.handler.ts # Global error handler
│   └── role.middleware.ts # Role-based authorization
├── modules/
│   └── auth/
│       ├── auth.controller.ts
│       ├── auth.repository.ts
│       ├── auth.routes.ts
│       ├── auth.service.ts
│       └── auth.validator.ts
├── utils/
│   ├── cookie.ts # Cookie helper
│   ├── cors.ts # Cors helper
│   ├── device.ts # Device helper
│   ├── error.ts # Error helper
│   ├── jwt.ts # Jwt helper
│   ├── limiter.ts # Limiter helper
│   ├── mailer.ts # Mailer helper
│   ├── template.ts # Template helper
│   └── validator.ts # Validator helper
├── views/
│   └── emails/
│       └── verify-email.html # HTML view untuk verifikasi eemail
└── app.ts

```

## 📖 Dokumentasi API (Swagger)
Swagger otomatis tersedia di:

```bash
http://localhost:5000/api/docs
```

## Author
[@irsyamokta ](https://github.com/irsyamokta)  