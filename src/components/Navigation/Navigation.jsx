import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildNavClass = ({ isActive }) =>
  clsx(css.navLink, { [css.active]: isActive });

export const Navigation = () => {
  return (
    <li>
      <NavLink className={buildNavClass} to="/">
        Home
      </NavLink>
    </li>
  );
};
export default Navigation;
