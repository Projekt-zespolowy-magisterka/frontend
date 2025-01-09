import React, { useState } from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundImage from '../components/BackgroundImage';
import LogoSection from '../components/LogoSection';
import AuthForm from '../components/AuthForm';
import appTheme from '../theme';
import {useNavigate} from "react-router-dom";
import {registerUser} from "../service/authService";

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
    const handleRegister = async (formData) => {
        setRegistrationError('');
        const { email, password, confirmPassword, firstName, lastName, phone, city, street, zip } =
            formData;

        if (password !== confirmPassword) {
            setRegistrationError('Passwords do not match');
            return;
        }

        try {
            // Call the registerUser function and expect a structured response
            const response = await registerUser({
                email,
                password,
                firstName,
                lastName,
                phone,
                address: { city, street, zip },
            });


            if (response && response.token && response.id) {
                console.log('User registered:', response);

                onLogin(email, response.token, response.id);
                navigate('/stock-overview');
            } else {
                throw new Error('Invalid registration response');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setRegistrationError(error.message || 'Registration failed');
        }
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
                    { name: 'firstName', label: 'First Name', type: 'text' },
                    { name: 'lastName', label: 'Last Name', type: 'text' },
                    // { name: 'phone', label: 'Phone Number', type: 'tel' },
                    { name: 'city', label: 'City', type: 'text' },
                    { name: 'street', label: 'Street', type: 'text' },
                    // { name: 'zip', label: 'ZIP Code', type: 'text' },
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
