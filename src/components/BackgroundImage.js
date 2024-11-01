import React from 'react';
import { styled } from '@mui/system';

const StyledBackgroundImage = styled('div')({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100vw',
  height: '100vh',
  backgroundImage: 'url("/images/background.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  zIndex: -1,
});

const BackgroundImage = () => <StyledBackgroundImage />;

export default BackgroundImage;
