---
name: maivs-workflow-automation
description: Coordination patterns for cross-application workflows like the "Police Trap" alert and "OTP-verified Resale". Use when implementing integration logic between User-App, Admin-App, and Backend.
---

# MAIVS Workflow Automation

This skill guides the implementation of complex multi-stakeholder workflows.

## Workflow: The Police Trap

This is the core security feature of MAIVS.

### Execution Steps:
1. **Trigger**: Shopkeeper calls `GET /api/devices/verify/:imei`.
2. **Backend Detection**:
   - Backend checks `Device.status`.
   - If `status === 'Stolen'`:
     - Create a `ResaleAttempt` document.
     - Include `shopkeeperId`, `location` (from shopkeeper profile), and `timestamp`.
3. **Admin-App Notification**:
   - Admin-App polls (or uses WebSockets if implemented) `/api/resale-attempts/alerts`.
   - A high-priority visual indicator must appear on the Police Dashboard immediately.

## Workflow: Verified Ownership Transfer

Ensures that no phone changes hands without the current owner's explicit consent.

### Protocol:
1. **Initiation**: Shopkeeper inputs Buyer CNIC and Device IMEI.
2. **OTP Generation**: Backend generates 6-digit code, stores it in `PendingTransaction`.
3. **Owner Approval**:
   - Owner receives OTP (Simulated).
   - Owner provides OTP to Shopkeeper.
4. **Completion**:
   - Shopkeeper submits OTP to `POST /api/resale/verify-otp`.
   - Backend atomicaly updates `Device.ownerCNIC` and moves record to `ownershipHistory`.

## Integration Testing Scenarios

Refer to `references/test_scenarios.md` for specific command sequences to verify these workflows end-to-end.
