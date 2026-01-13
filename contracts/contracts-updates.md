# SkilDyn — Contract Updates (v1.1)

This file contains all API additions and modifications that were introduced after the initial SkilDyn contract set was created.

These updates MUST be implemented in addition to:
auth.md  
onboarding.md  
dashboard.md  
hackathons.md  
teams.md  
applications.md  
invites.md  
profile.md  
admin.md  
event-approval.md  
ai.md  

---

## 1. Authentication Updates

### Logout

Add a logout endpoint.

POST /auth/logout

Input:
- authToken

Behavior:
- Invalidate the session
- Remove auth token
- User is no longer authenticated

Output:
- success

---

## 2. Notifications

Users now receive notifications for:
- Team invites
- Application status changes
- Event approval status

### Data Model

Notification
- notificationId
- userId
- type (invite | application | event)
- message
- createdAt
- isRead

### Get Notifications

GET /notifications

Returns:
- notifications[]

---

## 3. Saved Hackathons — Delete

Add removal support.

DELETE /hackathons/saved/{hackathonId}

Behavior:
- Remove hackathon from user's saved list

Output:
- success

---

## 4. Team Applications Page

This page is now mandatory.

GET /teams/{teamId}/applications

Returns:
applications[]
Each:
- applicationId
- userId
- aiSummary
- status

Add status update:

POST /applications/{applicationId}/accept  
POST /applications/{applicationId}/reject  

Behavior:
- Accept → add user to team
- Reject → close application

---

## 5. Team Membership Management

Team leads can remove members.

POST /teams/{teamId}/remove-member

Input:
- userId

Behavior:
- Remove user from team

Output:
- success

---

## 6. Team Invites — Profile Integration

Inviting from profile must be supported.

POST /teams/{teamId}/invite-user

Input:
- invitedUserId

Output:
- success

---

## 7. Profile Updates

### Profile Photo

Add support for profile photos.

User model now includes:
- profilePhotoUrl

PUT /users/{userId}/photo

Input:
- imageFile

Output:
- profilePhotoUrl

---

### AI Profile Summary

Add AI endpoint:

POST /ai/summarize-profile

Input:
- userId

Output:
- summary
- keySkills
- collaborationStyle
- commitmentEstimate

AI must not score or rank users.

---

## 8. Projects & Certifications

Profile projects and certifications now include links.

Project:
- name
- url

Certification:
- name
- verificationUrl

These must be stored and returned via:
GET /users/{userId}

---

## 9. Admin Governance

Admins can now remove hackathons, teams, and users from teams.

DELETE /admin/hackathons/{hackathonId}  
DELETE /admin/teams/{teamId}  

POST /admin/teams/{teamId}/remove-user
Input:
- userId

Output:
- success

---

## 10. Event Proof Documents

Proof files must be downloadable.

EventRequest now includes:
- proofFileUrl

GET /admin/event-requests
Must return:
- proofFileUrl (direct download link)

---

## 11. Create Team Redirect

After team creation:

POST /teams
Now must also return:
- teamId

So frontend can navigate to:
- /teams/{teamId}/invite

---

## 12. Application Prompt Change

The application question was updated to:

"Why do you want to join this team and how much time and effort can you realistically commit to this project?"

No API change required — frontend only.

---

## 13. Onboarding Validation

Backend must enforce:

Step 1:
- At least one skill required

Step 2:
- hoursPerDay required
- preferredRole required

If missing → return validation error

---

## Final Note

This update file represents **SkilDyn API v1.1**

Backend implementation must follow:
1. Base contracts (v1.0)
2. This update file (v1.1)

Do NOT rewrite base contracts.
Apply these as patches.
