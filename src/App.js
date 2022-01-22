import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/navigation/NavBar";
import Footer from "./components/navigation/Footer";
import Home from "./pages/HomePage";
import AboutPage from "./pages/about/AboutPage";
import AppPage from "./pages/app/AppPage";
import ForgotPasswordPage from "./pages/auth/ForgotPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NoteCollectionPage from "./pages/notes/NoteCollectionPage";
import NewNotePage from "./pages/notes/NewNotePage";
import NoteDetailPage from "./pages/notes/NoteDetailPage";
import ProfilePage from "./pages/profile/ProfilePage"
import ProfileDetailPage from "./pages/profile/ProfileDetailPage"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar isDynamic={true} />
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
          <Route path="/notes/:id" element={<ProfileDetailPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
