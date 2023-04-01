import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  root: {
    borderRadius: 0
  },
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
    primary: {
      main: '#539713'
    },
    text: {
      primary: '#FFFFFF'
    }
  }
});

export default theme;
