import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import SnackbarProvider from "react-simple-snackbar";

import { AuthContextProvider } from "./context/AuthContext";
import { LoadingContextProvider } from "./context/LoadingContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LoadingContextProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </LoadingContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
