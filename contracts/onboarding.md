# SkilDyn — Onboarding

## Purpose
Collects initial profile information for new users after signup.

This data is used for:
- Team matching
- Profile display
- AI collaboration insights

---

## Step 1 — Skills & Interests

### POST /onboarding/skills
Input:
- skills: [{ name, level }]
- interests: [string]

Output:
- success

---

## Step 2 — Availability

### POST /onboarding/availability
Input:
- hoursPerWeek
- preferredRole
- preferredRoleText (only if preferredRole = "Other")

Output:
- success

---

## Step 3 — Profile Strength

### POST /onboarding/profile
Input:
- projects[]
- certifications[]
- linkedinUrl
- githubUrl

Output:
- success

---

## Completion

When all three steps are saved:
Redirect user to `/dashboard`
