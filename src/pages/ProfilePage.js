import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../service/userService';

const ProfilePage = ({ userId, onLogout }) => {
    const [userDetails, setUserDetails] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        try {
            const profile = await getUserProfile(userId);
            setUserDetails(profile.user);
            console.log(profile);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            setError('Failed to load profile. Please try again.');
        }
    };

    useEffect(() => {
        fetchUserProfile();
        console.log(userDetails);
    }, [userId]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setError('');
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await updateUserProfile(userDetails);
            await fetchUserProfile();
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
            setError('Failed to save changes. Please try again.');
        }
    };

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Profile</Card.Title>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <Form onSubmit={handleSaveChanges}>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={userDetails.email || ''}
                                        disabled={!isEditing}
                                        onChange={(e) =>
                                            setUserDetails({ ...userDetails, email: e.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group controlId="formFirstName" className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={userDetails.firstName || ''}
                                        disabled={!isEditing}
                                        onChange={(e) =>
                                            setUserDetails({ ...userDetails, firstName: e.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group controlId="formLastName" className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={userDetails.lastName || ''}
                                        disabled={!isEditing}
                                        onChange={(e) =>
                                            setUserDetails({ ...userDetails, lastName: e.target.value })
                                        }
                                    />
                                </Form.Group>

                                {/*<Form.Group controlId="formPhone" className="mb-3">*/}
                                {/*    <Form.Label>Phone Number</Form.Label>*/}
                                {/*    <Form.Control*/}
                                {/*        type="tel"*/}
                                {/*        value={userDetails.phone || ''}*/}
                                {/*        disabled={!isEditing}*/}
                                {/*        onChange={(e) =>*/}
                                {/*            setUserDetails({ ...userDetails, phone: e.target.value })*/}
                                {/*        }*/}
                                {/*    />*/}
                                {/*</Form.Group>*/}

                                <Form.Group controlId="formAddress" className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={userDetails.address?.street || ''}
                                        placeholder="Street"
                                        disabled={!isEditing}
                                        onChange={(e) =>
                                            setUserDetails({
                                                ...userDetails,
                                                address: { ...userDetails.address, street: e.target.value },
                                            })
                                        }
                                    />
                                    <Form.Control
                                        type="text"
                                        value={userDetails.address?.city || ''}
                                        placeholder="City"
                                        disabled={!isEditing}
                                        className="mt-2"
                                        onChange={(e) =>
                                            setUserDetails({
                                                ...userDetails,
                                                address: { ...userDetails.address, city: e.target.value },
                                            })
                                        }
                                    />
                                    {/*<Form.Control*/}
                                    {/*    type="text"*/}
                                    {/*    value={userDetails.address?.zip || ''}*/}
                                    {/*    placeholder="ZIP Code"*/}
                                    {/*    disabled={!isEditing}*/}
                                    {/*    className="mt-2"*/}
                                    {/*    onChange={(e) =>*/}
                                    {/*        setUserDetails({*/}
                                    {/*            ...userDetails,*/}
                                    {/*            address: { ...userDetails.address, zip: e.target.value },*/}
                                    {/*        })*/}
                                    {/*    }*/}
                                    {/*/>*/}
                                </Form.Group>

                                {isEditing ? (
                                    <>
                                        <Button variant="primary" type="submit" className="me-2">
                                            Save Changes
                                        </Button>
                                        <Button variant="secondary" onClick={handleEditToggle}>
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <Button variant="outline-secondary" onClick={handleEditToggle} className="me-2">
                                        Edit Profile
                                    </Button>
                                )}
                            </Form>

                            <Button variant="danger" onClick={handleLogout} className="mt-3">
                                Logout
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
