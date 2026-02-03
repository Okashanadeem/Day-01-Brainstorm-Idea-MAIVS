---
name: maivs-frontend-ui-standards
description: Visual and UX standards for MAIVS applications. Defines Tailwind patterns, status badge colors, and shared UI component structures. Use when building or styling Next.js frontend pages and components.
---

# MAIVS Frontend UI Standards

Ensures a consistent and professional "Government-Tech" aesthetic across both User and Admin apps.

## Status Palette

| Status | Color | Tailwind Class |
|--------|-------|----------------|
| Active | Emerald/Green | `bg-emerald-100 text-emerald-800` |
| Stolen | Rose/Red | `bg-rose-100 text-rose-800 animate-pulse` |
| Under Investigation | Amber/Yellow | `bg-amber-100 text-amber-800` |
| Recovered | Blue | `bg-blue-100 text-blue-800` |

## Core Components

### 1. Device Card
Used in "My Devices" and "Stolen List".
- **Header**: Brand + Model.
- **Sub-header**: Masked IMEI.
- **Badge**: Status (see palette).
- **Action**: Primary button (e.g., "Report Theft" or "View Details").

### 2. Verification Result
The high-stakes output of the `/verify` page.
- **Success State**: Large green checkmark, "CLEAN" label, owner initials.
- **Alert State**: Large red warning icon, "STOLEN" label, FIR number, "DO NOT PURCHASE" instructions.

## Form Standards

- **Input Fields**: Rounded borders, clear labels, inline validation for 15-digit IMEI.
- **Buttons**:
  - Primary: Indigo-600 (Actions like "Register", "Login")
  - Danger: Rose-600 (Actions like "Report Theft")
  - Secondary: Slate-200 (Actions like "Cancel", "Back")

## Layout Patterns

- **User-App**: Sidebar navigation (Left), Content Area (Center-Right).
- **Admin-App**: Top-bar summary stats, full-width data tables for records.
