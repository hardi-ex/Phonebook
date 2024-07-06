import Modal from "react-modal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { updateContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import css from "./ModalForm.module.css";
import * as Yup from "yup";
Modal.setAppElement("#root");

export const ModalForm = ({ onClose, form }) => {
  const nameId = nanoid();
  const numberId = nanoid();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const action = updateContact({
      id: form.id,
      ...values,
    });

    dispatch(action);
    onClose();
    actions.resetForm();
  };

  const initialValues = {
    name: form?.name || "",
    number: form?.number || "",
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      width: "300px",
      padding: "20px",
      backgroundColor: "rgb(36, 41, 79)",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
      cursor: "default",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      cursor: "pointer",
    },
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
    <Modal isOpen={true} onRequestClose={onClose} style={customStyles}>
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
          <label htmlFor={numberId}>Number:</label>
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
          <button type="submit">Edit</button>
        </Form>
      </Formik>
    </Modal>
  );
};
export default ModalForm;
