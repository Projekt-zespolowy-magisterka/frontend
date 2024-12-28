// userService.js

const getAuthHeaders = () => {
    const userToken = localStorage.getItem('userToken');
    return userToken ? {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json', // Ensure correct Content-Type
    } : {};
};

export const getUserProfile = async () => {
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
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const updateUserProfile = async (updatedProfile) => {
    try {

        console.info(JSON.stringify(updatedProfile))

        const response = await fetch('http://localhost:8080/app/users/me', {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(updatedProfile),
        });

        if (!response.ok) {
            throw new Error(`Failed to update user profile: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

