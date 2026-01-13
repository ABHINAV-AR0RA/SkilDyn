# SkilDyn — Team Invitations

## Purpose
Handles team invitations and responses.

---

## Send Invite

### POST /teams/{teamId}/invites

Input:
- inviterId
- invitedUserId

Output:
- inviteId
- status = "sent"

---

## View Invites

### GET /users/{userId}/invites

Returns:
- invites[]

Each invite:
- inviteId
- teamId
- teamName
- hackathonName
- projectDomain
- status

---

## Accept Invite

### POST /invites/{inviteId}/accept

Output:
- success
- user added to team

---

## Decline Invite

### POST /invites/{inviteId}/decline

Output:
- success
- invite closed
