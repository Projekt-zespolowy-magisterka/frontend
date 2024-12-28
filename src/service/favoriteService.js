const getAuthHeaders = () => {
    const userToken = localStorage.getItem('userToken');
    return userToken
        ? {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        }
        : {};
};

export const getFavoriteStocks = async () => {
    try {
        const response = await fetch('http://localhost:8080/app/favorites', {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch favorite stocks: ${response.statusText}`);
        }

        console.log(response)

        const data = await response.json();

        console.log(data)

        // Ensure data.stockSymbol is returned as an array
        return data.stockSymbol || [];
    } catch (error) {
        console.error('Error fetching favorite stocks:', error);
        throw error;
    }
};


export const addFavoriteStock = async (stockSymbol) => {
    try {
        const response = await fetch('http://localhost:8080/app/favorites', {
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
        const response = await fetch(`http://localhost:8080/app/favorites/${stockSymbol}`, {
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
