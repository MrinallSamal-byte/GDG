import React from 'react';
import DataManager from './components/DataManager';

const AdminEvents = () => {
  const fields = [
    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Event title' },
    { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Event description' },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'location', label: 'Location', type: 'text', placeholder: 'Event location' },
    { name: 'imageUrl', label: 'Image URL', type: 'url', placeholder: 'https://...' },
    { 
      name: 'category', 
      label: 'Category', 
      type: 'select', 
      required: true,
      options: ['signature', 'past', 'flagship', 'workshop', 'weekly-cadence']
    },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select', 
      required: true,
      options: ['upcoming', 'ongoing', 'completed', 'cancelled']
    },
  ];

  return <DataManager collection="events" title="Event" fields={fields} />;
};

export default AdminEvents;
