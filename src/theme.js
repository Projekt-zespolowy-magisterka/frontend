import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#393be4', // Formerly secondary color
      contrastText: '#ffffff', // White text on primary
    },
    secondary: {
      main: '#76b5f6', // Formerly primary color
      contrastText: '#000000', // Black text on secondary
    },
    background: {
      default: 'transparent', // Light background for the entire app
      paper: '#ffffff', // White for paper elements like cards
    },
    text: {
      primary: '#333333', // Dark grey for primary text
      secondary: '#666666', // Medium grey for secondary text
    },
    error: {
      main: '#f44336', // Red for error messages
    },
    success: {
      main: '#4caf50', // Green for success messages
    },
    warning: {
      main: '#ffa726', // Orange for warnings
    },
    info: {
      main: '#29b6f6', // Light blue for informational elements
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Base font
    h1: {
      fontFamily: 'Michroma, sans-serif', // Use Michroma for large headers
      fontWeight: 'bold',
    },
    h2: {
      fontFamily: 'Michroma, sans-serif',
      fontWeight: 'bold',
    },
    h3: {
      fontFamily: 'Michroma, sans-serif',
      fontWeight: 'bold',
    },
    h4: {
      fontFamily: 'Roboto, sans-serif', // Use Roboto for smaller headers
      fontWeight: 'bold',
    },
    h5: {
      fontFamily: 'Roboto, sans-serif',
    },
    h6: {
      fontFamily: 'Roboto, sans-serif',
    },
    body1: {
      fontFamily: 'Roboto, sans-serif', // Base font for body text
      fontWeight: 'normal',
    },
    button: {
      fontFamily: 'Michroma, sans-serif', // Use Michroma for button accents
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 'px', // Rounded corners for buttons
          textTransform: 'none', // Preserve case on buttons
          padding: '8px 16px',
          fontFamily: 'Michroma, sans-serif', // Accent font for buttons
        },
        containedPrimary: {
          color: '#ffffff', // White text on primary buttons
          backgroundColor: '#393be4',
        },
        containedSecondary: {
          color: '#000000', // Black text on secondary buttons
          backgroundColor: '#76b5f6',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
        //   marginBottom: '16px',
          backgroundColor: '#ffffff', // White background for input fields
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent', // Primary color for app bar
          color: '#ffffff', // White text on app bar
        },
      },
    },
  },
});

export default theme;
