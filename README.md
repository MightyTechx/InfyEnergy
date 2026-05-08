# Infy Energy - Mobility & Logistics Platform

A modern, scalable platform for mobility services, logistics operations, partner management, and real-time wind energy monitoring built as a full-stack monorepo with React frontend, Express backend, shared interfaces, and multi-tenant support.

[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-green.svg)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.2-purple.svg)](https://www.prisma.io/)
[![MUI](https://img.shields.io/badge/MUI-7.3-blue.svg)](https://mui.com/)
[![NX](https://img.shields.io/badge/NX-22.1-143055.svg)](https://nx.dev/)

---

## Table of Contents

- [Overview](#overview)
- [Platform Features](#platform-features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Docker Setup](#docker-setup)
- [Role-Based Access Control](#role-based-access-control)
- [Authentication & Security](#authentication--security)
- [Customer Categories](#customer-categories)
- [Backend Architecture](#backend-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Component Styling Pattern](#component-styling-pattern)
- [Database Migration Strategy](#database-migration-strategy)
- [Testing](#testing)
- [Development Commands](#development-commands)
- [API Endpoints](#api-endpoints)
- [Technology Stack](#technology-stack)
- [Troubleshooting](#troubleshooting)

---

## Overview

Infy Energy is a comprehensive mobility and logistics platform that connects service providers with customers through a unified digital ecosystem. The platform supports multiple service categories including ride-hailing, logistics, parcel delivery, driver hire, vehicle rental, and various automotive/finance partners.

### Key Features

- **Mobility Services** — Ride-hailing for bikes, autos, cabs, and shuttles
- **Logistics** — Goods transport with Tata Ace, DCM, Lorry, and full-truckload options
- **Parcel Delivery** — Last-mile delivery for documents, food, and goods
- **On-Demand Services** — Driver hire, vehicle rental, and roadside mechanic services
- **Partner Network** — Petrol bunks, EV charging stations, vehicle showrooms, finance, and insurance partners
- **Wind Energy Monitoring** — Real-time SCADA integration for wind turbine and substation monitoring (690V/33kV, 33kV/132kV, 33kV/230kV)
- **Multi-Tenant Architecture** — Support for different partner configurations

### Key Principles

| Principle | Description |
|-----------|-------------|
| **Separation of Concerns** | UI renders, Backend handles logic |
| **Shared Types** | Same interface for FE & BE |
| **External Styles** | No inline styles, all styles in `/styles` folder |
| **Testability** | InMemory gateways for unit tests |
| **Single Responsibility** | One use case = one business operation |

---

## Platform Features

### Service Categories

| Category | Services |
|----------|----------|
| **Mobility** | Bike, Auto Rickshaw, Cab, Shuttle (city & outstation) |
| **Logistics** | Tata Ace, DCM, Lorry, Full-truckload freight |
| **Parcel** | Document, Food, General goods delivery |
| **On-Demand** | Driver Hire, Vehicle Rental, Roadside Mechanic |
| **Automotive** | Petrol Bunks, EV Charging, Vehicle Showrooms |
| **Finance** | Vehicle Finance, Finance Brokers, Insurance Partners |
| **Platform** | Basic App User registration |

### Wind Energy Intelligence

The platform includes a comprehensive SCADA monitoring system for wind energy assets:

- **End-to-End Monitoring** — Turbine → Grid visibility, multi-farm centralized control
- **Energy & Reporting Engine** — Daily/Monthly generation reports, CUF & KPIs
- **Predictive Maintenance** — AI failure prediction, gearbox & blade monitoring
- **Wind Intelligence** — Wind speed tracking, wake loss analysis, forecasting
- **Grid & Compliance** — Voltage control, SLDC/RLDC integration, grid code compliance
- **Automation & Control** — Remote turbine control, alarm & fault system

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  Components │ ←─ │   Mocks     │ ←─ │  Storybook  │         │
│  │  (Dumb UI)  │    │  (Testing)  │    │  (Preview)  │         │
│  └──────┬──────┘    └─────────────┘    └─────────────┘         │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              @infyenergy/interfaces (Shared Types)           ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND (Express)                       │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │ Controllers │ ──▶│  Use Cases  │ ──▶│  Gateways   │         │
│  │  (HTTP)     │    │  (Logic)    │    │  (Data)     │         │
│  └─────────────┘    └─────────────┘    └──────┬──────┘         │
│                                                │                 │
│                          ┌─────────────────────┼────────────┐   │
│                          │                     │            │   │
│                          ▼                     ▼            │   │
│                   ┌─────────────┐       ┌─────────────┐     │   │
│                   │   Prisma    │       │  InMemory   │     │   │
│                   │  (Real DB)  │       │  (Tests)    │     │   │
│                   └─────────────┘       └─────────────┘     │   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
InfyEnergy/
├── gateways/                          # BACKEND (Express API)
│   ├── api/
│   │   ├── admin/                     # Admin API routes
│   │   │   ├── Incident/              # Incident management
│   │   │   ├── TicketType/
│   │   │   ├── ServiceRequest/
│   │   │   ├── AdvisoryRequest/
│   │   │   ├── Configuration/
│   │   │   └── AdminControls/
│   │   ├── auth/                      # Authentication routes
│   │   ├── user/                      # User API routes
│   │   └── consultant/                # Consultant API routes
│   ├── prisma/
│   │   ├── schema.prisma              # Database schema
│   │   ├── prisma.config.ts           # Prisma configuration
│   │   ├── seed.ts                    # Database seeding
│   │   └── migrations/
│   └── src/
│       ├── app.ts                     # Express app setup
│       ├── server.ts                  # Server initialization
│       └── index.ts                   # Entry point
│
├── libs/                              # SHARED LIBRARIES
│   ├── entities/                      # Shared interfaces (FE + BE)
│   │   ├── interfaces/
│   │   │   ├── admin/
│   │   │   ├── user/
│   │   │   └── consultant/
│   │   ├── validations/               # Yup validation schemas
│   │   └── config/partner.ts          # Partner configurations
│   │
│   ├── core/                          # Backend core (BE only)
│   │   ├── use-cases/admin/           # Business logic
│   │   ├── infrastructure/admin/      # Gateway implementations
│   │   ├── middleware/
│   │   ├── database/
│   │   ├── config/
│   │   ├── repository/
│   │   ├── service/
│   │   └── validation/
│   │
│   ├── ui/                            # Frontend (FE only)
│   │   ├── components/                # Shared UI components
│   │   │   ├── Button/
│   │   │   ├── DataTable/
│   │   │   ├── Modal/
│   │   │   ├── TextField/
│   │   │   ├── Select/
│   │   │   ├── Card/
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard/
│   │   │   │   ├── People/
│   │   │   │   └── ...
│   │   │   ├── user/
│   │   │   ├── consultant/
│   │   │   └── shared/
│   │   │       ├── Intro/             # Landing page with SCADA monitoring
│   │   │       ├── SignIn/
│   │   │       ├── SignUp/
│   │   │       ├── ForgotPassword/
│   │   │       ├── Header/
│   │   │       ├── SideNav/
│   │   │       ├── Customer/
│   │   │       ├── Service/
│   │   │       └── ...
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── mocks/                     # Mock data for Storybook & testing
│   │   ├── slices/                    # Redux slices
│   │   ├── store/                     # Redux store
│   │   └── state/                     # State management
│   │
│   ├── theme/                         # Theming system
│   │   ├── createAppMetadata.ts
│   │   ├── palette.ts
│   │   ├── themePalettes.ts
│   │   └── theme.ts
│   ├── shared/                        # Shared constants & types
│   └── services/                      # API service layer
│
├── web/                               # FRONTEND APPLICATIONS
│   └── apps/
│
├── docker-compose.yml                 # Docker services
├── Dockerfile                         # Docker build
├── nx.json                            # NX monorepo config
├── tsconfig.base.json
├── tsconfig.json
├── jest.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+ (or use Docker)
- Redis 7+ (optional, or use Docker)
- npm 9+

### Installation

```bash
# Clone repository
git clone <repository-url>
cd InfyEnergy

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database with test data
npm run prisma:seed
```

### Running the Application

```bash
# Start backend (Express API) — http://localhost:3001
npm run dev:backend

# Start frontend apps
npm run serve:administration        # http://localhost:1600

# Start Storybook (component library)
npm run storybook                   # http://localhost:6006
```

### Port Configuration

| App | Command | Port |
|-----|---------|------|
| **Administration** | `serve:administration` | 1600 |
| **Backend API** | `dev:backend` | 3001 |
| **Storybook** | `storybook` | 6006 |

---

## Docker Setup

Use Docker Compose for local development with PostgreSQL and Redis:

```bash
# Start PostgreSQL and Redis containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f
```

### Docker Services

| Service | Container | Port | Description |
|---------|-----------|------|-------------|
| PostgreSQL | infyenergy-postgres | 5432 | Primary database |
| Redis | infyenergy-redis | 6379 | Caching layer |

### Environment Variables

Create a `.env` file in the project root:

```env
# Server
NODE_ENV=development
PORT=3001
HOST=localhost

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/infyenergy_db?schema=public

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d

# Redis (Optional)
REDIS_HOST=localhost
REDIS_PORT=6379

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=10

# Logging
LOG_LEVEL=debug
LOG_FILE_PATH=./logs
ENABLE_CONSOLE_LOGS=true

# CORS
CORS_ORIGIN=http://localhost:1600

# Email / SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-here
SMTP_FROM=Infy Energy <noreply@infyenergy.com>
```

---

## Role-Based Access Control

Infy Energy implements role-based access control with three primary roles.

### User Roles

| Role | Access Level | Description |
|------|-------------|-------------|
| **Admin** | Full System Access | User management, partner configuration, all platform features, system settings |
| **Consultant** | Partner Access | Partner onboarding, access requests, limited management capabilities |
| **User** | Basic Access | Basic platform features, service access |

### Sign-Up & Role Request Flow

1. **Sign-Up**: Navigate to `/signup`
2. **Role Selection**: Choose between Consultant or Admin (requires approval)
3. **Account Creation**:
   - All users start with **User** role by default
   - Selected role sent as an approval request
4. **Approval Process**:
   - Admin reviews role requests
   - Upon approval, user gains requested role access

---

## Authentication & Security

### JWT-Based Authentication

- Secure token-based authentication
- Password hashing with bcryptjs (salt rounds: 10)
- Token expiration: 7 days (configurable)

### Account Security

- **Account Lockout**: 5 failed login attempts trigger a 30-minute lockout
- **Password Reset**: OTP-based password reset via email
- **OTP Validity**: 10 minutes
- **Rate Limiting**: Prevents multiple OTP requests

### Default Test Credentials (after seeding)

```
admin@infyenergy.com       / admin123
user@infyenergy.com        / user123
consultant@infyenergy.com  / consultant123
```

---

## Customer Categories

### Consultant Onboarding

| Category | Description |
|----------|-------------|
| **Mobility** | Bike, Auto Rickshaw, Cab, and Shuttle services |
| **Logistics** | Tata Ace, DCM, Lorry, and full-truckload freight |
| **Parcel** | Last-mile delivery for documents, food, and goods |

### On-Demand Services

| Category | Description |
|----------|-------------|
| **Driver Hire** | Dedicated drivers for personal, commercial, and fleet use |
| **Vehicle Rental** | Self-drive vehicle booking with daily, weekly, monthly plans |
| **Mechanic Hire** | On-demand roadside repair and emergency breakdown support |

### Automotive Partners

| Category | Description |
|----------|-------------|
| **Petrol Bunk** | Fuel station partners with Petrol, Diesel, and CNG |
| **EV Charging** | Electric vehicle charging stations (AC & DC fast chargers) |
| **Vehicle Showroom** | Dealership and vehicle sales partners |

### Finance Partners

| Category | Description |
|----------|-------------|
| **Vehicle Finance** | Banks and NBFCs offering vehicle loans and EMI plans |
| **Finance Broker** | DSA and loan agents facilitating vehicle financing |
| **Insurance** | Vehicle insurance, health cover, and driver protection plans |

---

## Backend Architecture

### Controller Pattern

Each API endpoint has a controller with DTOs and routes. Validation uses Yup schemas.

```typescript
// Example: TicketType Controller
export class TicketTypeController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = await CreateTicketTypeSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      const result = await this.service.create(validatedData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}
```

### Gateway Pattern

Two implementations of the same interface — one for production, one for tests:

**Prisma Gateway (Production)**
```typescript
export class PrismaHeaderGateway implements IHeaderGateway {
  constructor(private readonly prisma: PrismaClient) {}
  async create(data: ICreateHeaderInput): Promise<IHeader> {
    return this.prisma.adminHeader.create({ data });
  }
}
```

**InMemory Gateway (Testing)**
```typescript
export class InMemoryHeaderGateway implements IHeaderGateway {
  private headers: IHeader[] = [];
  async create(data: ICreateHeaderInput): Promise<IHeader> {
    const header = { id: this.nextId++, ...data };
    this.headers.push(header);
    return header;
  }
}
```

---

## Frontend Architecture

### Dumb UI Components

Components only receive props and render — no business logic inside components.

```typescript
export const JobStatusCard: React.FC<JobStatusCardProps> = ({
  title,
  status,
  priority,
  assignee,
}) => {
  const { classes } = useStyles({
    statusColor: JOB_STATUS_CONFIG[status].color,
  });

  return (
    <Card className={classes.card}>
      <Typography className={classes.title}>{title}</Typography>
    </Card>
  );
};
```

---

## Component Styling Pattern

All components use external styles. **No inline styles allowed.**

### Style File Structure

```
ComponentName/
├── ComponentName.tsx
├── index.ts
└── styles/
    ├── ComponentName.styles.shared.ts   # Base styles
    ├── ComponentName.styles.ts         # useStyles hook (with tenant overrides)
    └── index.ts                        # Exports
```

---

## Database Migration Strategy

### Development Workflow

```bash
# Step 1: Edit schema
# Edit gateways/prisma/schema.prisma

# Step 2: Sync to database (development only)
npm run prisma:migrate

# Step 3: (Optional) View data
npm run prisma:studio
```

### Commands Reference

| Command | When to Use | What It Does |
|---------|-------------|-------------|
| `prisma:migrate` | Development | Pushes schema changes directly to DB |
| `prisma:deploy` | Production | Applies migration to production DB |
| `prisma:reset` | Reset needed | Drops all data and recreates DB |
| `prisma:studio` | Debug/View data | Opens Prisma Studio GUI |
| `prisma:seed` | Initial setup | Seeds DB with test users and data |

---

## Testing

### Backend Testing (Use Cases)

```typescript
import { CreateHeaderUseCase } from '../CreateHeader.usecase';
import { InMemoryHeaderGateway } from '@infyenergy/core/infrastructure';

describe('CreateHeaderUseCase', () => {
  let useCase: CreateHeaderUseCase;
  let gateway: InMemoryHeaderGateway;

  beforeEach(() => {
    gateway = new InMemoryHeaderGateway();
    useCase = new CreateHeaderUseCase(gateway);
  });

  it('should create a header', async () => {
    const result = await useCase.execute({ name: 'Test', ... });
    expect(result.name).toBe('Test');
  });
});
```

### Frontend Testing (Storybook)

```bash
npm run storybook
```

---

## Development Commands

### Backend

```bash
npm run dev:backend              # Start Express server with hot reload
npm run start:backend            # Start without hot reload
npm run build:backend            # Compile TypeScript
```

### Frontend

```bash
npm run serve:administration     # Administration app (http://localhost:1600)
npm run build:administration     # Build Administration app
npm run build:shared             # Build shared libraries
```

### Database (Prisma)

```bash
npm run prisma:generate          # Generate Prisma client
npm run prisma:migrate           # Sync schema to DB (development)
npm run prisma:deploy            # Apply migrations (production)
npm run prisma:reset             # Reset database completely
npm run prisma:studio            # Open Prisma Studio GUI
npm run prisma:seed              # Seed database with test data
```

### Testing & Quality

```bash
npm test                         # Run all tests
npm run test:watch               # Watch mode
npm run test:coverage            # With coverage report
npm run storybook                # Start Storybook
npm run lint                     # Lint code
npm run lint:fix                 # Auto-fix lint issues
npm run format                   # Format with Prettier
npm run type-check               # TypeScript type check
```

---

## API Endpoints

### Base URL & Auth Header

```
http://localhost:3001
```

All protected endpoints require a JWT bearer token:

```
Authorization: Bearer <token>
```

### Auth API

All auth actions use a single **POST** `/api/auth` with an `action` field.

#### Sign In

```json
{ "action": "signin", "email": "admin@infyenergy.com", "password": "admin123" }
```

#### Seeded Test Users

| Email | Password | Role |
|-------|----------|------|
| `admin@infyenergy.com` | `admin123` | admin |
| `user@infyenergy.com` | `user123` | user |
| `consultant@infyenergy.com` | `consultant123` | consultant |

#### Sign Up

```json
{
  "action": "signup",
  "firstName": "John", "lastName": "Doe",
  "email": "john@infyenergy.com",
  "password": "password123", "confirmPassword": "password123",
  "phone": "+1-555-0000",
  "workLocation": "NYC", "department": "IT",
  "role": "user"
}
```

#### Forgot Password

```json
{ "action": "forgot-password", "email": "user@infyenergy.com" }
```

#### Verify OTP

```json
{ "action": "verify-otp", "email": "user@infyenergy.com", "otp": "123456" }
```

#### Reset Password

```json
{
  "action": "reset-password",
  "email": "user@infyenergy.com",
  "resetToken": "jwt-reset-token",
  "newPassword": "newpassword123", "confirmPassword": "newpassword123"
}
```

### Customer Onboarding API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/customer-onboardings` | Get all customer onboardings |
| POST | `/api/admin/customer-onboarding` | Create customer onboarding |
| PUT | `/api/admin/customer-onboarding/:id` | Update customer onboarding |
| PUT | `/api/admin/customer-onboarding/:id/approve` | Approve onboarding |
| PUT | `/api/admin/customer-onboarding/:id/reject` | Reject onboarding |

---

## Technology Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Backend** | Express.js | 4.18 | REST API server |
| **Database** | PostgreSQL | 15 | Data persistence |
| **ORM** | Prisma | 7.2 | Database access |
| **Cache** | Redis | 7 | Caching layer (optional) |
| **Frontend** | React | 19.0 | UI framework |
| **UI Library** | MUI | 7.3 | Component library |
| **State** | Redux Toolkit | 2.10 | State management |
| **Forms** | Formik + Yup | 2.4 | Form handling & validation |
| **Styling** | Emotion + tss-react | 4.9 | CSS-in-JS |
| **Testing** | Jest | 30 | Unit testing |
| **Docs** | Storybook | 10.1 | Component documentation |
| **Build** | Webpack + NX | 22.1 | Build tooling |
| **Auth** | bcryptjs + JWT | 3.0 / 9.0 | Authentication & password hashing |
| **Email** | Nodemailer | 7.0 | OTP & transactional emails |
| **Language** | TypeScript | 5.9 | Type safety |

---

## Troubleshooting

### Email/OTP Not Sending

**Development Mode**: OTP is printed to console for testing without SMTP configuration.

### Database Connection Issues

```bash
docker-compose up -d
npm run prisma:migrate
npm run prisma:generate
```

### Build Errors

```bash
rm -rf node_modules .nx dist
npm install
npm run prisma:generate
npx nx reset
```

---

## License

MIT

---

**Last Updated:** May 2026