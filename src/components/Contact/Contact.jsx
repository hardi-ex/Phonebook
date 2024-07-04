import css from "./Contact.module.css";
import { FaPhone } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";

const Contact = ({ contact }) => {
  const { name, number, id } = contact;
  const dispatch = useDispatch();

  function formatPhoneNumber(number) {
    const cleaned = number.replace(/\D/g, "");

    if (cleaned.length < 7) {
      return number;
    }

    const lastSevenDigits = cleaned.slice(-7);

    const formattedNumber = `${lastSevenDigits.slice(
      0,
      3
    )}-${lastSevenDigits.slice(3, 5)}-${lastSevenDigits.slice(5)}`;

    return formattedNumber;
  }

  function displayContact({ number }) {
    const formattedNumber = formatPhoneNumber(number);
    return formattedNumber;
  }

  return (
    <>
      <div className={css.mainDiv}>
        <div className={css.div}>
          <p className={css.text}>
            <IoPersonSharp className={css.icon} />
            {name}
          </p>
          <p className={css.text}>
            <FaPhone className={css.icon} />
            {displayContact({ number })}
          </p>
        </div>
        <button
          className={css.btn}
          type="button"
          onClick={() => dispatch(deleteContact(id))}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default Contact;
