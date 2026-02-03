# MAIVS – Mobile Asset Identification & Verification System

**A Comprehensive Demo System for Reducing Mobile Phone Theft Through Smart Verification**

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Solution Overview](#3-solution-overview)
4. [Core Objectives](#4-core-objectives)
5. [Demo Scope & Limitations](#5-demo-scope--limitations)
6. [System Architecture](#6-system-architecture)
7. [User Roles & Capabilities](#7-user-roles--capabilities)
8. [Technology Stack](#8-technology-stack)
9. [Project Structure](#9-project-structure)
10. [Data Management Strategy](#10-data-management-strategy)
11. [Core System Workflows](#11-core-system-workflows)
12. [Security & Privacy Measures](#12-security--privacy-measures)
13. [Benefits & Impact](#13-benefits--impact)
14. [Current Limitations](#14-current-limitations)
15. [Future Roadmap](#15-future-roadmap)
16. [Implementation Guidelines](#16-implementation-guidelines)
17. [Conclusion](#17-conclusion)

---

## 1. Executive Summary

**MAIVS** (Mobile Asset Identification & Verification System) is a proof-of-concept web-based platform designed to combat mobile phone theft by eliminating the ease of reselling stolen devices. The system introduces a centralized IMEI-based ownership registry that enables:

- **Citizens** to register and protect their devices
- **Shopkeepers** to verify device legitimacy before purchase
- **Law Enforcement** to track stolen devices and identify criminals
- **System Administrators** to maintain platform integrity

By making stolen phones difficult to resell, MAIVS addresses the root economic incentive behind mobile phone snatching, creating a safer ecosystem for all stakeholders.

### Key Innovation

Unlike traditional approaches that rely solely on post-theft recovery, MAIVS **prevents theft by eliminating the resale market** through mandatory ownership verification and controlled transfer mechanisms.

---

## 2. Problem Statement

### Current Challenges

Mobile phone theft remains a persistent problem in urban areas due to several systemic vulnerabilities:

#### 2.1 Easy Resale of Stolen Devices
- No centralized verification system exists for ownership validation
- Stolen phones can be sold quickly through informal markets
- Buyers have no reliable method to verify device legitimacy
- IMEI numbers are rarely checked during transactions

#### 2.2 Lack of Coordination
- Citizens, retailers, and law enforcement operate in isolation
- No real-time information sharing about stolen devices
- Police investigations are reactive rather than preventive
- FIR (First Information Report) filing has limited practical impact

#### 2.3 Economic Incentive for Crime
- High resale value with low risk creates strong criminal motivation
- Thieves face minimal barriers to converting stolen goods to cash
- Repeat offenses are common due to lucrative returns

### Impact Statistics

While this is a demo system, real-world mobile theft typically results in:
- Significant financial loss for victims
- Personal data compromise
- Emotional distress and sense of violation
- Wasted police resources on difficult-to-solve cases
- Perpetuation of organized crime networks

---

## 3. Solution Overview

MAIVS introduces a **multi-layered verification ecosystem** that transforms how mobile devices are bought, sold, and tracked.

### Core Concept

Every mobile device is tied to its legitimate owner through IMEI registration. Any ownership transfer requires:

1. **Owner Authentication** – Current owner must authorize the sale
2. **OTP Verification** – Two-factor confirmation for transfers
3. **Status Check** – Automatic screening against stolen device database
4. **Transaction Logging** – Complete audit trail for all transfers

### How It Works

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Citizen   │────────▶│    MAIVS     │◀────────│ Shopkeeper  │
│  (Owner)    │         │   Platform   │         │  (Buyer)    │
└─────────────┘         └──────────────┘         └─────────────┘
                               │
                               │
                        ┌──────┴──────┐
                        │             │
                   ┌────▼────┐   ┌────▼────┐
                   │ Police  │   │  Admin  │
                   │  View   │   │  Panel  │
                   └─────────┘   └─────────┘
```

### Value Proposition

**For Citizens:**
- Device theft becomes financially pointless for criminals
- Buyers are protected from purchasing stolen goods
- Peace of mind through ownership verification

**For Law Enforcement:**
- Real-time alerts on resale attempts of stolen devices
- Data-driven investigation capabilities
- Potential trap mechanisms to catch thieves

**For Retailers:**
- Legal protection against dealing in stolen goods
- Customer trust through verified transactions
- Compliance with potential future regulations

---

## 4. Core Objectives

### Primary Goals

1. **Crime Prevention**
   - Reduce mobile phone snatching by eliminating the resale market
   - Create economic disincentive for theft
   - Protect citizens from becoming victims

2. **Buyer Protection**
   - Enable verification of device legitimacy before purchase
   - Prevent innocent buyers from unknowingly purchasing stolen goods
   - Build consumer confidence in second-hand mobile market

3. **Law Enforcement Support**
   - Provide actionable intelligence on stolen device movements
   - Enable trap operations when thieves attempt resale
   - Create comprehensive device ownership audit trails

4. **Controlled Ownership Transfer**
   - Implement secure, verified transfer mechanisms
   - Maintain complete ownership history
   - Prevent unauthorized transfers

5. **Feasibility Demonstration**
   - Prove concept viability using dummy data
   - Showcase complete end-to-end workflows
   - Provide foundation for government-scale implementation

---

## 5. Demo Scope & Limitations

### What This Demo Includes

✅ **Complete User Workflows**
- Phone registration and ownership linking
- Theft reporting with FIR generation
- IMEI verification at point of sale
- OTP-based ownership transfer
- Police dashboard for stolen device tracking

✅ **Role-Based Access**
- Citizen portal
- Shopkeeper verification tools
- Police investigation interface
- System administration panel

✅ **Simulated Real-World Logic**
- OTP generation and validation (simulated)
- FIR creation and tracking (dummy data)
- Status-based transaction blocking
- Ownership history logging

✅ **Data Security Concepts**
- IMEI-CNIC linking
- Multi-factor verification flows
- Audit trail maintenance

### What This Demo Does NOT Include

❌ **Real Infrastructure Integration**
- No actual telecom operator connectivity
- No real IMEI blocking at network level
- No connection to national CNIC database
- No integration with police FIR systems

❌ **Live Tracking & Enforcement**
- No GPS-based device location tracking
- No remote device locking/wiping
- No real SMS/OTP delivery
- No actual arrest coordination

❌ **Production-Level Features**
- No biometric authentication
- No payment processing
- No advanced fraud detection AI
- No nationwide database scaling

### Why These Limitations Exist

This is intentionally designed as a **safe, controlled demonstration** that:
- Uses completely fictional data to avoid privacy concerns
- Operates independently without affecting real systems
- Can be presented without legal/regulatory approval
- Focuses on proving the concept rather than production deployment

**Every workflow is logically complete and mirrors real-world behavior**, providing a solid foundation for future implementation.

---

## 6. System Architecture

### 6.1 High-Level Architecture

```
┌────────────────────────────────────────────────────────────┐
│                     Presentation Layer                      │
├────────────────────────────┬───────────────────────────────┤
│     User Web App           │      Admin Web App            │
│  (Citizens & Shopkeepers)  │   (Police & System Admin)     │
│       Next.js + TS         │       Next.js + TS            │
└─────────────┬──────────────┴──────────────┬────────────────┘
              │                              │
              │         API Calls            │
              │                              │
┌─────────────▼──────────────────────────────▼────────────────┐
│                      Application Layer                       │
│                   Node.js + Express + TS                     │
├──────────────────────────────────────────────────────────────┤
│  Controllers  │  Routes  │  Middleware  │  Business Logic   │
└─────────────┬────────────────────────────────────────────────┘
              │
              │         Database Queries
              │
┌─────────────▼────────────────────────────────────────────────┐
│                        Data Layer                             │
│                    MongoDB (Dummy Data)                       │
├───────────────────────────────────────────────────────────────┤
│   Devices   │   Owners   │   FIRs   │   Transactions         │
└───────────────────────────────────────────────────────────────┘
```

### 6.2 Application Separation

The system consists of **two distinct web applications** sharing a common backend:

#### User Web Application
**Purpose:** Interface for citizens and shopkeepers  
**Access:** Public (with authentication)  
**Key Features:**
- Device registration
- Ownership verification
- Theft reporting
- Resale management

#### Admin Web Application
**Purpose:** Interface for police and system administrators  
**Access:** Restricted (role-based)  
**Key Features:**
- Stolen device monitoring
- FIR record access
- Transaction history review
- System analytics

### 6.3 Backend Architecture

**Shared API Layer** serving both applications with:
- RESTful endpoints
- Role-based access control
- Request validation
- Error handling
- Logging

### 6.4 Data Flow Example: Phone Registration

```
User Input (IMEI + CNIC)
         │
         ▼
  API Validation
         │
         ▼
  Check Existing Records
         │
         ▼
   Create/Update Device
         │
         ▼
   Link to Owner
         │
         ▼
  Return Confirmation
```

---

## 7. User Roles & Capabilities

### 7.1 Citizen (User Site)

**Primary Users:** Mobile phone owners

**Capabilities:**

| Feature | Description |
|---------|-------------|
| **Register Device** | Link phone to CNIC using IMEI number |
| **View Owned Devices** | Dashboard showing all registered phones |
| **Report Theft** | Mark device as stolen, generate FIR record |
| **Approve Resale** | Receive OTP when someone attempts to buy their phone |
| **Transfer Ownership** | Authorize legitimate sales with verification |
| **View History** | Track ownership and transaction history |

**User Journey:**
1. Register account with CNIC
2. Add device(s) using IMEI
3. Receive protection benefits
4. Report theft if needed
5. Control ownership transfers

---

### 7.2 Shopkeeper (User Site)

**Primary Users:** Mobile phone retailers and second-hand dealers

**Capabilities:**

| Feature | Description |
|---------|-------------|
| **Verify IMEI** | Check device status before purchase |
| **View Device Details** | Access ownership and theft status |
| **Initiate Purchase** | Start verified ownership transfer process |
| **Receive Alerts** | Get warnings about stolen devices |
| **Transaction Records** | Maintain purchase history for compliance |

**User Journey:**
1. Customer brings phone for sale
2. Enter IMEI for verification
3. System shows device status
4. If clean, initiate purchase request
5. OTP sent to current owner
6. Complete transaction upon approval

**Benefits:**
- Legal protection from dealing in stolen goods
- Customer trust building
- Compliance documentation

---

### 7.3 Police Officer (Admin Site)

**Primary Users:** Law enforcement investigators

**Capabilities:**

| Feature | Description |
|---------|-------------|
| **Stolen Device Database** | Search and filter reported thefts |
| **FIR Records** | Access detailed theft reports |
| **Resale Alerts** | Monitor attempts to sell stolen devices |
| **Device Tracking** | View ownership history and transfers |
| **Suspect Identification** | Analyze patterns in resale attempts |
| **Evidence Collection** | Export data for investigations |

**Use Cases:**

**Reactive Investigation:**
- Search for specific stolen IMEI
- Review FIR details
- Track device history

**Proactive Monitoring:**
- View recent resale attempts of stolen devices
- Identify potential trap opportunities
- Analyze crime patterns

**Trap Operation:**
```
Stolen Phone Reported
        ↓
Thief Attempts Resale at Shop
        ↓
System Alerts Police
        ↓
Police Coordinate with Shop
        ↓
Apprehension at Transaction
```

---

### 7.4 System Administrator (Admin Site)

**Primary Users:** Platform maintainers and government officials

**Capabilities:**

| Feature | Description |
|---------|-------------|
| **Data Management** | Add, edit, remove dummy data |
| **User Management** | Control access and permissions |
| **System Analytics** | View usage statistics and trends |
| **Override Functions** | Manual intervention in edge cases |
| **Audit Logs** | Monitor all system activities |
| **Configuration** | Adjust system parameters |

**Responsibilities:**
- Maintain data integrity
- Monitor system health
- Generate reports for stakeholders
- Handle exceptional cases
- Ensure platform security

---

## 8. Technology Stack

### 8.1 Frontend

**Framework:** Next.js 14+ (App Router)

**Language:** TypeScript

**Styling:** Tailwind CSS

**UI Components:**
- Custom components for device cards
- Modal dialogs for OTP entry
- Status badges and alerts
- Responsive tables and forms

**State Management:**
- React hooks (useState, useEffect)
- Context API for global state
- API service layer abstraction

**Key Libraries:**
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.0.0"
}
```

---

### 8.2 Backend

**Runtime:** Node.js 18+

**Framework:** Express.js

**Language:** TypeScript

**Key Features:**
- RESTful API design
- Middleware for authentication
- Request validation
- Error handling
- CORS configuration

**Core Libraries:**
```json
{
  "express": "^4.18.0",
  "typescript": "^5.0.0",
  "mongoose": "^8.0.0",
  "dotenv": "^16.0.0",
  "cors": "^2.8.5"
}
```

---

### 8.3 Database

**Database:** MongoDB

**ODM:** Mongoose

**Data Strategy:** Pre-seeded dummy data

**Collections:**
- `devices` – Phone records
- `owners` – User information
- `firs` – Theft reports
- `transactions` – Ownership transfers
- `resale_attempts` – Purchase requests

**Why MongoDB?**
- Flexible schema for demo iteration
- Easy JSON data seeding
- Document model fits use case
- Fast development cycle

---

### 8.4 Development Tools

**Version Control:** Git

**Code Quality:**
- ESLint for linting
- Prettier for formatting
- TypeScript for type safety

**Development:**
- Hot reload for rapid iteration
- Environment variable management
- Separate dev/prod configurations

---

## 9. Project Structure

### 9.1 User Web Application

```
user-app/
├── public/
│   ├── images/
│   │   └── logo.svg
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Home page
│   │   ├── register/
│   │   │   └── page.tsx              # Device registration
│   │   ├── my-devices/
│   │   │   └── page.tsx              # User's device list
│   │   ├── report-theft/
│   │   │   └── page.tsx              # Theft reporting
│   │   ├── verify/
│   │   │   └── page.tsx              # IMEI verification
│   │   └── resale/
│   │       └── page.tsx              # Resale management
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Badge.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── device/
│   │   │   ├── DeviceCard.tsx
│   │   │   ├── DeviceList.tsx
│   │   │   └── DeviceStatus.tsx
│   │   └── modals/
│   │       ├── OTPModal.tsx
│   │       ├── ConfirmModal.tsx
│   │       └── AlertModal.tsx
│   │
│   ├── services/
│   │   ├── api.ts                    # API client
│   │   ├── device.service.ts         # Device operations
│   │   ├── owner.service.ts          # Owner operations
│   │   └── auth.service.ts           # Authentication
│   │
│   ├── types/
│   │   ├── device.ts
│   │   ├── owner.ts
│   │   ├── fir.ts
│   │   └── transaction.ts
│   │
│   ├── utils/
│   │   ├── validators.ts             # Input validation
│   │   ├── formatters.ts             # Data formatting
│   │   └── constants.ts              # App constants
│   │
│   └── styles/
│       └── globals.css               # Global styles
│
├── .env.local                         # Environment variables
├── next.config.js                     # Next.js configuration
├── tailwind.config.js                 # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Dependencies
```

---

### 9.2 Admin Web Application

```
admin-app/
├── public/
│   └── assets/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Admin dashboard
│   │   ├── stolen-devices/
│   │   │   └── page.tsx              # Stolen device list
│   │   ├── fir-records/
│   │   │   └── page.tsx              # FIR management
│   │   ├── device-lookup/
│   │   │   └── page.tsx              # Device search
│   │   ├── resale-alerts/
│   │   │   └── page.tsx              # Suspicious activities
│   │   └── analytics/
│   │       └── page.tsx              # System statistics
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   └── [shared components]
│   │   ├── tables/
│   │   │   ├── DeviceTable.tsx
│   │   │   ├── FIRTable.tsx
│   │   │   └── AlertTable.tsx
│   │   ├── charts/
│   │   │   ├── TheftTrends.tsx
│   │   │   └── Statistics.tsx
│   │   └── details/
│   │       ├── DeviceDetails.tsx
│   │       ├── FIRDetails.tsx
│   │       └── OwnerDetails.tsx
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── police.service.ts
│   │   └── admin.service.ts
│   │
│   ├── types/
│   │   └── [shared types]
│   │
│   └── utils/
│       └── [utility functions]
│
└── [config files]
```

---

### 9.3 Backend Server

```
backend/
├── src/
│   ├── controllers/
│   │   ├── device.controller.ts      # Device CRUD operations
│   │   ├── owner.controller.ts       # Owner management
│   │   ├── fir.controller.ts         # FIR handling
│   │   ├── resale.controller.ts      # Resale logic
│   │   └── admin.controller.ts       # Admin operations
│   │
│   ├── routes/
│   │   ├── device.routes.ts
│   │   ├── owner.routes.ts
│   │   ├── fir.routes.ts
│   │   ├── resale.routes.ts
│   │   └── admin.routes.ts
│   │
│   ├── models/
│   │   ├── Device.ts                 # Mongoose schema
│   │   ├── Owner.ts
│   │   ├── FIR.ts
│   │   ├── Transaction.ts
│   │   └── ResaleAttempt.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts        # Authentication
│   │   ├── validation.middleware.ts  # Input validation
│   │   ├── error.middleware.ts       # Error handling
│   │   └── logger.middleware.ts      # Request logging
│   │
│   ├── services/
│   │   ├── otp.service.ts            # OTP generation (dummy)
│   │   ├── notification.service.ts   # Notifications (dummy)
│   │   └── validation.service.ts     # Business logic validation
│   │
│   ├── utils/
│   │   ├── helpers.ts
│   │   ├── constants.ts
│   │   └── validators.ts
│   │
│   ├── config/
│   │   ├── database.ts               # MongoDB connection
│   │   └── env.ts                    # Environment config
│   │
│   └── data/
│       ├── seed.ts                   # Database seeding script
│       ├── devices.json              # Dummy device data
│       ├── owners.json               # Dummy owner data
│       └── firs.json                 # Dummy FIR data
│
├── server.ts                          # Application entry point
├── .env                               # Environment variables
├── tsconfig.json
└── package.json
```

---

## 10. Data Management Strategy

### 10.1 Dummy Data Philosophy

All data in this demo is **completely fictional** and pre-seeded to enable:
- Safe demonstration without privacy concerns
- Predictable testing scenarios
- Quick setup and deployment
- Showcase of complete workflows

**No real personal information is used or required.**

---

### 10.2 Data Models

#### Device Model
```typescript
interface Device {
  _id: string;
  imei: string;                    // 15-digit unique identifier
  brand: string;                   // e.g., "Samsung", "Apple"
  model: string;                   // e.g., "Galaxy S23", "iPhone 14"
  ownerCNIC: string;               // Current owner's CNIC
  status: DeviceStatus;            // Active | Stolen | Under Investigation
  registrationDate: Date;
  lastVerified: Date;
  ownershipHistory: Ownership[];
}

enum DeviceStatus {
  Active = "Active",
  Stolen = "Stolen",
  UnderInvestigation = "Under Investigation",
  Recovered = "Recovered"
}
```

#### Owner Model
```typescript
interface Owner {
  _id: string;
  cnic: string;                    // 13-digit CNIC number (dummy)
  name: string;
  phoneNumber: string;             // Contact number
  email: string;
  ownedDevices: string[];          // Array of IMEIs
  registrationDate: Date;
}
```

#### FIR Model
```typescript
interface FIR {
  _id: string;
  firNumber: string;               // Unique FIR identifier
  imei: string;                    // Stolen device IMEI
  ownerCNIC: string;
  reportDate: Date;
  policeStation: string;
  status: FIRStatus;               // Filed | Under Investigation | Closed
  description: string;
  officerAssigned?: string;
}

enum FIRStatus {
  Filed = "Filed",
  UnderInvestigation = "Under Investigation",
  Closed = "Closed",
  DeviceRecovered = "Device Recovered"
}
```

#### Transaction Model
```typescript
interface Transaction {
  _id: string;
  imei: string;
  fromCNIC: string;                // Previous owner
  toCNIC: string;                  // New owner
  transactionDate: Date;
  otpVerified: boolean;
  shopkeeperCNIC?: string;         // If sold through shop
  status: TransactionStatus;
}

enum TransactionStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  Cancelled = "Cancelled"
}
```

#### Resale Attempt Model
```typescript
interface ResaleAttempt {
  _id: string;
  imei: string;
  shopkeeperCNIC: string;
  attemptDate: Date;
  deviceStatus: DeviceStatus;      // Status at time of attempt
  flagged: boolean;                // If device was stolen
  policeNotified: boolean;
  outcome?: string;
}
```

---

### 10.3 Sample Dummy Data

#### Sample Devices (`data/devices.json`)
```json
[
  {
    "imei": "352046097653210",
    "brand": "Samsung",
    "model": "Galaxy S23",
    "ownerCNIC": "4210155667788",
    "status": "Active",
    "registrationDate": "2024-01-15T10:30:00Z"
  },
  {
    "imei": "358240051111110",
    "brand": "Apple",
    "model": "iPhone 14 Pro",
    "ownerCNIC": "4210166778899",
    "status": "Stolen",
    "registrationDate": "2023-11-20T14:20:00Z"
  }
]
```

#### Sample Owners (`data/owners.json`)
```json
[
  {
    "cnic": "4210155667788",
    "name": "Ahmed Hassan",
    "phoneNumber": "+92-300-1234567",
    "email": "ahmed.hassan@example.com",
    "ownedDevices": ["352046097653210"]
  },
  {
    "cnic": "4210166778899",
    "name": "Fatima Khan",
    "phoneNumber": "+92-321-9876543",
    "email": "fatima.khan@example.com",
    "ownedDevices": ["358240051111110"]
  }
]
```

#### Sample FIRs (`data/firs.json`)
```json
[
  {
    "firNumber": "FIR-2024-001",
    "imei": "358240051111110",
    "ownerCNIC": "4210166778899",
    "reportDate": "2024-01-25T09:15:00Z",
    "policeStation": "Saddar Police Station",
    "status": "Under Investigation",
    "description": "Phone snatched near market area"
  }
]
```

---

### 10.4 Database Seeding

**Seeding Script** (`backend/src/data/seed.ts`):
```typescript
import mongoose from 'mongoose';
import Device from '../models/Device';
import Owner from '../models/Owner';
import FIR from '../models/FIR';
import devicesData from './devices.json';
import ownersData from './owners.json';
import firsData from './firs.json';

async function seedDatabase() {
  try {
    // Clear existing data
    await Device.deleteMany({});
    await Owner.deleteMany({});
    await FIR.deleteMany({});
    
    // Insert dummy data
    await Device.insertMany(devicesData);
    await Owner.insertMany(ownersData);
    await FIR.insertMany(firsData);
    
    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
```

**Run seeding:**
```bash
npm run seed
```

---

## 11. Core System Workflows

### 11.1 Phone Registration Workflow

**Scenario:** A citizen wants to register their newly purchased phone.

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1: User Authentication                                 │
├─────────────────────────────────────────────────────────────┤
│ • User logs in with CNIC                                    │
│ • System validates credentials                              │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 2: IMEI Entry                                          │
├─────────────────────────────────────────────────────────────┤
│ • User enters 15-digit IMEI                                 │
│ • User provides device brand and model                      │
│ • Optional: Upload purchase receipt                         │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 3: Validation                                          │
├─────────────────────────────────────────────────────────────┤
│ • System checks IMEI format (15 digits)                     │
│ • Checks if IMEI already exists                             │
│ • Verifies IMEI not marked as stolen                        │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 4: Registration                                        │
├─────────────────────────────────────────────────────────────┤
│ • Create/Update device record                               │
│ • Link device to user's CNIC                                │
│ • Set status as "Active"                                    │
│ • Log ownership in history                                  │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 5: Confirmation                                        │
├─────────────────────────────────────────────────────────────┤
│ • Display success message                                   │
│ • Show device in "My Devices" dashboard                     │
│ • Send confirmation notification (dummy)                    │
└─────────────────────────────────────────────────────────────┘
```

**API Endpoint:**
```
POST /api/devices/register
Body: {
  "cnic": "4210155667788",
  "imei": "352046097653210",
  "brand": "Samsung",
  "model": "Galaxy S23"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Device registered successfully",
  "device": {
    "imei": "352046097653210",
    "status": "Active",
    "registrationDate": "2024-01-31T10:00:00Z"
  }
}
```

---

### 11.2 Theft Reporting Workflow

**Scenario:** A user's phone has been stolen and they want to report it.

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1: Access Report Form                                  │
├─────────────────────────────────────────────────────────────┤
│ • User navigates to "Report Theft"                          │
│ • Selects device from their registered devices              │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 2: Theft Details                                       │
├─────────────────────────────────────────────────────────────┤
│ • Date and time of theft                                    │
│ • Location of incident                                      │
│ • Description of circumstances                              │
│ • Preferred police station                                  │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 3: FIR Generation (Simulated)                          │
├─────────────────────────────────────────────────────────────┤
│ • System generates unique FIR number                        │
│ • Creates FIR record with details                           │
│ • Status set to "Filed"                                     │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 4: Device Status Update                                │
├─────────────────────────────────────────────────────────────┤
│ • Change device status from "Active" to "Stolen"            │
│ • Add theft flag to device record                           │
│ • Log event in device history                               │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 5: Police Dashboard Update                             │
├─────────────────────────────────────────────────────────────┤
│ • Device appears in police stolen devices list              │
│ • FIR accessible to law enforcement                         │
│ • Alert system activated for resale attempts                │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 6: User Confirmation                                   │
├─────────────────────────────────────────────────────────────┤
│ • Display FIR number to user                                │
│ • Provide instructions for police station visit (dummy)     │
│ • Send confirmation notification                            │
└─────────────────────────────────────────────────────────────┘
```

**API Endpoint:**
```
POST /api/devices/report-theft
Body: {
  "imei": "358240051111110",
  "cnic": "4210166778899",
  "theftDate": "2024-01-25T15:30:00Z",
  "location": "Main Market, Saddar",
  "description": "Phone snatched by two motorcyclists",
  "policeStation": "Saddar Police Station"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Theft reported successfully",
  "fir": {
    "firNumber": "FIR-2024-042",
    "status": "Filed",
    "deviceStatus": "Stolen"
  }
}
```

**Impact:**
- Device becomes unsellable through the system
- Any resale attempt triggers immediate alert
- Police can proactively monitor for trap opportunities

---

### 11.3 IMEI Verification Workflow (Shopkeeper)

**Scenario:** A customer wants to sell their used phone to a shop.

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1: Customer Brings Phone                               │
├─────────────────────────────────────────────────────────────┤
│ • Shopkeeper opens verification interface                   │
│ • Requests IMEI from customer                               │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 2: IMEI Lookup                                         │
├─────────────────────────────────────────────────────────────┤
│ • Shopkeeper enters IMEI number                             │
│ • System queries device database                            │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 3: Status Check                                        │
├─────────────────────────────────────────────────────────────┤
│ • Retrieve device status                                    │
│ • Check for theft reports                                   │
│ • Check for pending FIRs                                    │
└─────────────────────────────────────────────────────────────┘
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
    ┌────────────────┐      ┌────────────────┐
    │ Status: STOLEN │      │ Status: ACTIVE │
    └────────────────┘      └────────────────┘
             │                       │
             ▼                       ▼
┌──────────────────────┐  ┌──────────────────────┐
│ ALERT DISPLAY        │  │ SAFE TO PROCEED      │
├──────────────────────┤  ├──────────────────────┤
│ • Red warning shown  │  │ • Green status shown │
│ • FIR details        │  │ • Owner info shown   │
│ • Police contact     │  │ • Can initiate       │
│ • DO NOT PURCHASE    │  │   resale process     │
└──────────────────────┘  └──────────────────────┘
```

**API Endpoint:**
```
GET /api/devices/verify/:imei
```

**Response (Clean Device):**
```json
{
  "success": true,
  "device": {
    "imei": "352046097653210",
    "brand": "Samsung",
    "model": "Galaxy S23",
    "status": "Active",
    "ownerName": "Ahmed H.", // Partially masked
    "registrationDate": "2024-01-15",
    "safeToTransact": true
  }
}
```

**Response (Stolen Device):**
```json
{
  "success": true,
  "device": {
    "imei": "358240051111110",
    "brand": "Apple",
    "model": "iPhone 14 Pro",
    "status": "Stolen",
    "firNumber": "FIR-2024-001",
    "reportDate": "2024-01-25",
    "safeToTransact": false
  },
  "alert": {
    "severity": "HIGH",
    "message": "This device has been reported stolen. Do not proceed with purchase.",
    "action": "Contact local police immediately"
  }
}
```

**Shopkeeper Actions:**

**If Clean:**
- Proceed to resale workflow
- Initiate ownership transfer

**If Stolen:**
- Refuse purchase
- Inform customer about theft status
- Optionally notify police (in real implementation)
- Log suspicious attempt

---

### 11.4 Controlled Resale with OTP Workflow

**Scenario:** Legitimate owner wants to sell their phone through a shop.

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1: Initial Verification                                │
├─────────────────────────────────────────────────────────────┤
│ • Shopkeeper verifies IMEI (Status: Active)                 │
│ • Device shows as safe to transact                          │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 2: Initiate Purchase Request                           │
├─────────────────────────────────────────────────────────────┤
│ • Shopkeeper clicks "Initiate Purchase"                     │
│ • Enters their CNIC (shopkeeper registration)               │
│ • Confirms device details                                   │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 3: OTP Generation (Simulated)                          │
├─────────────────────────────────────────────────────────────┤
│ • System generates 6-digit OTP                              │
│ • Sends to current owner's registered number (dummy)        │
│ • Creates pending transaction record                        │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 4: Seller Receives OTP                                 │
├─────────────────────────────────────────────────────────────┤
│ • Current owner receives notification (simulated)           │
│ • Views transaction request details                         │
│ • Decides to approve or reject                              │
└─────────────────────────────────────────────────────────────┘
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
    ┌────────────────┐      ┌────────────────┐
    │ OWNER APPROVES │      │ OWNER REJECTS  │
    └────────────────┘      └────────────────┘
             │                       │
             ▼                       ▼
┌──────────────────────┐  ┌──────────────────────┐
│ Step 5A: Verify OTP  │  │ Step 5B: Cancel      │
├──────────────────────┤  ├──────────────────────┤
│ • Owner provides OTP │  │ • Transaction marked │
│   to shopkeeper      │  │   as rejected        │
│ • Shopkeeper enters  │  │ • Shopkeeper         │
│   OTP in system      │  │   notified           │
└──────────────────────┘  └──────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 6: Ownership Transfer                                  │
├─────────────────────────────────────────────────────────────┤
│ • OTP validated successfully                                │
│ • Device ownership updated to buyer's CNIC                  │
│ • Ownership history logged                                  │
│ • Transaction marked as completed                           │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 7: Confirmation                                        │
├─────────────────────────────────────────────────────────────┤
│ • Both parties receive confirmation (simulated)             │
│ • Device appears in buyer's "My Devices"                    │
│ • Shopkeeper completes payment to seller                    │
└─────────────────────────────────────────────────────────────┘
```

**API Endpoints:**

**Initiate Purchase:**
```
POST /api/resale/initiate
Body: {
  "imei": "352046097653210",
  "shopkeeperCNIC": "4210177889900",
  "buyerCNIC": "4210188990011"
}
```

**Verify OTP:**
```
POST /api/resale/verify-otp
Body: {
  "transactionId": "TXN-2024-123",
  "otp": "123456"
}
```

**Key Security Features:**
- Owner must explicitly approve sale
- OTP expires after 10 minutes (configurable)
- Transaction can be rejected by owner
- Complete audit trail maintained
- Prevents unauthorized transfers

---

### 11.5 Police Trap Scenario

**Scenario:** Thief attempts to sell stolen phone, triggering a trap opportunity.

```
┌─────────────────────────────────────────────────────────────┐
│ Event: Phone Reported Stolen                                │
├─────────────────────────────────────────────────────────────┤
│ • IMEI: 358240051111110 marked as "Stolen"                  │
│ • FIR-2024-001 filed                                        │
│ • Alert system activated                                    │
└─────────────────────────────────────────────────────────────┘
                         │
                  [Time passes...]
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Event: Thief Attempts Resale                                │
├─────────────────────────────────────────────────────────────┤
│ • Unknown person brings phone to Shop X                     │
│ • Shopkeeper enters IMEI for verification                   │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ System Response: STOLEN DEVICE DETECTED                     │
├─────────────────────────────────────────────────────────────┤
│ • Immediate alert displayed to shopkeeper                   │
│ • Resale attempt logged with timestamp                      │
│ • Location and shopkeeper details recorded                  │
│ • Police dashboard updated in real-time                     │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Police Notification                                         │
├─────────────────────────────────────────────────────────────┤
│ • Alert appears in police dashboard                         │
│ • Shows: IMEI, FIR number, shop location, timestamp         │
│ • Provides contact info for Shop X                          │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Police Action Options                                       │
├─────────────────────────────────────────────────────────────┤
│ Option 1: Immediate Response                                │
│ • Contact shop to delay customer                            │
│ • Dispatch team to location                                 │
│ • Attempt on-site apprehension                              │
│                                                              │
│ Option 2: Surveillance                                      │
│ • Request shop to collect customer details                  │
│ • Set up monitoring for future attempts                     │
│ • Build case with additional evidence                       │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Shopkeeper Cooperation                                      │
├─────────────────────────────────────────────────────────────┤
│ • Shopkeeper sees "CONTACT POLICE" instruction              │
│ • Can delay transaction citing "verification process"       │
│ • Provides safe environment for police operation            │
└─────────────────────────────────────────────────────────────┘
```

**Real-Time Alert Data (Police Dashboard):**
```json
{
  "alertType": "STOLEN_DEVICE_RESALE_ATTEMPT",
  "severity": "HIGH",
  "timestamp": "2024-01-28T14:30:00Z",
  "device": {
    "imei": "358240051111110",
    "brand": "Apple",
    "model": "iPhone 14 Pro"
  },
  "fir": {
    "number": "FIR-2024-001",
    "ownerName": "Fatima Khan",
    "reportDate": "2024-01-25"
  },
  "resaleAttempt": {
    "shopName": "Mobile Point",
    "shopAddress": "Shop 45, Electronic Market",
    "shopkeeperContact": "+92-300-5551234",
    "attemptTime": "2024-01-28T14:30:00Z"
  },
  "recommendedAction": "Coordinate with shopkeeper for potential apprehension"
}
```

**Success Metrics for Trap:**
- Reduces time from theft to recovery
- Creates deterrent effect
- Increases arrest probability
- Provides evidence for prosecution

---

## 12. Security & Privacy Measures

### 12.1 Data Protection

**CNIC Masking:**
```typescript
// Full CNIC stored: 4210155667788
// Displayed to non-owners: 42101-****-88
function maskCNIC(cnic: string): string {
  return `${cnic.slice(0, 5)}-****-${cnic.slice(-2)}`;
}
```

**Owner Information Protection:**
- Full name visible only to device owner and police
- Other users see partial name: "Ahmed H."
- Contact details never exposed publicly

---

### 12.2 Authentication & Authorization

**Role-Based Access Control (RBAC):**

| Role | Access Level | Permissions |
|------|-------------|-------------|
| **Citizen** | User Site | Register devices, report theft, manage own devices |
| **Shopkeeper** | User Site | Verify IMEI, initiate resale, view verification results |
| **Police** | Admin Site | View stolen devices, access FIRs, monitor resale attempts |
| **Admin** | Admin Site | Full system access, data management, analytics |

**Session Management:**
- JWT-based authentication (demo mode)
- Session timeout after inactivity
- Secure token storage

---

### 12.3 OTP Security (Simulated)

**OTP Characteristics:**
- 6-digit numeric code
- 10-minute expiration
- Single-use only
- Rate limiting on generation

**Dummy Implementation:**
```typescript
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// In production, would be sent via SMS
// In demo, displayed in console/test interface
```

---

### 12.4 Audit Trail

**All critical actions are logged:**
- Device registrations
- Ownership transfers
- Theft reports
- Verification attempts
- OTP generation and validation
- Administrative actions

**Log Structure:**
```typescript
interface AuditLog {
  timestamp: Date;
  action: string;
  userId: string;
  resourceId: string;
  ipAddress: string;
  details: object;
}
```

---

### 12.5 Input Validation

**IMEI Validation:**
```typescript
function validateIMEI(imei: string): boolean {
  // Must be exactly 15 digits
  if (!/^\d{15}$/.test(imei)) return false;
  
  // Luhn algorithm check (standard for IMEI)
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let digit = parseInt(imei[i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}
```

**CNIC Validation:**
```typescript
function validateCNIC(cnic: string): boolean {
  // Must be exactly 13 digits
  return /^\d{13}$/.test(cnic);
}
```

---

### 12.6 Rate Limiting

**Prevents abuse:**
- Max 5 IMEI verifications per IP per minute
- Max 3 OTP requests per device per hour
- Max 10 theft reports per user per day

---

## 13. Benefits & Impact

### 13.1 For Citizens

**Enhanced Security:**
- Devices become less attractive to thieves
- Ownership verification prevents unauthorized sales
- Quick reporting mechanism

**Peace of Mind:**
- Know that stolen devices can't be easily resold
- Protected against buying stolen phones unknowingly
- Clear ownership documentation

**Financial Protection:**
- Reduces likelihood of permanent loss
- Insurance claims supported by FIR records
- Potential recovery assistance

---

### 13.2 For Retailers

**Legal Protection:**
- Documented verification prevents legal liability
- Clear paper trail for all transactions
- Protection from police seizure of stolen goods

**Business Benefits:**
- Customer trust through transparent verification
- Competitive advantage over non-compliant shops
- Reduced risk of financial loss

**Regulatory Compliance:**
- Ready for potential future legal requirements
- Industry best practice adoption
- Positive reputation

---

### 13.3 For Law Enforcement

**Proactive Capabilities:**
- Real-time alerts on stolen device activities
- Trap opportunities for apprehending thieves
- Data-driven investigation support

**Efficiency Gains:**
- Faster case resolution
- Better resource allocation
- Reduced manual tracking

**Crime Prevention:**
- Deterrent effect through increased risk
- Disruption of stolen goods market
- Pattern analysis for organized crime

---

### 13.4 Societal Impact

**Crime Reduction:**
- Decreased economic incentive for phone snatching
- Lower crime rates in target areas
- Safer public spaces

**Economic Benefits:**
- Reduced losses from theft
- Healthier second-hand market
- Consumer confidence

**Digital Safety:**
- Protected personal data on devices
- Secure digital ecosystem
- Trust in technology

---

## 14. Current Limitations

### 14.1 Demo-Specific Constraints

**No Real Integration:**
- ❌ Telecom network connectivity
- ❌ National CNIC database access
- ❌ Police FIR systems integration
- ❌ SMS gateway for OTP delivery

**Simulated Features:**
- OTP generation and validation (not sent via SMS)
- FIR records (not connected to police systems)
- Notifications (console logs only)
- Location tracking (not implemented)

**Data Scope:**
- Limited to pre-seeded dummy data
- No real user registration
- Simulated authentication

---

### 14.2 Technical Limitations

**Scalability:**
- Not optimized for millions of devices
- No distributed database architecture
- No load balancing

**Security:**
- Basic authentication (not production-grade)
- No advanced encryption
- No penetration testing

**Performance:**
- No caching layer
- No CDN for static assets
- Basic database indexing

---

### 14.3 Operational Limitations

**Cannot Actually:**
- Block devices on cellular networks
- Send real SMS notifications
- Coordinate with police departments
- Verify CNICs against NADRA
- Track devices via GPS
- Remotely lock/wipe devices

---

## 15. Future Roadmap

### 15.1 Phase 1: Production Readiness

**Technical Enhancements:**
- Production-grade authentication (OAuth 2.0)
- Database scaling (sharding, replication)
- API rate limiting and caching
- Comprehensive error handling
- Security audit and penetration testing

**Integration:**
- SMS gateway (Twilio, local providers)
- Email notifications
- Cloud deployment (AWS/Azure/GCP)

---

### 15.2 Phase 2: Official Integration

**Government Partnerships:**
- NADRA CNIC verification API
- Police FIR system connectivity
- National crime database integration

**Telecom Integration:**
- IMEI blocking at network level
- Device status synchronization
- Roaming prevention for stolen devices

**CEIR Integration:**
- Central Equipment Identity Register
- Cross-border tracking
- International cooperation

---

### 15.3 Phase 3: Advanced Features

**AI & Machine Learning:**
- Fraud pattern detection
- Risk scoring for transactions
- Anomaly detection in resale attempts
- Predictive analytics for crime prevention

**Biometric Verification:**
- Fingerprint authentication for ownership transfer
- Face recognition for seller verification
- Multi-factor biometric security

**Mobile Applications:**
- Native iOS app
- Native Android app
- Push notifications
- Offline capabilities

**Blockchain Integration:**
- Immutable ownership records
- Decentralized verification
- Smart contracts for transfers

---

### 15.4 Phase 4: Ecosystem Expansion

**Regional Rollout:**
- City-level pilot programs
- Province-wide deployment
- National coverage

**Stakeholder Network:**
- Registered shopkeeper network
- Insurance company integration
- Manufacturer partnerships
- Carrier collaboration

**Additional Services:**
- Device insurance marketplace
- Warranty tracking
- Repair history logging
- Upgrade/trade-in facilitation

---

## 16. Implementation Guidelines

### 16.1 Development Setup

**Prerequisites:**
```bash
Node.js >= 18.0.0
MongoDB >= 6.0
npm or yarn
Git
```

**Clone and Install:**
```bash
# Clone repository
git clone https://github.com/your-org/maivs-demo
cd maivs-demo

# Install dependencies for user app
cd user-app
npm install

# Install dependencies for admin app
cd ../admin-app
npm install

# Install dependencies for backend
cd ../backend
npm install
```

**Environment Configuration:**

**User App (`.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=MAIVS
```

**Admin App (`.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:4001/api
NEXT_PUBLIC_APP_NAME=MAIVS Admin
```

**Backend (`.env`):**
```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://localhost:27017/maivs
JWT_SECRET=your-secret-key-here
```

**Database Setup:**
```bash
# Start MongoDB
mongod

# Seed database
cd backend
npm run seed
```

**Run Applications:**
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: User App
cd user-app
npm run dev

# Terminal 3: Admin App
cd admin-app
npm run dev
```

**Access:**
- User App: http://localhost:3000
- Admin App: http://localhost:3001
- API: http://localhost:4000

---

### 16.2 Testing Strategy

**Manual Testing Scenarios:**

1. **Happy Path:**
   - Register new device
   - Verify clean device
   - Complete legitimate resale with OTP

2. **Theft Scenario:**
   - Report device stolen
   - Attempt verification (should show alert)
   - View police dashboard update

3. **Edge Cases:**
   - Invalid IMEI format
   - Duplicate registration attempt
   - Expired OTP
   - Wrong OTP entry

**Test Data:**
Use pre-seeded dummy data from `/backend/src/data/`

---

### 16.3 Deployment Considerations

**For Demo/Presentation:**
- Deploy to free tier cloud platform (Vercel, Render)
- Use MongoDB Atlas free tier
- Ensure stable uptime during demo
- Prepare backup demo environment

**For Production (Future):**
- Multi-region deployment
- CDN for frontend assets
- Database replication
- Load balancers
- DDoS protection
- Regular security audits

---

## 17. Conclusion

### Summary

MAIVS demonstrates a **practical, scalable solution** to the persistent problem of mobile phone theft. By removing the economic incentive through mandatory ownership verification, the system addresses the root cause rather than just the symptoms.

### Key Takeaways

**Innovative Approach:**
- Prevention through market disruption
- Multi-stakeholder collaboration
- Technology-enabled transparency

**Proven Concept:**
- Complete workflows implemented
- Real-world logic demonstrated
- Scalability potential shown

**Ready for Evolution:**
- Clear roadmap to production
- Government partnership opportunities
- Expandable feature set

### Call to Action

This demo provides a **blueprint for implementation** at the governmental level. With proper integration and stakeholder buy-in, MAIVS can:

- **Significantly reduce** mobile phone snatching incidents
- **Protect citizens** from theft and fraud
- **Empower law enforcement** with modern tools
- **Create a safer** digital ecosystem

The technology exists. The solution is proven. **Implementation is the next step.**

---

## 18. Acknowledgements

**Project Team:**
- Lead Developer: Okasha Nadeem

This project is developed for brainstorming and demonstration purposes only for the intership program provided by DIG of CPO Pakistan.

---

Project Presentation: [MAIVS Project Presentation](https://www.genspark.ai/slides?project_id=7f0d86d6-ec08-4846-a7e1-98cf41f45891)

**Document Version:** 1.0  
**Last Updated:** January 31, 2026  
**Status:** Demo/Proof of Concept  

---

© 2026 MAIVS Project Team. This document describes a demonstration system and does not represent an operational government service.