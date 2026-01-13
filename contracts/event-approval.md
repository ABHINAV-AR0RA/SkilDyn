# SkilDyn — Event Approval

## Purpose
Allows organizers to submit hackathons for faculty verification.

---

## Submit Event

### POST /events/request

Input:
- eventName
- organizer
- email
- domain
- date
- deadline
- description
- proofFile

Output:
- requestId
- status = "pending"

---

## Check Request Status

### GET /events/requests/{requestId}

Returns:
- requestId
- status
