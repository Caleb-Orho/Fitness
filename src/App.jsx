import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import SignIn from './Components/Auth/Signin';
import SignUp from './Components/Auth/SignUp';
import HomeScreen from "./Components/Workout/HomeScreen";

function App() {

  return (
    // <div>
    //   {/* <SignIn /> */}
    //   <SignUp />
    // </div>

    <BrowserRouter>
      <Routes>
        <Route index element={<SignUp />} />
        <Route path="SignIn" element={<SignIn />} />
        <Route path="HomeScreen" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
