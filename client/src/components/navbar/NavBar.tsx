import React from "react";
import "./navbar.scss";
import Logo from "../../assets/img/logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";

const NavBar = () => {
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <img src={Logo} alt="" className="navbar__logo" />
      <div className="navbar__header">MERN CLOUD</div>
      {!isAuth && (
        <div className="navbar__login">
          <NavLink to="/login">Войти</NavLink>
        </div>
      )}
      {!isAuth && (
        <div className="navbar__registration">
          <NavLink to="/registration">Регистрация</NavLink>
        </div>
      )}
      {isAuth && (
        <div
          className="navbar__registration"
          onClick={() => dispatch(logout())}
        >
          Выйти
        </div>
      )}
    </div>
  );
};

export default NavBar;
