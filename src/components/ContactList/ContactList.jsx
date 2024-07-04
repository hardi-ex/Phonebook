import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export const ContactList = ({ users }) => {
  return (
    <ul className={css.ul}>
      {users.map((contact) => {
        return (
          <li className={css.li} key={contact.id}>
            <Contact contact={contact} />
          </li>
        );
      })}
    </ul>
  );
};
export default ContactList;
