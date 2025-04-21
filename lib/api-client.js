// API client with Cognito authentication

// API endpoint URL - would come from environment variables in production
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://hzyfzpi9d2.execute-api.us-east-1.amazonaws.com/prod";

/**
 * API client for interacting with the serverless backend
 */
export const apiClient = {
  /**
   * Send a request to the API with authentication
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @param {string} token - Auth token
   * @returns {Promise<Object>} - Response data
   */
  async request(endpoint, options = {}, token) {
    const url = `${API_URL}${endpoint}`;
    
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    };
    
    const config = {
      ...options,
      headers
    };
    
    try {
      const response = await fetch(url, config);
      
      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }
      
      // Parse JSON response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API request to ${endpoint} failed:`, error);
      throw error;
    }
  },

  // The rest of your API methods remain the same
  products: {
    getAll: (query = "", token) => {
      const endpoint = `/products${query ? `?query=${encodeURIComponent(query)}` : ""}`;
      return apiClient.request(endpoint, { method: "GET" }, token);
    },
    
    getById: (id, token) => {
      return apiClient.request(`/products/${id}`, { method: "GET" }, token);
    }
  },
  
  orders: {
    getAll: (token) => {
      return apiClient.request("/orders", { method: "GET" }, token);
    },
    
    create: (orderData, token) => {
      return apiClient.request("/orders", {
        method: "POST",
        body: JSON.stringify(orderData)
      }, token);
    }
  },
  
  user: {
    getProfile: (token) => {
      return apiClient.request("/users/me", { method: "GET" }, token);
    }
  }
};