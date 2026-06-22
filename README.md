# Scorevant Backend

Scorevant is a professional-grade officiating assistant, tournament management platform, and live scoring system built specifically for modern racket sports (Badminton, Tennis, Table Tennis, Squash, and Pickleball). 

This repository contains the high-performance **NestJS backend REST API** that powers the entire Scorevant ecosystem.

---

## Key Features

### 🔐 Authentication & Security
- Secure user registration and authentication flow.
- JWT-based authentication via Passport strategies.
- Passwords secured using `bcrypt` hashing with salt rounds.
- Security hardening using `helmet` headers and rate-limiting using `@nestjs/throttler`.

### 🏆 Tournament Administration
- Create and manage tournaments, configure sport types, sets parameters, and configure participant rosters.
- Dynamic automated brackets generation.
- Real-time score recording and match progression handlers.

### 🏸 Court & Queue Management
- Interactive court layout mapping and assignment.
- Referee/umpire allocation tracking.
- Court standby queuing logic to keep tournaments moving smoothly.

---

## Technology Stack

| Category | Technology |
|---|---|
| **Framework** | NestJS (v11) |
| **Runtime** | Node.js |
| **Language** | TypeScript |
| **Database** | MongoDB |
| **ODM** | Mongoose |
| **Authentication** | Passport.js + JWT |
| **Security** | Helmet + NestJS Throttler |

---

## Database Architecture

Scorevant Backend is backed by MongoDB with structural schemas managed by Mongoose:
- **`UserSchema`**: User profile credentials and authentication records.
- **`TournamentSchema`**: Event configurations, sport rules, set caps, and metadata.
- **`EntrantSchema`**: Tournament entries, seeding, and competitor references.
- **`TournamentMatchSchema`**: Individual match fixtures, schedules, real-time set-by-set scores, and winner designations.
- **`CourtSchema`**: Venue resources, current court occupancy, referee assignments, and active matches.
- **`UmpireSchema`** & **`RefereeProfileSchema`**: Officiator attributes and match logging contexts.

---

## API Documentation

### 🔑 Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | No |
| `POST` | `/auth/login` | Log in and receive a JWT access token | No |
| `GET` | `/auth/me` | Fetch active user profile details | Yes (Bearer Token) |

### 🏆 Tournaments (`/tournaments`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/tournaments` | Create a new tournament configuration | Yes |
| `GET` | `/tournaments` | Get all tournaments managed by the user | Yes |
| `GET` | `/tournaments/:id` | Get comprehensive details of a specific tournament | Yes |
| `POST` | `/tournaments/:id/generate-bracket` | Generate automated match brackets/draws | Yes |
| `PUT` | `/tournaments/matches/:matchId` | Update match status, score progress, or winners | Yes |

### 🏸 Courts (`/courts`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/courts` | Register a new court for tournament matches | Yes |
| `GET` | `/courts` | Retrieve all registered courts and status | Yes |
| `GET` | `/courts/queue` | Get the queue of matches waiting for a court assignment | Yes |
| `PUT` | `/courts/:id/assign` | Assign a tournament match to a specific court | Yes |
| `PUT` | `/courts/:id/free` | Mark a court as free/available and de-allocate it | Yes |

---

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- MongoDB instance (either local or cloud-hosted instance)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Scorevant-Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/scorevant
   JWT_SECRET=your-jwt-secret-at-least-32-chars
   FRONTEND_URL=http://localhost:5173
   ```

---

## Running the Server

```bash
# development mode (with watch mode enabled)
$ npm run start:dev

# production mode (build first)
$ npm run build
$ npm run start:prod
```

---

## Code Quality

```bash
# Run ESLint validation
$ npm run lint

# Run Unit Tests
$ npm run test
```

## License

This project is licensed under the MIT License.