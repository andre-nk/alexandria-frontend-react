import { Fragment, useState } from "react";
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
import ProfileDetailPage from "../../pages/profile/ProfileDetailPage";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Layout() {
  const { user, authIsReady } = useAuthContext();
  const [isDrawerOpen, setDrawerIsOpen] = useState(false);
  const location = useLocation();

  if (authIsReady && user === null) {
    return (
      <Fragment>
        <Drawer isOpen={isDrawerOpen} setIsOpen={setDrawerIsOpen} />
        {location.pathname.indexOf("auth") < 1 && (
          <Navbar
            isDynamic={
              location.pathname === "/" || location.pathname === "/app"
            }
            setIsOpen={setDrawerIsOpen}
          />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/forgot" element={<ForgotPasswordPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/app" element={<AppPage />} />
        </Routes>
        {location.pathname.indexOf("auth") < 1 && <Footer />}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Drawer isOpen={isDrawerOpen} setIsOpen={setDrawerIsOpen} />
      {location.pathname.indexOf("auth") < 1 && (
        <Navbar
          isDynamic={location.pathname === "/" || location.pathname === "/app"}
          setIsOpen={setDrawerIsOpen}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/forgot" element={<ForgotPasswordPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/notes" element={<NoteCollectionPage />} />
        <Route path="/notes/new/:title" element={<NewNotePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:id" element={<ProfileDetailPage />} />
      </Routes>
      {location.pathname.indexOf("auth") < 1 && <Footer />}
    </Fragment>
  );
}
