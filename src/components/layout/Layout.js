import { Fragment, useState, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../navigation/NavBar";
import Drawer from "../navigation/Drawer";
import Footer from "../navigation/Footer";
import Home from "../../pages/HomePage";
import AboutPage from "../../pages/about/AboutPage";
import AppPage from "../../pages/app/AppPage";
import ForgotPasswordPage from "../../pages/auth/ForgotPage";
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";
import NoteCollectionPage from "../../pages/notes/NoteCollectionPage";
import NewNotePage from "../../pages/notes/NewNotePage";
import NoteDetailPage from "../../pages/notes/NoteDetailPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import NotFoundPage from "../../pages/NotFoundPage";
import ProtectedRoute from "../router/ProtectedRoute";
import GlobalLoading from "./GlobalLoading";
import GlobalModal from "./GlobalModal";

export default function Layout() {
  const [isDrawerOpen, setDrawerIsOpen] = useState(false);
  const notLoggedInAboutSectionRef = useRef();
  const location = useLocation();

  let isFooterVisible = true;
  if (location.pathname.includes("auth")) {
    isFooterVisible = false;
  } else if (location.pathname.includes("/notes/")) {
    isFooterVisible = false;
  }

  return (
    <Fragment>
      <Drawer isOpen={isDrawerOpen} setIsOpen={setDrawerIsOpen} />
      {location.pathname.indexOf("auth") < 1 && (
        <Navbar
          isDynamic={location.pathname === "/" || location.pathname === "/app"}
          setIsOpen={setDrawerIsOpen}
          aboutSectionRef={notLoggedInAboutSectionRef}
        />
      )}
      <GlobalModal />
      <GlobalLoading />
      <Routes>
        <Route
          path="/"
          element={<Home aboutSectionRef={notLoggedInAboutSectionRef} />}
        />
        <Route path="/auth/forgot" element={<ForgotPasswordPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NoteCollectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/new/:title"
          element={
            <ProtectedRoute>
              <NewNotePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <ProtectedRoute>
              <NoteDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isFooterVisible && <Footer />}
    </Fragment>
  );
}
