import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';
import appTheme from '../theme';

const FormContainer = styled(Paper)({
  padding: appTheme.spacing(4),
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
  backgroundColor: 'transparent',
  boxShadow: appTheme.shadows[1],
  zIndex: 1,
});

const AuthForm = ({ title, fields, onSubmit, error, link }) => {
  const [formData, setFormData] = useState(
      fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
      <FormContainer elevation={6}>
        <Typography variant="h6" color="primary" sx={{ fontFamily: 'Michroma, sans-serif', mb: 4 }}>
          {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
              <TextField
                  key={field.name}
                  label={field.label}
                  type={field.type}
                  name={field.name}
                  fullWidth
                  variant="outlined"
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
              />
          ))}
          {error && (
              <Typography color="error" variant="body2" align="center" gutterBottom>
                {error}
              </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
            {title}
          </Button>
          {link && (
              <Typography variant="body2" align="center">
                {link.text}{' '}
                <Link href={link.href} color="primary">
                  {link.linkText}
                </Link>
              </Typography>
          )}
        </form>
      </FormContainer>
  );
};

export default AuthForm;
