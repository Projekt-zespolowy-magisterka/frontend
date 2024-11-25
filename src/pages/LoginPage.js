import React, { useState } from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundImage from '../components/BackgroundImage';
import LogoSection from '../components/LogoSection';
import AuthForm from '../components/AuthForm';
import appTheme from '../theme';
import {useNavigate} from "react-router-dom";
import {authenticateUser} from "../service/authService";

const LoginPageContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: appTheme.palette.background.default,
    position: 'relative',
});

const testUser = {
    email: 'test@example.com',
    password: 'test',
    token: 'testToken123',
    id: '12345',
};

const LoginPage = ({ onLogin }) => {
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async ({ email, password }) => {
        setLoginError('');
        try {
            const response = await authenticateUser({ email, password });

            if (response) {
                onLogin(email, response.token, response.id);
                console.log('User login:', response);
                navigate('/stock-overview');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setLoginError('Invalid email or password');
            } else {
                setLoginError(error.message || 'An unexpected error occurred');
            }

            console.error('Server login error:', error);

            // Jeżeli serwer zawiedzie, próbujemy logowania na konto testowe
            if (email === testUser.email && password === testUser.password) {
                console.log('Logging in with test account');
                onLogin(testUser.email, testUser.token, testUser.id);
                navigate('/stock-overview');
            } else {
                // Wyświetlamy błąd w UI
                setLoginError('Invalid email or password (including test account)');
            }
        }
    };

    return (
        <LoginPageContainer>
            <BackgroundImage />
            <LogoSection />
            <AuthForm
                title="Log in"
                fields={[
                    { name: 'email', label: 'Email', type: 'email' },
                    { name: 'password', label: 'Password', type: 'password' },
                ]}
                onSubmit={handleLogin}
                error={loginError}
                link={{
                    text: "Don't have an account?",
                    linkText: 'Register here',
                    href: '/register',
                }}
            />
        </LoginPageContainer>
    );
};

export default LoginPage;
