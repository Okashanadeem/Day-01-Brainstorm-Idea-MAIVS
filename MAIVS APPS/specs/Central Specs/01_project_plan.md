# MAIVS - Implementation Plan

## Phase 1: Infrastructure & Backend Core
**Goal**: Set up the monorepo, configure the database, and establish the API foundation.
- [ ] Initialize git repository and monorepo structure.
- [ ] Setup `backend` Express server with TypeScript.
- [ ] Connect to MongoDB and create Mongoose models (`Device`, `Owner`, `FIR`).
- [ ] Implement Authentication API (Register/Login for Citizens/Police).
- [ ] Implement Device Management API (Register, Get My Devices).
- [ ] Create Database Seeding Script (Dummy Data).

## Phase 2: User Application (Citizen & Shopkeeper)
**Goal**: Build the public-facing interface for device management and verification.
- [ ] Setup `user-app` Next.js project.
- [ ] Implement Authentication UI (Login/Register).
- [ ] Build "My Devices" Dashboard (List, Add Device).
- [ ] Implement "Report Theft" workflow (Form -> API -> FIR Generation).
- [ ] Implement "Verify IMEI" public page (Shopkeeper tool).
- [ ] Build "Ownership Transfer" flow (Initiate Transfer -> OTP Modal -> Confirm).

## Phase 3: Admin Application (Police & Admin)
**Goal**: Build the restricted dashboard for law enforcement.
- [ ] Setup `admin-app` Next.js project.
- [ ] Implement Admin/Police Login.
- [ ] Build "Stolen Devices" Dashboard (Search/Filter).
- [ ] Implement "FIR Management" View (View Details, Update Status).
- [ ] Create "Resale Alerts" real-time monitoring view.
- [ ] Build Analytics/Stats overview (Charts/Graphs).

## Phase 4: Integration & Polish
**Goal**: Ensure all systems talk to each other and the user experience is smooth.
- [ ] End-to-end testing of the "Theft -> Verify -> Trap" loop.
- [ ] UI/UX Refinement (Tailwind styling, Responsive design).
- [ ] Error handling and form validation polish.
- [ ] Final Dummy Data Injection for Demo Day.
