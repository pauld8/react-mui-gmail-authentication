import { createTheme } from '@mui/material';

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000000',
    },
  },

  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-track': {
            backgroundColor: '#000000',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '& .MuiChip-label': {
            color: '#000000',
          },
          '& .MuiChip-deleteIcon': {
            color: '#000000',
          },
          '& .MuiChip-deleteIcon:hover': {
            color: '#000000',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            color: '#000000',
          },
          '& label': {
            color: '#000000',
          },
          '& label.Mui-focused': {
            color: '#000000',
          },

          '& .MuiInputBase-root': {
            '& fieldset': {
              borderColor: '#000000',
            },
            '&:hover fieldset': {
              borderColor: '#000000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000000',
            },
          },
        },
      },
    },
  },
});

export default dark;
