# MAIVS (Mobile Asset Identification & Verification System) Constitution

## Core Principles

### I. Theft Prevention via Market Disruption
The system's primary goal is to make stolen devices unsellable. Verification logic (IMEI status check) is the central mechanism and must be robust, real-time, and accessible to shopkeepers. We prioritize preventing the sale over recovering the device.

### II. Privacy by Design (Demo Scope)
Even in a demo using dummy data, PII (CNIC, Contact Info) must be masked in public and shopkeeper views. Role-based access control (Citizen vs Police) is strictly enforced at the API level. Only Law Enforcement and the verified owner may see unmasked details.

### III. Verified Ownership Transfer
Device ownership cannot change without explicit authorization (OTP) from the current owner. The chain of custody must be preserved in the `ownershipHistory`. No administrative overrides allowed in the standard transfer flow.

### IV. Simulated Realism
While external integrations (SMS, NADRA, Telecom APIs) are simulated, the *business logic* (OTP generation/validation, Status transitions, FIR filing) must function as if they were real. No "magic" state changes without a traceable process.

### V. Monorepo Separation
The Backend, User-App, and Admin-App are distinct entities. They communicate *only* via the public API contract. No shared state or direct Database access from frontend applications.

## Technical Constraints

- **Stack**: Node.js/Express (Backend), Next.js (Frontends), MongoDB (Data).
- **Validation**: Strict validation on IDs (15-digit Luhn-valid IMEIs, 13-digit CNICs).
- **Security**: JWT-based stateless authentication for all protected routes.

## Development Workflow

- **Task-Driven**: Implementation follows the `specs/02_tasks.md` checklist strictly.
- **Spec-First**: Changes to logic must be reflected in `specs/**` before code changes.
- **Completion Marking**: Every completed task must be marked in `specs/02_tasks.md` immediately.

## Governance
This constitution supersedes ad-hoc decisions. Amendments require updating this file and the corresponding specification documents.

**Version**: 1.0.0 | **Ratified**: 2026-01-31 | **Last Amended**: 2026-01-31