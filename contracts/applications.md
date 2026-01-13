# SkilDyn — Team Applications

## Purpose
Handles user applications to join teams.

---

## Submit Application

### POST /teams/{teamId}/applications

Input:
- userId
- rawText (from voice or typed input)

Output:
- applicationId
- status = "pending"

---

## View Applications (Team Lead)

### GET /teams/{teamId}/applications

Returns:
- applications[]

Each application:
- applicationId
- userId
- aiSummary
- status
