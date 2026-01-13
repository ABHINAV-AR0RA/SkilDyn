# SkilDyn — Profile

## Purpose
Stores and displays a user’s skills, experience, and collaboration readiness.

---

## Get Profile

### GET /users/{userId}

Returns:
- userId
- name
- photoUrl
- course
- year
- skills [{ name, level }]
- interests[]
- availability
- projects[]
- certifications[]
- linkedinUrl
- githubUrl
- aiSummary

---

## Update Profile

### PUT /users/{userId}

Input:
- skills[]
- interests[]
- availability
- projects[]
- certifications[]
- linkedinUrl
- githubUrl

Output:
- success
