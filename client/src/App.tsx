import React, { useEffect } from "react";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.scss";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./actions/user";

function App() {
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <div className="wrap">
          {!isAuth && (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
