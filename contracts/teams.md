# SkilDyn — Teams

## Purpose
Handles team creation, team listing, and team detail views.

---

## Team Discovery

### GET /hackathons/{hackathonId}/teams

Returns:
- teams[]

Each team:
- teamId
- teamName
- projectDomain
- requiredSkills [{ skill, minLevel }]

---

## Team Detail

### GET /teams/{teamId}

Returns:
- teamId
- teamName
- hackathonId
- projectDomain
- projectIdea (optional)
- requiredSkills[]
- members[]

Each member:
- userId
- name
- role

---

## Create Team

### POST /teams

Input:
- hackathonId
- teamName
- projectDomain
- projectIdea (optional)
- requiredSkills [{ skill, minLevel }]

Output:
- teamId

---

## Navigation

| User Action | Result |
|------------|--------|
| View team | `/teams/{teamId}` |
| Create team | `/teams/create` |
| Apply to join | `/teams/{teamId}/apply` |
