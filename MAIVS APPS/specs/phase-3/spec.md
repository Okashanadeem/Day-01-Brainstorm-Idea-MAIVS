# Phase 3: Admin Web Application

## Objective
Develop the restricted dashboard for Law Enforcement and System Administrators.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Charts**: Recharts or simple CSS bars.

## Key Features & Pages

### 3.1 Police Login
- Secure login for users with the `Police` or `Admin` role.
- Redirection to `/admin/dashboard`.

### 3.2 Stolen Devices Dashboard
- Real-time list of all devices marked as "Stolen".
- Search by IMEI or CNIC.
- Quick view of the associated FIR.

### 3.3 FIR Record Management
- Table view of all filed FIRs.
- Detailed view: Incident description, reporting user details, device history.
- Ability to update status (e.g., "Under Investigation" to "Recovered").

### 3.4 Resale Alerts (Trap Logic)
- A view that logs every time a "Stolen" IMEI is checked via the User App verification tool.
- Data Source: `ResaleAttempt` collection.
- Shows: Shop Location (simulated), Timestamp, and IMEI.
- Visual alerts for new attempts.

### 3.5 System Analytics
- Charts showing:
    - Thefts reported over time.
    - Recovery rate.
    - Active devices in the system.

## Acceptance Criteria
- [ ] Police can login and see the list of stolen devices.
- [ ] Updating an FIR to "Recovered" changes the device status back to "Active" (or "Recovered").
- [ ] A search on the User App for a stolen phone triggers an entry in the Admin Alert view.
