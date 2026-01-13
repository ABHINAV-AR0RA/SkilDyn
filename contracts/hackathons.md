# SkilDyn — Hackathons

## Purpose
Handles hackathon discovery, saving, and viewing hackathon details.

---

## Hackathon Discovery

### GET /hackathons
Query params:
- domain (optional)
- deadline (optional)
- mode (optional)
- search (optional)

Returns:
- hackathons[]

Each hackathon:
- hackathonId
- name
- domain
- deadline
- organizer
- mode

---

## Save Hackathon

### POST /hackathons/{hackathonId}/save

Input:
- userId

Output:
- success

---

## Saved Hackathons

### GET /hackathons/saved

Returns:
- hackathons[]

---

## Hackathon Detail

### GET /hackathons/{hackathonId}

Returns:
- hackathonId
- name
- organizer
- domain
- deadline
- description

---

## Navigation Actions

| User Action | Result |
|------------|--------|
| Click Hackathon | `/hackathons/{hackathonId}` |
| Click Save | Call save API |
| Click View Teams | `/hackathons/{hackathonId}/teams` |
| Click Create Team | `/teams/create?hackathonId={hackathonId}` |
