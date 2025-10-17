# Integrating Firebase with Public Pages

This guide shows how to integrate Firebase real-time data with your public-facing pages.

## Example Integration

The `SignatureEvents.jsx` page has been updated as a reference implementation. Follow this pattern for other pages.

## Step-by-Step Integration

### 1. Import Required Hooks and Services

```javascript
import useFirestoreCollection from "../hooks/useFirestoreCollection";
import { COLLECTIONS } from "../services/firestoreService";
```

### 2. Fetch Data in Component

```javascript
const MyComponent = () => {
  // Fetch from Firebase
  const { data: firebaseData, loading, error } = useFirestoreCollection(
    COLLECTIONS.YOUR_COLLECTION
  );
  
  // Use Firebase data if available, otherwise fallback to static data
  const items = firebaseData.length > 0 ? firebaseData : StaticData;
  
  // Rest of your component...
};
```

### 3. Handle Loading State

```javascript
{loading && (
  <div className="text-center py-12">
    <p className="text-gray-600">Loading...</p>
  </div>
)}
```

## Integration Examples for Each Page

### Past Events (`src/pages/PastEvent.jsx`)

```javascript
import useFirestoreCollection from "../hooks/useFirestoreCollection";
import { COLLECTIONS } from "../services/firestoreService";
import events from "../data/PastEvent/PastEventData";

const PastEventsSection = () => {
  const { data: firebaseEvents, loading } = useFirestoreCollection(
    COLLECTIONS.PAST_EVENTS
  );
  
  const displayEvents = firebaseEvents.length > 0 ? firebaseEvents : events;
  
  return (
    // ... existing JSX with displayEvents instead of events
  );
};
```

### Workshops (`src/pages/WorkShop.jsx`)

```javascript
import useFirestoreCollection from "../hooks/useFirestoreCollection";
import { COLLECTIONS } from "../services/firestoreService";
import Events from "../data/WorkShop/Events";

const WorkshopsSection = () => {
  const { data: firebaseWorkshops, loading } = useFirestoreCollection(
    COLLECTIONS.WORKSHOPS
  );
  
  const workshops = firebaseWorkshops.length > 0 ? firebaseWorkshops : Events;
  
  return (
    // ... existing JSX with workshops
  );
};
```

### Flagship Programs (`src/pages/FlagShipProg.jsx`)

```javascript
import useFirestoreCollection from "../hooks/useFirestoreCollection";
import { COLLECTIONS } from "../services/firestoreService";
import Events from "../data/FlagShip/Events";

const FlagshipProgramsSection = () => {
  const { data: firebasePrograms, loading } = useFirestoreCollection(
    COLLECTIONS.FLAGSHIP_PROGRAMS
  );
  
  const programs = firebasePrograms.length > 0 ? firebasePrograms : Events;
  
  return (
    // ... existing JSX with programs
  );
};
```

### Weekly Cadence (`src/pages/WeeklyCadence.jsx`)

```javascript
import useFirestoreCollection from "../hooks/useFirestoreCollection";
import { COLLECTIONS } from "../services/firestoreService";
import Events from "../data/WeeklyCadence/Events";

const WeeklyCadenceSection = () => {
  const { data: firebaseCadences, loading } = useFirestoreCollection(
    COLLECTIONS.WEEKLY_CADENCES
  );
  
  const cadences = firebaseCadences.length > 0 ? firebaseCadences : Events;
  
  return (
    // ... existing JSX with cadences
  );
};
```

### Our Team (`src/pages/OurTeam.jsx`)

For team pages, you'll need to filter by team:

```javascript
import useFirestoreCollection from "../hooks/useFirestoreCollection";
import { COLLECTIONS } from "../services/firestoreService";

const OurTeam = () => {
  const { data: allMembers, loading } = useFirestoreCollection(
    COLLECTIONS.TEAM_MEMBERS
  );
  
  // Filter members by team
  const leadMembers = allMembers.filter(m => m.team === "Lead");
  const techMembers = allMembers.filter(m => m.team === "Tech");
  const designMembers = allMembers.filter(m => m.team === "Design");
  const prMembers = allMembers.filter(m => m.team === "PR");
  const mediaMembers = allMembers.filter(m => m.team === "Media");
  
  return (
    // ... pass filtered members to each team component
    <Lead members={leadMembers} />
    <Tech members={techMembers} />
    // ... etc
  );
};
```

### Plan of Action (`src/pages/PlanOfAction.jsx`)

```javascript
import useFirestoreCollection from "../hooks/useFirestoreCollection";
import { COLLECTIONS } from "../services/firestoreService";

const PlanOfActionSection = () => {
  const { data: planItems, loading } = useFirestoreCollection(
    COLLECTIONS.PLAN_OF_ACTION
  );
  
  // Group by category if needed
  const goals = planItems.filter(item => item.category === "Goal");
  const objectives = planItems.filter(item => item.category === "Objective");
  
  return (
    // ... display plan items
  );
};
```

## Benefits of This Approach

1. **Real-time Updates**: Changes in admin panel reflect immediately on public site
2. **Backward Compatible**: Falls back to static data if Firebase is not configured
3. **No Redeployment**: Content updates don't require rebuilding the app
4. **Centralized Data**: Single source of truth in Firebase

## Testing

1. Start your dev server: `npm run dev`
2. Navigate to `/admin/login` and sign in
3. Add/edit/delete content in any section
4. Navigate to the public page and see changes reflected in real-time
5. Open the page in multiple browser windows to see live synchronization

## Error Handling

The `useFirestoreCollection` hook handles errors gracefully. You can display errors if needed:

```javascript
const { data, loading, error } = useFirestoreCollection(COLLECTIONS.YOUR_COLLECTION);

if (error) {
  return <div>Error loading data: {error.message}</div>;
}
```

## Performance Optimization

Firebase listeners are automatically cleaned up when components unmount. For better performance on large collections:

1. Add pagination in admin panel
2. Use Firebase query limits
3. Implement caching strategies
4. Consider using Firebase's offline persistence

## Next Steps

1. Update remaining public pages with Firebase integration
2. Test all CRUD operations
3. Configure Firebase security rules for production
4. Set up Firebase hosting (optional)
5. Add image upload functionality using Firebase Storage
