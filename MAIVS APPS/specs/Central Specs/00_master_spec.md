# MAIVS - Master Technical Specification

## 1. Project Overview
MAIVS (Mobile Asset Identification & Verification System) is a centralized platform designed to prevent mobile phone theft by eliminating the resale market for stolen devices. This specification covers the implementation of the **Proof of Concept (Demo)** system.

## 2. System Architecture (Monorepo)
The project will be structured as a monorepo containing three main packages:

1.  **`backend`**: Node.js/Express + MongoDB API Server.
2.  **`user-app`**: Next.js (App Router) application for Citizens and Shopkeepers.
3.  **`admin-app`**: Next.js (App Router) application for Police and System Administrators.

### 2.1 Technology Stack
-   **Runtime**: Node.js 18+
-   **Language**: TypeScript
-   **Frontend Framework**: Next.js 14+ (Tailwind CSS)
-   **Backend Framework**: Express.js
-   **Database**: MongoDB (Mongoose ODM)
-   **State Management**: React Context / Hooks
-   **Package Manager**: npm

## 3. Data Models (Core Schemas)

### 3.1 Device
-   `imei` (String, Unique, 15 chars)
-   `brand` (String)
-   `model` (String)
-   `ownerCNIC` (String, Ref -> Owner)
-   `status` (Enum: Active, Stolen, UnderInvestigation, Recovered)
-   `ownershipHistory` (Array of Objects)

### 3.2 Owner (Citizen/Shopkeeper)
-   `cnic` (String, Unique, 13 chars)
-   `name` (String)
-   `phoneNumber` (String)
-   `password` (String - Hashed)
-   `role` (Enum: Citizen, Shopkeeper)

### 3.3 FIR (First Information Report)
-   `firNumber` (String, Unique)
-   `imei` (String)
-   `ownerCNIC` (String)
-   `status` (Enum: Filed, UnderInvestigation, Closed)
-   `policeStation` (String)

### 3.4 Transaction
-   `imei` (String)
-   `fromCNIC` (String)
-   `toCNIC` (String)
-   `otpStatus` (Boolean)
-   `timestamp` (Date)

### 3.5 ResaleAttempt (For Police Trap)
-   `imei` (String)
-   `shopkeeperCNIC` (String)
-   `attemptDate` (Date)
-   `deviceStatus` (String - captured at time of attempt)
-   `policeNotified` (Boolean)

## 4. Security & Compliance (Demo Scope)
-   **Authentication**: JWT-based stateless authentication.
-   **CNIC Validation**: Regex check (13 digits).
-   **IMEI Validation**: Luhn algorithm check.
-   **Privacy**: CNIC masking in public/shopkeeper views.
-   **OTP**: Simulated (console log / response return) for transfer verification.

## 5. Environment Variables
### Common
-   `NODE_ENV`: development/production

### Backend
-   `PORT`: 4000
-   `MONGODB_URI`: Connection string
-   `JWT_SECRET`: Secret key for token signing

### User App
-   `NEXT_PUBLIC_API_URL`: http://localhost:4000/api
-   `NEXT_PUBLIC_APP_NAME`: MAIVS

### Admin App
-   `NEXT_PUBLIC_API_URL`: http://localhost:4000/api
-   `NEXT_PUBLIC_APP_NAME`: MAIVS Admin
