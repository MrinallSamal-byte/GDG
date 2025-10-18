import React from 'react';
import DataManager from './components/DataManager';

const AdminNotices = () => {
  const fields = [
    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Notice title' },
    { name: 'content', label: 'Content', type: 'textarea', required: true, placeholder: 'Notice content' },
    { 
      name: 'type', 
      label: 'Type', 
      type: 'select', 
      required: true,
      options: ['info', 'warning', 'success', 'urgent']
    },
    { 
      name: 'targetAudience', 
      label: 'Target Audience', 
      type: 'select', 
      required: true,
      options: ['all', 'members', 'public']
    },
    { name: 'priority', label: 'Priority', type: 'number', placeholder: '0 (higher = more important)' },
    { name: 'expiryDate', label: 'Expiry Date', type: 'date' },
  ];

  return <DataManager collection="notices" title="Notice" fields={fields} />;
};

export default AdminNotices;
