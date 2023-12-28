
import { useState } from 'react';
import './App.css';
import Home from './Component/Home/home';
import Login from './Component/login/login';
import Register from './Component/register/register';
import { ToastContainer } from 'react-toastify';

import { Route, Routes, Navigate } from "react-router-dom";
function App() {

  const [users, setLoginUsers] = useState({})

  return (
    <div className='App'>

      <Routes>
        {/* Render Login component if users._id is not available (user not logged in) */}
        <Route
          path="/"
          element={users && users._id ?
            <Home setLoginUsers={setLoginUsers} /> :
            <Navigate to="/login" />} />

        <Route path="/login" element={<Login setLoginUsers={setLoginUsers} />} />
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      <ToastContainer />



    </div>
  );
}

export default App;
