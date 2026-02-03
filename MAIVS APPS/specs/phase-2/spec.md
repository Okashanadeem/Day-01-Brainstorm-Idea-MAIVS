# Phase 2: User Web Application

## Objective
Develop the Next.js application for Citizens and Shopkeepers to interact with the MAIVS system.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State**: React Hooks + Context

## Key Features & Pages

### 2.1 Authentication (`/login`, `/register`)
- Simple forms requesting CNIC and Password.
- Store JWT in `localStorage` or cookies.
- Redirect to `/dashboard` upon success.

### 2.2 Dashboard (`/dashboard`)
- **My Devices Section**: Grid of cards showing registered devices.
- **Add Device Button**: Opens a modal to input IMEI, Brand, Model.
- **Status Indicators**: Green (Active), Red (Stolen).

### 2.3 Theft Reporting (`/report-theft`)
- Select device from dropdown (only own active devices).
- Form: Incident Date, Location, Description.
- Submit -> Calls `POST /api/firs`.
- Success -> Device card updates to "Stolen" (Red).

### 2.4 IMEI Verification (`/verify`)
- Publicly accessible page.
- Large search bar for 15-digit IMEI.
- **Result Display**:
    - **Clean**: "Safe to Buy". Show Owner Name (Masked).
    - **Stolen**: "DO NOT BUY". Show FIR Number, Police Station. Warning colors.

### 2.5 Ownership Transfer (Simulated)
- On Device Card -> "Transfer Ownership" button.
- Step 1: Enter Buyer CNIC.
- Step 2: Show "OTP Sent" (Simulate by logging to console or showing in a toast).
- Step 3: Input OTP.
- Submit -> Updates ownership in backend.

## Acceptance Criteria
- [ ] User can sign up and see their dashboard.
- [ ] User can add a device and see it appear.
- [ ] User can report a device stolen and verify the status changes to "Stolen" on the verify page.
