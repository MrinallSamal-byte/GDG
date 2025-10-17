# Poll Management - Quick Reference

## 🚀 Quick Commands

### Create a Poll (Admin)
1. Navigate to `/admin/polls`
2. Click "Add New Poll"
3. Fill form with question and 2-6 options
4. Set dates or activate immediately
5. Click "Add Poll"

### Edit a Poll
1. Find poll in the list
2. Click "Edit" button
3. Modify fields
4. Click "Update Poll"

### View Analytics
1. Click "Analytics" button on poll card
2. View vote counts and percentages
3. Close modal when done

### Toggle Status
- Click the toggle switch on poll card
- Green = Active, Red = Inactive

### Delete Poll
1. Click "Delete" button
2. Confirm in modal
3. Poll and votes permanently removed

---

## 📊 Poll Data Flow

```
Admin Creates Poll → Firestore (`polls` collection)
                              ↓
                     Poll becomes active (based on dates)
                              ↓
                     User sees popup on homepage
                              ↓
                     User votes → Firestore (`pollResponses` collection)
                              ↓
                     Admin views analytics
```

---

## 🎯 Common Use Cases

### Scenario 1: Event Feedback
```
Question: "How would you rate today's workshop?"
Options:
  - Excellent
  - Good
  - Average
  - Poor
Duration: End of event to 24 hours after
```

### Scenario 2: Topic Selection
```
Question: "What topic would you like for our next session?"
Options:
  - Cloud Computing
  - Machine Learning
  - Web Development
  - Mobile Apps
Duration: 1 week before event
```

### Scenario 3: Community Preference
```
Question: "Preferred event day of the week?"
Options:
  - Monday
  - Wednesday
  - Friday
  - Saturday
Duration: 2 weeks
```

---

## ⚡ Keyboard Shortcuts (Admin Panel)

- **Ctrl + Click** on poll card - Quick edit
- **Shift + Delete** - Delete without confirmation (if implemented)
- **Esc** - Close any modal

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Poll not showing | Check dates, status, and Firestore connection |
| Can't vote | Clear localStorage, check console errors |
| Analytics not updating | Refresh page, check Firestore listeners |
| Duplicate polls showing | Only one poll can be active at a time |

---

## 📱 API Quick Reference

### pollService Functions

```javascript
// Create
pollService.createPoll(pollData)

// Read
pollService.getActivePolls()
pollService.getPollById(pollId)

// Update
pollService.updatePoll(pollId, updates)
pollService.togglePollStatus(pollId, isActive)

// Delete
pollService.deletePoll(pollId)

// Voting
pollService.submitVote(pollId, optionId, userId)
pollService.hasUserVoted(pollId, userId)

// Analytics
pollService.getPollAnalytics(pollId)

// Automation
pollService.deactivateExpiredPolls()
```

---

## 🎨 UI Components

### AdminPolls.jsx
- Main admin interface
- Poll list with cards
- Add/Edit forms
- Preview modal
- Analytics modal

### PollPopup.jsx
- User-facing component
- Voting interface
- Results display
- Auto-redirect

---

## 📦 File Locations

```
src/
├── admin/AdminPolls.jsx          ← Admin UI
├── components/PollPopup.jsx      ← User popup
├── services/pollService.js       ← Business logic
└── routes/AppLayout.jsx          ← Integration point
```

---

## ⚙️ Configuration

### Auto-Deactivation Interval
```javascript
// AdminPolls.jsx - Line ~50
setInterval(async () => {
  await pollService.deactivateExpiredPolls();
}, 60000); // 60 seconds
```

### Session Tracking Key
```javascript
// AppLayout.jsx
const pollSeenKey = `poll_seen_${activePoll.id}`;
sessionStorage.setItem(pollSeenKey, 'true');
```

### Vote Storage Key
```javascript
// PollPopup.jsx
const storageKey = `poll_voted_${poll.id}`;
localStorage.setItem(storageKey, userId);
```

---

## 🔐 Security Notes

- Votes are client-side tracked (localStorage)
- Admin routes are protected with Firebase Auth
- For production: Implement server-side vote validation
- Consider IP rate limiting for high-traffic sites

---

## 📈 Best Practices

### Question Writing
✅ Keep under 100 characters  
✅ Be specific and clear  
✅ Avoid leading questions  
❌ Don't use jargon  

### Option Design
✅ 3-4 options ideal  
✅ Mutually exclusive  
✅ Balanced choices  
❌ Don't add "Other" (creates analysis issues)  

### Timing
✅ 3-7 days for community polls  
✅ 24 hours for event feedback  
✅ 1 week for major decisions  
❌ Don't run polls indefinitely  

---

## 📊 Analytics Interpretation

### Engagement Rate
```
Engagement % = (Total Votes / Total Visitors) × 100
```

### Option Dominance
```
If one option > 60% → Clear preference
If options within 10% → Community divided
```

### Sample Size
```
Minimum 30 votes for reliable insights
50+ votes for actionable data
```

---

## 🚨 Common Errors

### "Poll not found"
- Poll was deleted or doesn't exist
- Check Firestore `polls` collection

### "You have already voted"
- localStorage has vote record
- Clear localStorage or use incognito mode

### "Failed to submit vote"
- Check internet connection
- Verify Firestore permissions
- Check browser console

---

## 🔄 Update Checklist

After creating/editing a poll:
- [ ] Preview to verify appearance
- [ ] Check dates are correct
- [ ] Toggle to active if ready
- [ ] Test on homepage
- [ ] Monitor analytics

---

## 📞 Support

For detailed information, see: `docs/POLL_MANAGEMENT_GUIDE.md`

For general admin help, see: `docs/ADMIN_SETUP.md`

For Firebase issues, see: `docs/FIREBASE_GUIDE.md`

---

**Quick Tip**: Use the Preview button before activating any poll to ensure it looks perfect!
