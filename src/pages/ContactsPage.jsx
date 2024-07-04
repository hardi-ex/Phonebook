import {
  selectContactsItems,
  selectError,
  selectIsLoading,
} from "../redux/contacts/selectors";
import { selectFilteredContacts } from "../redux/contacts/slice";
import { ThreeDots } from "react-loader-spinner";
import css from "../components/App.module.css";
import ContactList from "../components/ContactList/ContactList";
import SearchBox from "../components/SearchBox/SearchBox";
import ContactForm from "../components/ContactForm/ContactForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../redux/contacts/operations";

export const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContactsItems);
  const filteredContacts = useSelector(selectFilteredContacts);
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <ContactForm />
      <SearchBox />
      {isLoading && (
        <div className={css.loader}>
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#FFFFFF"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {isError && <p className={css.textWrong}>Something went wrong</p>}
      {!isLoading &&
        !isError &&
        (contacts.length === 0 || filteredContacts.length === 0) && (
          <p className={css.textFound}>No contact found</p>
        )}
      {!isLoading && !isError && filteredContacts.length !== 0 && (
        <ContactList users={filteredContacts} />
      )}
    </>
  );
};

export default ContactsPage;
