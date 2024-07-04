import { Formik, Form, Field } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { ToastContainer } from "react-toastify";

export const ContactForm = () => {
  const dispatch = useDispatch();
  const nameId = nanoid();
  const numberId = nanoid();
  const userId = nanoid();

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, actions) => {
    const action = addContact({
      name: values.name,
      number: values.number,
      id: userId,
    });

    dispatch(action);
    actions.resetForm();
  };

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .matches(
        /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
        "Name must be in 'Firstname Lastname' format"
      )
      .matches(
        /^[A-Z][a-z]+\s[A-Z][a-z]+$/,
        "Name must be in 'Firstname Lastname' format with capitalized first letters"
      )
      .required("Required"),
    number: Yup.string()
      .matches(
        /^\d{3}-\d{2}-\d{2}$|^\d{3}-\d{3}-\d{2}$/,
        "Invalid phone number format"
      )
      .required("Required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <label htmlFor={nameId}>Name:</label>
          <Field
            type="text"
            name="name"
            id={nameId}
            placeholder="Helene Keene"
          />
          <ErrorMessage
            className={css.errorName}
            name="name"
            component="span"
          />
          <label htmlFor={numberId}>Phone number:</label>
          <Field
            type="text"
            name="number"
            id={numberId}
            placeholder="111-11-11"
          />
          <ErrorMessage
            className={css.errorNumber}
            name="number"
            component="span"
          />
          <button className={css.btn} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
      <ToastContainer />
    </>
  );
};
export default ContactForm;
