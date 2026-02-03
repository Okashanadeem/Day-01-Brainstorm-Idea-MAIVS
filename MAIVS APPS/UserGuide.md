# MAIVS Demo User Guide

This guide provides all the necessary credentials and data to demonstrate the complete Mobile Asset Identification & Verification System (MAIVS).

## 🚀 Quick Start

### 1. Start Database
Ensure MongoDB is running locally:
`mongod` (Default port: 27017)

### 2. Start Services (4 Terminals)

**Terminal 1: Backend API**
```bash
cd backend
npm run dev
```
*Running on: http://localhost:4000*

**Terminal 2: User App (Citizens & Shopkeepers)**
```bash
cd user-app
npm run dev
```
*Running on: http://localhost:3000*

**Terminal 3: Admin App (Police)**
```bash
cd admin-app
npm run dev
```
*Running on: http://localhost:3001*

**Terminal 4: Telecom Portal (Operators)**
```bash
cd telecom-app
npm run dev
```
*Running on: http://localhost:3002*

---

## 👤 User Credentials (Password for ALL: `password123`)

### 👮 Law Enforcement (Admin App)
Login here to view stolen devices, FIRs, and "Trap" alerts.
- **Name:** Officer Jadoon
- **CNIC:** `0000000000001`
- **Role:** Police

### 📡 Telecom Operator (Telecom Portal)
Login here to view block requests and block IMEIs on the network.
- **Name:** Telecom Operator
- **Operator ID:** `telecom`
- **Access Key:** `password123`
- **Role:** Telecom

### 🧑‍🤝‍🧑 Citizens (User App)
Login here to register devices, view owned assets, and report theft.
- **Citizen 1:** `4210100000001` (Owns Stolen Samsung & Active iPhone)
- **Citizen 2:** `4210100000002` (Owns Active Pixel 8)
- **Citizen 3:** `4210100000003` (Owns Active OnePlus 12R)

### 🏪 Shopkeepers (User App)
Login here to verify devices and initiate ownership transfers.
- **Shopkeeper:** `4210200000001` (Owns Personal Galaxy A54)

---

## 📱 Test Device IMEIs

Use these exact IMEIs to verify system behavior.

### 🔴 Stolen Device (Triggers "Police Trap" Alert)
*Verifying this IMEI will trigger a "STOLEN" warning and alert the police dashboard.*

| Model | IMEI | Owner | Status |
|-------|------|-------|--------|
| Samsung Galaxy S24 Ultra | `352046000000015` | Citizen 1 | **Stolen** |

### 🟢 Active Device (Safe for Transfer)
*Use this IMEI to test the Ownership Transfer workflow.*

| Model | IMEI | Owner | Status |
|-------|------|-------|--------|
| Google Pixel 8 | `352046000000031` | Citizen 2 | **Active** |

### 🟡 Active Device (Ready for Theft Report)
*Use this IMEI to demonstrate reporting a theft.*

| Model | IMEI | Owner | Status |
|-------|------|-------|--------|
| iPhone 15 Pro | `352046000000023` | Citizen 1 | **Active** |

---

## 🧪 Step-by-Step Demo Scenarios

### Scenario A: The "Police Trap" 🚨 (Public/Shopkeeper + Police)
**Goal:** Show how the system detects stolen phones during resale attempts.

1. **Admin App:** Login as **Officer Jadoon** (`0000000000001`).
2. Go to **"Resale Alerts"**. Notice it is empty or waiting.
3. **User App:** (Log out if needed). Click **"Verify IMEI"** on the home screen (or use the sidebar).
4. Enter the **Stolen IMEI**: `352046000000015`
5. Click **Verify Status**.
   - *Screen*: ❌ **STOLEN DEVICE DETECTED**. "Police authorities have been notified."
6. **Admin App:** Look at the screen.
   - *Result*: A new **RED ALERT** card appears instantly showing the device details and timestamp.

### Scenario B: Reporting a Theft 📝 (Citizen + Police)
**Goal:** Show how a citizen can instantly mark a phone as stolen.

1. **User App:** Login as **Citizen 1** (`4210100000001`).
2. Go to **"My Devices"**. Observe the **iPhone 15 Pro** is currently "Active".
3. Click **"Report Theft"** in the sidebar.
4. Select Device: **iPhone 15 Pro (352046000000023)**.
5. Date: Today. Station: **"Clifton PS"**. Description: **"Snatched at signal."**
6. Click **File FIR**.
7. **User App:** Redirects to My Devices. The iPhone status is now **STOLEN** (Red).
8. **Admin App:** Go to **"FIR Records"**.
   - *Result*: A new FIR is listed at the top with status "Filed".

### Scenario C: Verified Ownership Transfer 🤝 (Shopkeeper + Citizen)
**Goal:** Show how ownership is transferred securely with OTP.

*Context: Citizen 2 wants to sell their Pixel 8 to Citizen 3.*

1. **User App:** Login as **Citizen 2** (`4210100000002`).
2. Go to **"My Devices"**. Find the **Google Pixel 8**.
3. Click **"Manage Device"**.
4. Click **"Transfer Ownership"** (Simulated Shopkeeper flow).
5. Enter **Buyer CNIC** (Citizen 3): `4210100000003`.
6. Click **Next Step**.
7. **Simulated OTP**: `123456` will appear on screen (in demo mode).
8. Enter OTP: `123456`.
9. Click **Complete Transfer**.
10. **Result**:
    - Pixel 8 disappears from Citizen 2's list.
    - Login as **Citizen 3** (`4210100000003`).
    - Go to **"My Devices"**. The Pixel 8 is now there!

### Scenario D: National Registry Search 🔍 (Admin)
**Goal:** Demonstrate the Admin's ability to lookup assets by owner.

1. **Admin App:** Login as **Officer Jadoon** (`0000000000001`).
2. Go to **"Device Lookup"**.
3. Enter **Citizen 1's CNIC**: `4210100000001`.
4. Click **Search**.
5. **Result**: A list of all devices owned by Citizen 1 (including the Stolen Samsung) is displayed.
6. Try entering an **IMEI**: `352046000000049` (Citizen 3's OnePlus).
7. **Result**: The single device details and status are shown.

### Scenario E: The "Kill Switch" 📡 (Telecom + Police)
**Goal:** Show how a stolen report triggers a network block request.

*Pre-requisite: Perform Scenario B first (Report Theft of iPhone 15 Pro).*

1. **Telecom Portal:** Login as **Telecom Operator** (`telecom` / `password123`).
2. Go to **"Block Requests"**.
3. **Observe**: A new request for the **iPhone 15 Pro** IMEI is at the top.
   - *Reason*: "FIR Filed: FIR-2026-..."
   - *Status*: **Pending**
4. Click **BLOCK IMEI**.
5. **Result**: Status changes to **Blocked** (Red).
   - The device is now blacklisted on all cellular networks (Jazz, Telenor, Zong, Ufone).
