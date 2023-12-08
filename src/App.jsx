import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import SignIn from './Components/Auth/Signin';
import SignUp from './Components/Auth/SignUp';
import HomeScreen from "./Components/Workout/HomeScreen";
import StartWorkOut from "./Components/Workout/StartWorkOut";

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
        <Route path="StartWorkOut" element={<StartWorkOut />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
