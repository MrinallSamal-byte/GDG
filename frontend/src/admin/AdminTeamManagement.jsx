import React from 'react';
import DataManager from './components/DataManager';

const AdminTeamManagement = () => {
  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Full name' },
    { name: 'role', label: 'Role', type: 'text', required: true, placeholder: 'Position/Role' },
    { 
      name: 'department', 
      label: 'Department', 
      type: 'select', 
      required: true,
      options: ['Tech', 'Design', 'PR', 'Media', 'Lead']
    },
    { name: 'imageUrl', label: 'Image URL', type: 'url', placeholder: 'https://...' },
    { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Short biography' },
    { name: 'order', label: 'Display Order', type: 'number', placeholder: '0' },
  ];

  return <DataManager collection="team-members" title="Team Member" fields={fields} />;
};

export default AdminTeamManagement;
