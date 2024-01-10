import Loginpage from './components/Loginpage';
import Welcomepage from './components/Welcomepage';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Registerpage from './components/Registerpage';
import { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import "firebase/auth";

function App() {
  useEffect(() => {

    const firebaseConfig = {
      apiKey: "AIzaSyBCGhj6Hlsa8bu1SDRKI6uOTwOv8KFrGUc",
      authDomain: "otp-verification-d84c5.firebaseapp.com",
      projectId: "otp-verification-d84c5",
      storageBucket: "otp-verification-d84c5.appspot.com",
      messagingSenderId: "38447685949",
      appId: "1:38447685949:web:5f38ea786946027194a554"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
  })

  return (
    <>

      <Router>
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/" element={<Registerpage />} />
          <Route path="/welcomepage/:email" element={<Welcomepage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;   
