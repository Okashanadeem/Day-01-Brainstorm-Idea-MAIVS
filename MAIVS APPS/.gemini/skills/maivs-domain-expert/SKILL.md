---
name: maivs-domain-expert
description: Domain-specific logic for MAIVS including IMEI validation (Luhn algorithm), CNIC masking, and ownership status transition rules. Use when implementing or testing core business logic, data models, or validation layers.
---

# MAIVS Domain Expert

This skill provides specialized procedural knowledge for the Mobile Asset Identification & Verification System.

## IMEI Validation (Luhn Algorithm)

All IMEIs in MAIVS must be 15 digits and pass the Luhn check. Use the bundled script `scripts/validate_imei.cjs` to verify IMEIs during implementation or test data generation.

### Procedural Check:
1. Ensure string is exactly 15 numeric digits.
2. Apply Luhn algorithm:
   - Double every second digit from the left.
   - If doubling results in a number > 9, subtract 9 (or add the digits).
   - Sum all resulting digits.
   - The total sum must be a multiple of 10.

## CNIC Rules

- **Format**: 13 numeric digits (e.g., `4210155667788`).
- **Masking**: For public/shopkeeper views, always mask the middle 6 digits: `42101-****-88`.
- **Validation**: Strict regex `^\d{13}$`.

## Status Transition Matrix

| Current Status | Action | New Status | Authorized By |
|----------------|--------|------------|---------------|
| Active | Report Theft | Stolen | Owner |
| Stolen | Recovery | Recovered | Police |
| Recovered | Verification | Active | Owner/Police |
| Active | Transfer | Pending | Shopkeeper |
| Pending | OTP Verify | Active | Owner (via OTP) |

## OTP Simulation

In the demo phase, OTPs are 6-digit numeric codes.
- **Expiry**: 10 minutes.
- **Simulation**: Log OTP to backend console and return in the API response (ONLY in development mode) to facilitate testing without an SMS gateway.
