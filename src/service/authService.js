import axios from 'axios';
import {config} from "../profiles";

export const registerUser = async (registrationData) => {
    try {
        const response = await axios.post(`${config.API_BASE_URL}/app/register`, registrationData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);

        if (error.response) {
            const { status, data } = error.response;
            console.error(`Server Error [${status}]:`, data);
            throw data?.message || `Server Error: ${status}`;
        } else if (error.request) {
            console.error('No response received from server:', error.request);
            throw 'Unable to connect to the server. Please try again later.';
        } else {
            console.error('Request setup error:', error.message);
            throw 'An unexpected error occurred. Please try again.';
        }
    }
};

export const authenticateUser = async (authRequest) => {
    try {
        const response = await axios.post(`${config.API_BASE_URL}/app/auth`, authRequest, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            console.error(`Error: Server responded with status ${status}`, data);
            throw new Error(data?.message || `Authentication failed with status code ${status}`);
        } else if (error.request) {
            console.error('Error: No response received from the server', error.request);
            throw new Error('Network error: Unable to connect to the authentication service.');
        } else {
            console.error('Error: Request setup failed', error.message);
            throw new Error(`Unexpected error: ${error.message}`);
        }
    }
};
