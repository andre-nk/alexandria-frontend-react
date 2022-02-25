import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";
import { LoadingContextProvider } from "./context/LoadingContext";
import { ModalContextProvider } from "./context/ModalContext";
import { SnackbarContextProvider } from "./context/SnackbarContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LoadingContextProvider>
        <ModalContextProvider>
          <SnackbarContextProvider>
            <App />
          </SnackbarContextProvider>
        </ModalContextProvider>
      </LoadingContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
