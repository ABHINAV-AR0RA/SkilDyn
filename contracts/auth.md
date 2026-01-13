# SkilDyn — Authentication

## Purpose
Handles user login and account creation for both students and admins.

Authentication supports:
- Google OAuth
- Email + Password

---

## Routes

| Route | Purpose |
|------|---------|
| `/login` | Login screen |
| `/signup` | Sign-up screen |

---

## Login Flow

### POST /auth/login
**Input**
- email
- password

**Output**
- userId
- role (student or admin)
- authToken

**Behavior**
- If credentials are valid → authenticate user
- If invalid → return error

---

## Google Login

### POST /auth/google
**Input**
- googleAuthToken

**Output**
- userId
- role
- authToken

**Behavior**
- If user exists → log in
- If new user → create account and proceed to onboarding

---

## Sign Up

### POST /auth/signup
**Input**
- email
- password

**Output**
- userId
- role = "student"
- authToken

**Behavior**
- Create new student account
- Redirect to onboarding

---

## Forgot Password

### POST /auth/forgot-password
**Input**
- email

**Output**
- success message

**Behavior**
- Send password reset link to email

---

## Role Detection
- If user email is in admin list → role = admin
- Otherwise → role = student

---

## Redirect Rules

| User Type | After Login |
|----------|-------------|
| Student | `/onboarding` (if first time) or `/dashboard` |
| Admin | `/dashboard` + admin controls visible |
