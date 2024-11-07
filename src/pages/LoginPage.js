import React, { useState } from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundImage from '../components/BackgroundImage';
import LogoSection from '../components/LogoSection';
import AuthForm from '../components/AuthForm';
import appTheme from '../theme';
import {useNavigate} from "react-router-dom";

const LoginPageContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: appTheme.palette.background.default,
    position: 'relative',
});

const LoginPage = ({ onLogin }) => {
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleLogin = ({ email, password }) => {
        setLoginError('');
        if (email === 'test@example.com' && password === 'password') {
            onLogin(email);
            navigate('/stock-overview');
        } else {
            setLoginError('Invalid email or password');
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
