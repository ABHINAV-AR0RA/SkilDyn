# SkilDyn — Student Dashboard

## Purpose
The dashboard is the main home screen for logged-in users.  
It provides access to hackathons, teams, invites, and event requests.

---

## Data Required

### GET /dashboard
Returns:
- userProfile
- recommendedHackathons[]
- myTeams[]
- teamInvitesCount

---

## Data Objects

### userProfile
- userId
- name
- avatarUrl

### recommendedHackathons
- hackathonId
- name
- domain
- deadline

### myTeams
- teamId
- teamName
- hackathonName
- userRoleInTeam

### teamInvitesCount
- number

---

## Actions

| User Action | Behavior |
|------------|----------|
| Click a Hackathon | Navigate to `/hackathons/{hackathonId}` |
| Click Saved Hackathons | Navigate to `/saved` |
| Click My Teams | Navigate to `/teams` |
| Click Team Invites | Navigate to `/invites` |
| Click Request Event Approval | Navigate to `/event-request` |
| Use Search | Navigate to `/search?q={query}` |

---

## Access Rules
- Only authenticated users may access this screen
- Both students and admins can access this screen
- Admin users see additional admin navigation

---

## Error Handling
- If dashboard data fails to load → show retry option
- If user session is invalid → redirect to `/login`
