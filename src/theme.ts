import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
    h1: {
      fontSize: 56,
      fontFamily: 'Montserrat',
      fontWeight: 700,
      color: '#ffffff',
      letterSpacing: '0.03em',
      textTransform: 'uppercase'
    },
    body1: {
      color: '#ffffff'
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#539713'
    },
    background: {
      default: '#ffffff'
    }
  },
  components: {
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: '14px',
          marginBottom: '5.5px'
        }
      }
    },
    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          fontSize: '14px',
          marginBottom: '5.5px'
        }
      }
    },
    MuiIconButton: {
      defaultProps: {
        sx: {
          padding: '2px',
          marginBottom: '6px'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        sx: {
          padding: '9.5px 16px',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '155%'
        }
      }
    }
  }
});

export default theme;
