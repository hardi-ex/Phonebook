import css from "./AppBar.module.css";
import icon from "../../../public/icon.svg";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { AuthNav } from "../AuthNav/AuthNav";
import { UserMenu } from "../UserMenu/UserMenu";
import { Navigation } from "../Navigation/Navigation";
import { selectUser } from "../../redux/auth/selectors";
import person from "../../../public/person.svg";

export const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <header className={css.header}>
      <div className={css.logoDiv}>
        <img src={icon} alt="icon" width="40" height="40" />
        <h1>Phonebook</h1>
      </div>
      {isLoggedIn && (
        <div className={css.userDiv}>
          <img src={person} alt="person" width="35" height="35" />
          <h2 className={css.h2}>{user.name}</h2>
        </div>
      )}
      <nav>
        <ul>
          <Navigation />
          {!isLoggedIn ? <AuthNav /> : <UserMenu />}
        </ul>
      </nav>
    </header>
  );
};
export default AppBar;
