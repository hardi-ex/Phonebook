import { Link } from "react-router-dom";
import css from "./HomePage.module.css";
import contact from "/contact.svg";
import security from "/security.svg";
import tag from "/tag.svg";

export const HomePage = () => {
  return (
    <div className={css.div}>
      <div className={css.mainDivs}>
        <div className={css.securityDiv}>
          <img src={security} alt="security" width="40" height="40" />
          <h2>Reliable Storage and Easy Search for Your Contacts </h2>
        </div>
        <ul>
          <li>
            <p>
              Simple and User-Friendly Interface: Phonebook is designed with
              user convenience in mind. Easily add, edit, and delete contacts.
            </p>
          </li>
          <li>
            <p>
              Secure and Private: Your contact information is securely stored
              with us, ensuring your privacy is protected at all times.
            </p>
          </li>
          <li>
            <p>
              Efficient Search: Quickly find any contact with our powerful
              search functionality.
            </p>
          </li>
          <li>
            <p>
              Accessible Anywhere: Access your contacts from any device,
              anywhere in the world.
            </p>
          </li>
          <li>
            <p>
              Backup and Restore: Keep your contacts safe with our backup and
              restore options.
            </p>
          </li>
        </ul>
      </div>

      <div className={css.mainDivs}>
        <div className={css.tagDiv}>
          <img src={tag} alt="tag" width="30" height="30" />
          <h2>Get Started</h2>
        </div>
        <p>
          <Link className={css.link} to="/register">
            Create
          </Link>{" "}
          an account or{" "}
          <Link className={css.link} to="/login">
            log in
          </Link>{" "}
          to manage your contacts seamlessly. Join thousands of users who trust
          Phonebook for their contact management needs.
        </p>
      </div>

      <div className={css.mainDivs}>
        <div className={css.contactDiv}>
          <img src={contact} alt="contact" width="30" height="30" />
          <h2>Contact Us</h2>
        </div>
        <p>
          Have questions or need support? Feel free to reach out to our support
          team.
        </p>
        <address>phonebook@ukr.net</address>
      </div>
    </div>
  );
};
export default HomePage;
