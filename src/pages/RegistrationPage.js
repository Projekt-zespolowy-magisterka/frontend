import React, { useState } from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundImage from '../components/BackgroundImage';
import LogoSection from '../components/LogoSection';
import AuthForm from '../components/AuthForm';
import appTheme from '../theme';
import {useNavigate} from "react-router-dom";

const RegistrationPageContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: appTheme.palette.background.default,
    position: 'relative',
});


const RegistrationPage = ({ onLogin }) => {
    const [registrationError, setRegistrationError] = useState('');
    const navigate = useNavigate();

    const handleRegister = ({ email, password, confirmPassword }) => {
        setRegistrationError('');
        if (password !== confirmPassword) {
            setRegistrationError('Passwords do not match');
            return;
        }
        onLogin(email);
        navigate('/stock-overview');
    };

    return (
        <RegistrationPageContainer>
            <BackgroundImage />
            <LogoSection />
            <AuthForm
                title="Register"
                fields={[
                    { name: 'email', label: 'Email', type: 'email' },
                    { name: 'password', label: 'Password', type: 'password' },
                    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
                ]}
                onSubmit={handleRegister}
                error={registrationError}
                link={{
                    text: "Already have an account?",
                    linkText: 'Log in here',
                    href: '/login',
                }}
            />
        </RegistrationPageContainer>
    );
};

export default RegistrationPage;
