import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./AuthNav.module.css";

const buildNavClass = ({ isActive }) =>
  clsx(css.navLink, { [css.active]: isActive });

export const AuthNav = () => {
  return (
    <>
      <li>
        <NavLink className={buildNavClass} to="/register">
          Register
        </NavLink>
      </li>
      <li>
        <NavLink className={buildNavClass} to="/login">
          Login
        </NavLink>
      </li>
    </>
  );
};
export default AuthNav;
