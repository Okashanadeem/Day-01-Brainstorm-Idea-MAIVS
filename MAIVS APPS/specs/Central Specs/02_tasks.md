# MAIVS - Task Checklist

## Phase 1: Infrastructure & Backend

- [x] **T001**: Initialize `package.json` and install workspaces (optional) or folder structure.
- [x] **T002**: Setup `backend/tsconfig.json` and `backend/src/server.ts`.
- [x] **T003**: Configure `backend/.env` and `backend/src/config/db.ts`.
- [x] **T004**: Create Mongoose Models: `User.ts` (Owner/Police), `Device.ts`, `FIR.ts`.
- [x] **T005**: Implement `auth.controller.ts`: Signup, Login, JWT generation.
- [x] **T006**: Implement `device.controller.ts`: Create, Read (by Owner), Verify (Public).
- [x] **T007**: Implement `fir.controller.ts`: Create FIR, Update Status.
- [x] **T008**: Create `seed.ts` with 10+ dummy users, 20+ devices, 5 stolen reports.

## Phase 2: User App (Next.js)

- [x] **T020**: Initialize `user-app` with Tailwind CSS.
- [x] **T021**: Create `api.ts` axios/fetch wrapper with Interceptors for JWT.
- [x] **T022**: Build `LoginPage` and `RegisterPage` (CNIC based).
- [x] **T023**: Build `DashboardLayout` with Sidebar (My Devices, Report Theft, Settings).
- [x] **T024**: Implement `DeviceCard` component and `DeviceList` page.
- [x] **T025**: Build `RegisterDeviceModal` form.
- [x] **T026**: Create `ReportTheftPage` with form (Date, Location, Desc).
- [x] **T027**: Create `VerifyIMEIPage` (Public access).
- [x] **T028**: Implement `TransferOwnershipModal` with OTP input simulation.

## Phase 3: Admin App (Next.js)

- [x] **T040**: Initialize `admin-app` with Tailwind CSS.
- [x] **T041**: Build `AdminLogin` page.
- [x] **T042**: Create `PoliceDashboard` (Overview stats).
- [x] **T043**: Build `StolenDeviceList` with Search/Filter by IMEI/CNIC.
- [x] **T044**: Create `FIRDetails` view.
- [x] **T045**: Implement "Trap Alert" simulation (Visual indicator for flagged IMEI checks).

## Phase 4: Verification

- [x] **T060**: Manual test: Register -> Report Stolen -> Verify (Should Alert).
- [x] **T061**: Manual test: Register -> Transfer -> OTP -> Success.
- [x] **T062**: Check responsiveness on Mobile view.

## Phase 5: Advanced Features & Refinements

- [x] **T080**: Implement `Resale/Shopkeeper` Workflow in User App: Update `VerifyPage` to show "Initiate Purchase" button for logged-in shopkeepers, triggering the backend resale initiation.
- [x] **T081**: Implement `AuditLog` System: Create Backend Middleware and Model to track critical actions (Login, Transfer, Theft Report) and Admin View to inspect logs.
- [x] **T082**: Implement `RateLimiting` Middleware: Add security rate limits to OTP generation and IMEI verification endpoints in Backend.
- [x] **T083**: Implement `AnalyticsPage` in Admin App: Create a dedicated analytics dashboard with visual charts (Theft Trends, Recovery Rates) as specified in documentation.

## Phase 6: Government Integrations

- [x] **T100**: Initialize `telecom-app` (Next.js) for Network Operators.
- [x] **T101**: Backend: Create `BlockList` model and endpoints for Telecom integration (`POST /block-request`, `GET /block-requests`, `PATCH /execute-block`).
- [x] **T102**: Backend: Implement `PanicAlert` logic in `verifyTransferOTP`. If special OTP (e.g., `911911`) is used, return success but log high-priority alert.
- [x] **T103**: User App: Update `TransferOwnershipModal` to handle Panic Code silently.
- [x] **T104**: Admin App: Add `LiveAlerts` component to Police Dashboard to flash "PANIC ALERT" in real-time.
- [x] **T105**: Telecom App: Build `BlockRequestList` to view and execute IMEI blocking on the network (Simulation).

## Phase 7: Process Security & UX Enhancements

- [x] **T120**: **Device Blocking Sync**: Update `Device` model to include `Blocked` status. Implement backend logic to automatically update `Device.status` to `Blocked` when Telecom App executes a block.
- [x] **T121**: **Admin Transfer Verification**: Create a new "Transfer Verification" page in Admin App to review and approve/reject flagged transfers, ensuring police oversight.
- [x] **T122**: **User Profile/About**: Implement an "About User" section/modal in Citizen, Admin, and Telecom apps to display current active user details (Name, CNIC, Role).
- [x] **T123**: **Recovered Status Management**: Enable 'Recovered' devices to be managed and transferred in backend and frontend.
- [x] **T124**: **Shopkeeper App UX**: Add "About Me" profile display to the shopkeeper-app sidebar.
- [x] **T125**: **Fix Sidebar Layout**: Move 'Real World' and 'Verify' pages into the dashboard layout group for all apps to ensure sidebar visibility.
- [x] **T126**: **Fix Input Styling**: Ensure input text color is black across all applications for readability.
- [x] **T127**: **Real World Architecture**: Create a dedicated page in all apps outlining the production-ready vision and future integrations (NADRA, GSMA, etc.).
