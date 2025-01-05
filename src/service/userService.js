// userService.js

const getAuthHeaders = () => {
    const userToken = localStorage.getItem('userToken');
    return userToken
      ? {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        }
      : {};
  };
  
  // Funkcja do pobrania danych aktualnie zalogowanego użytkownika
  export const getCurrentUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:8080/app/users/me', {
        method: 'GET',
        headers: getAuthHeaders(),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch user profile: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error fetching current user profile:', error);
      throw error;
    }
  };
  

  export const getUserProfileById = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/app/users/${userId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch user by ID: ${response.statusText}`);
      }
  
      // JAKIE DOKŁADNIE DANE ZWRACA BACKEND?
      const data = await response.json();
      return data;  // Może tu być np. data.user albo inna właściwość
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  };
  
  
  // Funkcja do aktualizacji aktualnie zalogowanego użytkownika
  export const updateCurrentUserProfile = async (updatedProfile) => {
    try {
      const response = await fetch('http://localhost:8080/app/users/me', {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedProfile),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update current user profile: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating current user profile:', error);
      throw error;
    }
  };
  
  // Funkcja do aktualizacji dowolnego użytkownika po ID (dla admina)
  export const updateUserProfileById = async (userId, updatedProfile) => {
    try {
      const response = await fetch(`http://localhost:8080/app/users/${userId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedProfile),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update user by ID: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating user by ID:', error);
      throw error;
    }
  };
  