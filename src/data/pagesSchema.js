// src/data/pagesSchema.js
// Schema for all pages in src/pages/

import Home from '../pages/Home.jsx';
import AboutUs from '../pages/AboutUs.jsx';
import CommunityEvents from '../pages/CommunityEvents.jsx';
import Contact from '../pages/Contact.jsx';
import FlagShipProg from '../pages/FlagShipProg.jsx';
import OurTeam from '../pages/OurTeam.jsx';
import PastEvent from '../pages/PastEvent.jsx';
import PlanOfAction from '../pages/PlanOfAction.jsx';
import SignatureEvents from '../pages/SignatureEvents.jsx';
import WeeklyCadence from '../pages/WeeklyCadence.jsx';
import WorkShop from '../pages/WorkShop.jsx';

export const pagesSchema = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About Us', component: AboutUs },
  { path: '/community-events', name: 'Community Events', component: CommunityEvents },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/flagship-programs', name: 'Flagship Programs', component: FlagShipProg },
  { path: '/our-team', name: 'Our Team', component: OurTeam },
  { path: '/past-events', name: 'Past Events', component: PastEvent },
  { path: '/plan-of-action', name: 'Plan Of Action', component: PlanOfAction },
  { path: '/signature-events', name: 'Signature Events', component: SignatureEvents },
  { path: '/weekly-cadence', name: 'Weekly Cadence', component: WeeklyCadence },
  { path: '/workshop', name: 'Workshop', component: WorkShop },
];
