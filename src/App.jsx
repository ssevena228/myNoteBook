import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Notes from "./page/Notes";
import About from "./page/About";
import Contact from "./page/Contact";
import CreateNote from "./components/CreateNote";
import ErrorPage from "./page/ErrorPage";
import Login from "./page/Login";
import Signup from "./page/Signup";
import { useAuthState } from "./contextapi/AuthState";
import Loader from "./page/Loader";
import "./App.css";
import ProtectAuth from "./components/ProtectAuth";

function App() {
  const { getProfileFunc, checker } = useAuthState();

  useEffect(() => {
    getProfileFunc();
  }, []);

  if (checker) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes category="public" />} />
        <Route path="/yournotes" element={<Notes category="private" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/createnote"
          element={
            <ProtectAuth>
              <CreateNote />
            </ProtectAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
