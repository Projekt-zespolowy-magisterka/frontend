// userService.js

const mockUserProfile = {
    email: 'mockuser@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '123-456-7890',
    address: {
        street: '123 Mock Street',
        city: 'Mockville',
        zip: '12345',
    },
};

export const getUserProfile = async (userId) => {
    try {
        // Replace with your API endpoint
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user profile:', error);
        console.warn('Using mock user profile data');
        return mockUserProfile; // Fallback to mock data
    }
};

export const updateUserProfile = async (userId, updatedProfile) => {
    try {
        // Replace with your API endpoint
        const response = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProfile),
        });
        if (!response.ok) {
            throw new Error('Failed to update user profile');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error; // Let the caller handle the error
    }
};
