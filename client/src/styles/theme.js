/* eslint-disable import/prefer-default-export */

export const lightThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#673ab7",
      light: "#A081D5",
      dark: "#360D7D",
      contrastText: "rgba(255,255,255,1)",
    },
    secondary: {
      main: "#8bc34a",
      contrastText: "rgba(255,255,255,0.87)",
    },
  },
  typography: {
    // eslint-disable-next-line quotes
    fontFamily: '"Lato", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableFocusRipple: true,
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        containedPrimary: {
          textTransform: "capitalize",
        },
      },
    },
  },
};
