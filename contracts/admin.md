# SkilDyn — Admin Panel

## Purpose
Allows faculty to moderate events, teams, and view reports.

---

## View Requests

### GET /admin/event-requests

Returns:
- requests[]

Each request:
- requestId
- eventName
- organizer
- email
- proofFile
- status

---

## Approve Event

### POST /admin/event-requests/{requestId}/approve

Output:
- success
- hackathon published

---

## Reject Event

### POST /admin/event-requests/{requestId}/reject

Output:
- success
- request closed

---

## Reports

### GET /admin/reports

Returns:
- totalUsers
- totalTeams
- totalHackathons
