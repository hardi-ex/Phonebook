import { logout } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./UserMenu.module.css";

const buildNavClass = ({ isActive }) =>
  clsx(css.navLink, { [css.active]: isActive });

export const UserMenu = () => {
  const dispatch = useDispatch();

  return (
    <>
      <li>
        <NavLink className={buildNavClass} to="/contacts">
          Contacts
        </NavLink>
      </li>
      <button onClick={() => dispatch(logout())} className={css.button}>
        Logout
      </button>
    </>
  );
};
export default UserMenu;
