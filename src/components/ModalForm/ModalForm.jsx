import Modal from "react-modal";
import { Formik, Field, Form } from "formik";
import { nanoid } from "nanoid";
import { deleteContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
Modal.setAppElement("#root");

export const ModalForm = ({ onClose }) => {
  const nameId = nanoid();
  const numberId = nanoid();
  const userId = nanoid();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const action = deleteContact({
      name: values.name,
      number: values.number,
      id: userId,
    });

    dispatch(action);
    actions.resetForm();
  };

  const initialValues = {
    name: "",
    number: "",
  };

  const customStyles = {};

  return (
    <Modal isOpen={true} onRequestClose={onClose} style={customStyles}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <label htmlFor={nameId}>Name:</label>
          <Field
            type="text"
            name="name"
            id={nameId}
            placeholder="Helene Keene"
          />
          <label htmlFor={numberId}>Number:</label>
          <Field
            type="text"
            name="number"
            id={numberId}
            placeholder="3434343"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </Modal>
  );
};
export default ModalForm;
