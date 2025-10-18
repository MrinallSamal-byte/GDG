const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class MongoDBService {
  constructor() {
    this.baseURL = `${API_URL}/api/admin`;
  }

  // Helper to get auth token
  getAuthHeaders() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Handle API errors
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  }

  // ==================== CREATE ====================
  async create(collection, data) {
    try {
      const response = await fetch(`${this.baseURL}/add/${collection}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(data),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Error creating ${collection}:`, error);
      throw error;
    }
  }

  // ==================== READ ====================
  async getAll(collection, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${this.baseURL}/list/${collection}${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Error fetching ${collection}:`, error);
      throw error;
    }
  }

  async getById(collection, id) {
    try {
      const response = await fetch(`${this.baseURL}/get/${collection}/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Error fetching ${collection} item:`, error);
      throw error;
    }
  }

  // ==================== UPDATE ====================
  async update(collection, id, data) {
    try {
      const response = await fetch(`${this.baseURL}/update/${collection}/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(data),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Error updating ${collection}:`, error);
      throw error;
    }
  }

  // ==================== DELETE ====================
  async delete(collection, id) {
    try {
      const response = await fetch(`${this.baseURL}/delete/${collection}/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Error deleting ${collection}:`, error);
      throw error;
    }
  }

  async bulkDelete(collection, ids) {
    try {
      const response = await fetch(`${this.baseURL}/bulk-delete/${collection}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ ids }),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Error bulk deleting ${collection}:`, error);
      throw error;
    }
  }

  // ==================== STATS ====================
  async getStats() {
    try {
      const response = await fetch(`${this.baseURL}/stats`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }
}

// Create singleton instance
const mongoDBService = new MongoDBService();

export default mongoDBService;
