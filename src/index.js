import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import SnackbarProvider from 'react-simple-snackbar'

import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
