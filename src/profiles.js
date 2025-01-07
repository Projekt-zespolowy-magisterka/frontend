const profiles = {
    local: {
        API_BASE_URL: 'http://localhost:8080',
    },
    docker: {
        API_BASE_URL: 'http://backend-api-gateway:8080',
    },
    production: {
        API_BASE_URL: 'https://api.myapp.com',
    },
};

const activeProfile = process.env.REACT_APP_PROFILE || 'local';

export const config = profiles[activeProfile];
