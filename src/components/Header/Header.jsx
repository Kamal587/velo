import React, { useState } from "react";

import velo from "./../../assets/images/velo2.png";

import userAva from "./../../assets/images/userAva.png";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/slice";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "./Header.css";

function Header({ menuActive, setMenuActive }) {
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const checkEnd = () => {
    dispatch(
      removeUser({
        token: "",
      })
    );
  };
  return (
    <div className="root" onClick={() => setMenuActive(!menuActive)}>
      <div className="head">
        <div className="log">
          <Link to="/" className="logo">
            <img src={velo} alt="" className="img" />
            <div className="textLogo">VELO</div>
          </Link>
        </div>
        <div className="mobile_burg" onClick={() => setMenuActive(!menuActive)}>
          {menuActive ? (
            <AiOutlineClose color="teal" size={40} />
          ) : (
            <AiOutlineMenu color="teal" size={40} />
          )}
        </div>
        <div className="menu">
          <div
            className={menuActive ? "sections active" : "sections"}
            active={menuActive}
          >
            <div className="log2">
              <Link to="/" className="logo2">
                <img src={velo} alt="" className="img" />
                <div className="textLogo2">VELO</div>
              </Link>
            </div>
            <NavLink to="/" className="section">
              ГЛАВНАЯ
            </NavLink>

            <NavLink
              to="/officer"
              className="section"
              activeStyle="sectionactive"
            >
              СОТРУДНИКИ
            </NavLink>

            <NavLink to="/sms" className="section">
              СООБЩЕНИЯ О КРАЖАХ
            </NavLink>

            <NavLink to="/contacts" className="section">
              КОНТАКТЫ
            </NavLink>
          </div>
        </div>
        <div className="auth">
          <div className="steal">
            <NavLink to="/steal" className="btnSteal">
              СООБЩИТЬ О КРАЖЕ
            </NavLink>
          </div>
          <div className="reg">
            <img src={userAva} alt="" className="regImg" />
            <div className="textReg">
              {token ? (
                <NavLink to="/" className="textAuth" onClick={() => checkEnd()}>
                  ВЫЙТИ
                </NavLink>
              ) : (
                <NavLink to="/auth" className="textAuth">
                  ВОЙТИ
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
