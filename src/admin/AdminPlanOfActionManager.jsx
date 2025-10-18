import React from 'react';
import DataManager from './components/DataManager';

const AdminPlanOfActionManager = () => {
  const fields = [
    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Action item title' },
    { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Detailed description' },
    { 
      name: 'category', 
      label: 'Category', 
      type: 'select', 
      required: true,
      options: ['technical', 'community', 'outreach', 'internal', 'other']
    },
    { 
      name: 'priority', 
      label: 'Priority', 
      type: 'select', 
      required: true,
      options: ['low', 'medium', 'high', 'urgent']
    },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select', 
      required: true,
      options: ['planned', 'in-progress', 'completed', 'on-hold']
    },
    { name: 'targetDate', label: 'Target Date', type: 'date' },
    { name: 'order', label: 'Display Order', type: 'number', placeholder: '0' },
  ];

  return <DataManager collection="plan-of-action" title="Plan of Action" fields={fields} />;
};

export default AdminPlanOfActionManager;
