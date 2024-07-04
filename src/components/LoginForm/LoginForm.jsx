import css from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import arrow from "/arrow.svg";
import { ToastContainer } from "react-toastify";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(login(values));
  };
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className={css.div}>
      <Link className={css.arrow} to="/">
        <img src={arrow} alt="arrow" width="50" height="50" />
      </Link>
      <div className={css.container}>
        <h2 className={css.title}>Login</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className={css.form}>
            <label className={css.label} htmlFor="email">
              Email
            </label>
            <Field
              className={css.input}
              name="email"
              type="email"
              id="email"
              required
            />
            <label className={css.label} htmlFor="password">
              Password
            </label>
            <Field
              className={css.input}
              name="password"
              type="password"
              id="password"
              required
            />
            <label className={css.label}>
              Don't you have an account yet?{" "}
              <Link className={css.link} to="/register">
                Register
              </Link>
            </label>
            <button className={css.button} type="submit">
              Login
            </button>
          </Form>
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};
export default LoginForm;
