import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/app/user';

export const registerUser = async (registrationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, registrationData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data; // Return the response data directly
    } catch (error) {
        // Enhanced error handling with detailed fallback
        console.error('Error during registration:', error);

        if (error.response) {
            // Server responded with a status other than 2xx
            const { status, data } = error.response;
            console.error(`Server Error [${status}]:`, data);
            throw data?.message || `Server Error: ${status}`;
        } else if (error.request) {
            // No response received from the server
            console.error('No response received from server:', error.request);
            throw 'Unable to connect to the server. Please try again later.';
        } else {
            // Error in setting up the request
            console.error('Request setup error:', error.message);
            throw 'An unexpected error occurred. Please try again.';
        }
    }
};

export const authenticateUser = async (authRequest) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth`, authRequest, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
};