import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import SnackbarProvider from "react-simple-snackbar";

import { AuthContextProvider } from "./context/AuthContext";
import { LoadingContextProvider } from "./context/LoadingContext";
import { ModalContextProvider } from "./context/ModalContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LoadingContextProvider>
        <ModalContextProvider>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </ModalContextProvider>
      </LoadingContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
