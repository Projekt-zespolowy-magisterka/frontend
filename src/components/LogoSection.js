import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import appTheme from '../theme';

const StyledLogoSection = styled('div')({
  position: 'absolute',
  top: appTheme.spacing(2),
  left: appTheme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  zIndex: 2,
});

const Logo = styled('img')({
  width: '50px',
  marginRight: appTheme.spacing(1),
});

const LogoSection = () => (
  <StyledLogoSection>
    <Logo src="/logo.svg" alt="StockMaster Logo" />
    <Typography variant="h6" color="primary" sx={{ fontFamily: 'Michroma, sans-serif' }}>
      StockMaster
    </Typography>
  </StyledLogoSection>
);

export default LogoSection;
