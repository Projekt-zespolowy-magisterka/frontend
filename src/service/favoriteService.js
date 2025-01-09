import {config} from "../profiles";

const getAuthHeaders = () => {
    const userToken = localStorage.getItem('userToken');
    return userToken
        ? {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        }
        : {};
};

export const getFavoriteStocks = async () => {
    try {
        const response = await fetch(`${config.API_BASE_URL}/app/favorites`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch favorite stocks: ${response.statusText}`);
        }

        const data = await response.json();
        return data.stockSymbol || [];
    } catch (error) {
        console.error('Error fetching favorite stocks:', error);
        throw error;
    }
};

export const addFavoriteStock = async (stockSymbol) => {
    try {
        const response = await fetch(`${config.API_BASE_URL}/app/favorites`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ stockSymbol: [stockSymbol] }),
        });

        if (!response.ok) {
            throw new Error(`Failed to add favorite stock: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding favorite stock:', error);
        throw error;
    }
};

export const removeFavoriteStock = async (stockSymbol) => {
    try {
        const response = await fetch(`${config.API_BASE_URL}/app/favorites/${stockSymbol}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Failed to remove favorite stock: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error removing favorite stock:', error);
        throw error;
    }
};
