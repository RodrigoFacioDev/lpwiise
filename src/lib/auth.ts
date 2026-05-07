import { apiFetch } from './api';

export const auth = {
  async register(data: any) {
    return apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async login(data: any) {
    const response = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  },

  logout() {
    localStorage.removeItem('auth_token');
    window.location.href = '/auth/login';
  },

  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('auth_token');
  }
};
