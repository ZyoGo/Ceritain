import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightThemeOptions } from "../styles/theme";
import AppSetup from "./AppSetup";
import { SocketProvider } from "../providers/SocketProvider";

const theme = createTheme(lightThemeOptions);

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SocketProvider>
          <AppSetup />
        </SocketProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
