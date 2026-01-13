# SkilDyn — Landing Page

## Purpose
The landing page is the public entry point to SkilDyn.  
It introduces the product and routes users to the correct next screen based on their intent.

This screen contains **no business logic** and **no data fetching**.

---

## Routes Controlled

| Action | Route |
|--------|-------|
| Click **Login** | `/login` |
| Click **Sign Up** | `/signup` |
| Click **Get Started** | If user is not authenticated → `/signup`<br>If user is authenticated → `/dashboard` |
| Click **Faculty Login** | `/login?role=admin` |

---

## Access Rules
- Publicly accessible
- No authentication required
- No user data is read or written

---

## System Behavior
- All buttons trigger client-side navigation
- No API calls should be made from this screen
- No session or role checks except for **Get Started**

---

## Error Handling
- None required for this screen
- Navigation failures should show a generic retry message
