import { config } from '../profiles';

const getAuthHeaders = () => {
    const userToken = localStorage.getItem('userToken');
    return userToken
        ? {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        }
        : {};
};

export const getUserProfile = async () => {
    try {
        const response = await fetch(`${config.API_BASE_URL}/app/users/me`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user profile: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const updateUserProfile = async (updatedProfile) => {
    try {
        const response = await fetch(`${config.API_BASE_URL}/app/users/me`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(updatedProfile),
        });

        if (!response.ok) {
            throw new Error(`Failed to update user profile: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};
