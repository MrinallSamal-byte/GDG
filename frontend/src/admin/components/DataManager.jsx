import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import mongoDBService from '../../services/mongoDBService';
import { useCollectionUpdates } from '../../hooks/useSocket';
import { useNotification } from '../NotificationProvider';

const DataManager = ({ collection, title, fields, onRefresh }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const { showSuccess, showError } = useNotification();

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [collection]);

  // Listen for real-time updates
  useCollectionUpdates(collection, (update) => {
    console.log('Real-time update received:', update);
    handleRealtimeUpdate(update);
    showInfo(`${title} ${update.action}d in real-time!`, 2000);
  }, [collection]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await mongoDBService.getAll(collection);
      setData(response.data || []);
    } catch (error) {
      showError(`Failed to fetch ${title}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRealtimeUpdate = (update) => {
    const { action, data: updatedData } = update;

    switch (action) {
      case 'create':
        setData((prev) => [updatedData, ...prev]);
        break;
      case 'update':
        setData((prev) =>
          prev.map((item) => (item._id === updatedData._id ? updatedData : item))
        );
        break;
      case 'delete':
        setData((prev) => prev.filter((item) => item._id !== updatedData._id));
        break;
      case 'bulk-delete':
        setData((prev) => prev.filter((item) => !updatedData.ids.includes(item._id)));
        break;
      default:
        fetchData();
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await mongoDBService.create(collection, formData);
      showSuccess(`${title} added successfully!`);
      setFormData({});
      setShowAddForm(false);
      // Data will be updated via Socket.IO
    } catch (error) {
      showError(`Failed to add ${title}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    if (editingId === id) {
      // Save changes
      setLoading(true);
      try {
        await mongoDBService.update(collection, id, formData);
        showSuccess(`${title} updated successfully!`);
        setEditingId(null);
        setFormData({});
        // Data will be updated via Socket.IO
      } catch (error) {
        showError(`Failed to update ${title}: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      // Start editing
      const item = data.find((d) => d._id === id);
      setFormData(item);
      setEditingId(id);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    setLoading(true);
    try {
      await mongoDBService.delete(collection, id);
      showSuccess(`${title} deleted successfully!`);
      // Data will be updated via Socket.IO
    } catch (error) {
      showError(`Failed to delete ${title}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) {
      showError('No items selected');
      return;
    }

    if (!window.confirm(`Delete ${selectedItems.length} items?`)) {
      return;
    }

    setLoading(true);
    try {
      await mongoDBService.bulkDelete(collection, selectedItems);
      showSuccess(`${selectedItems.length} items deleted!`);
      setSelectedItems([]);
      // Data will be updated via Socket.IO
    } catch (error) {
      showError(`Bulk delete failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const showInfo = (message, duration) => {
    const notification = useNotification();
    notification.showInfo(message, duration);
  };

  return (
    <Container>
      <Header>
        <Title>{title} Management</Title>
        <Actions>
          <Button onClick={() => setShowAddForm(!showAddForm)} primary>
            {showAddForm ? 'Cancel' : `+ Add ${title}`}
          </Button>
          {selectedItems.length > 0 && (
            <Button onClick={handleBulkDelete} danger>
              Delete {selectedItems.length} Selected
            </Button>
          )}
          <Button onClick={fetchData}>↻ Refresh</Button>
        </Actions>
      </Header>

      {showAddForm && (
        <Form onSubmit={handleAdd}>
          <FormTitle>Add New {title}</FormTitle>
          {fields.map((field) => (
            <FormGroup key={field.name}>
              <Label>{field.label}</Label>
              {field.type === 'textarea' ? (
                <TextArea
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  required={field.required}
                  placeholder={field.placeholder}
                />
              ) : field.type === 'select' ? (
                <Select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  type={field.type || 'text'}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  required={field.required}
                  placeholder={field.placeholder}
                />
              )}
            </FormGroup>
          ))}
          <Button type="submit" primary disabled={loading}>
            {loading ? 'Adding...' : `Add ${title}`}
          </Button>
        </Form>
      )}

      {loading && !showAddForm ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : data.length === 0 ? (
        <EmptyMessage>No {title} found. Add one to get started!</EmptyMessage>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>
                <input
                  type="checkbox"
                  checked={selectedItems.length === data.length}
                  onChange={() =>
                    setSelectedItems(
                      selectedItems.length === data.length ? [] : data.map((d) => d._id)
                    )
                  }
                />
              </Th>
              {fields.map((field) => (
                <Th key={field.name}>{field.label}</Th>
              ))}
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                <Td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => toggleSelectItem(item._id)}
                  />
                </Td>
                {fields.map((field) => (
                  <Td key={field.name}>
                    {editingId === item._id ? (
                      field.type === 'textarea' ? (
                        <TextArea
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                        />
                      ) : field.type === 'select' ? (
                        <Select
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                        >
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </Select>
                      ) : (
                        <Input
                          type={field.type || 'text'}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                        />
                      )
                    ) : (
                      <span>
                        {field.type === 'date'
                          ? new Date(item[field.name]).toLocaleDateString()
                          : item[field.name]}
                      </span>
                    )}
                  </Td>
                ))}
                <Td>
                  <ActionButton onClick={() => handleEdit(item._id)} disabled={loading}>
                    {editingId === item._id ? '💾 Save' : '✏️ Edit'}
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(item._id)} disabled={loading}>
                    🗑️ Delete
                  </ActionButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default DataManager;

// Styled Components
const Container = styled.div`
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.primary &&
    `
    background: #3b82f6;
    color: white;
    &:hover { background: #2563eb; }
  `}

  ${(props) =>
    props.danger &&
    `
    background: #ef4444;
    color: white;
    &:hover { background: #dc2626; }
  `}

  ${(props) =>
    !props.primary &&
    !props.danger &&
    `
    background: #e5e7eb;
    color: #374151;
    &:hover { background: #d1d5db; }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Form = styled.form`
  background: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const FormTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  color: #1f2937;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background: #f3f4f6;
  font-weight: 600;
  color: #1f2937;
  border-bottom: 2px solid #e5e7eb;
`;

const Tr = styled.tr`
  &:hover {
    background: #f9fafb;
  }
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;

  input,
  textarea,
  select {
    font-size: 12px;
  }
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  margin-right: 5px;
  border: none;
  background: #f3f4f6;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: #e5e7eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #6b7280;
  font-size: 16px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #9ca3af;
  font-size: 16px;
`;
