// ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  getCurrentUserProfile,
  getUserProfileById,
  updateCurrentUserProfile,
  updateUserProfileById,
} from '../service/userService';

const ProfilePage = ({ onLogout }) => {
  const [userDetails, setUserDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Wyciągamy ?id=... z query param
  // np. /profile?id=7
  const searchParams = new URLSearchParams(location.search);
  const userIdParam = searchParams.get('id'); // np. "7" lub null

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let profileData;
        if (userIdParam) {
          // Admin edytuje usera o podanym ID
          profileData = await getUserProfileById(userIdParam);
        } else {
          // Zwykły user pobiera swój profil
          profileData = await getCurrentUserProfile();
        }
  
        console.log("profileData = ", profileData);
        /*
          Tu zobacz w konsoli co EXACTLY jest w profileData
          np.:
          - { user: {...}, message: "User found" }
          - albo bezpośrednio { id, firstName, ... }
          - albo w ogóle data.user
        */
  
        // Warunek: jeśli profileData ma klucz "user", to weź profileData.user,
        // inaczej przypisz wprost profileData:
        if (profileData && profileData.user) {
          setUserDetails(profileData.user);
        } else {
          setUserDetails(profileData);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setError('Failed to load profile. Please try again.');
      }
    };
  
    fetchProfile();
        console.log(userDetails);
  }, [userIdParam]);
  
  
  

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError('');
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (userIdParam) {
        // Jeśli mamy ID → admin
        await updateUserProfileById(userIdParam, userDetails);
      } else {
        // Jeśli brak ID → aktualnie zalogowany user
        await updateCurrentUserProfile(userDetails);
      }
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
              <Card.Title className="text-center mb-4">
                {userIdParam ? `Edit User #${userIdParam}` : 'My Profile'}
              </Card.Title>

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

                {/* Adres (jeśli istnieje) */}
                <Form.Group controlId="formAddress" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Street"
                    value={userDetails.address?.street || ''}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        address: {
                          ...userDetails.address,
                          street: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Control
                    type="text"
                    placeholder="City"
                    className="mt-2"
                    value={userDetails.address?.city || ''}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        address: {
                          ...userDetails.address,
                          city: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Control
                    type="text"
                    placeholder="ZIP Code"
                    className="mt-2"
                    value={userDetails.address?.zip || ''}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        address: {
                          ...userDetails.address,
                          zip: e.target.value,
                        },
                      })
                    }
                  />
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
                  <Button
                    variant="outline-secondary"
                    onClick={handleEditToggle}
                    className="me-2"
                  >
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
