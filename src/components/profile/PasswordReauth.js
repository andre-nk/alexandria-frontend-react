import * as Yup from "yup";
import { Formik, Field, Form } from "formik";

export default function PasswordReauth({ deleteUser, setReauthPassword, reauthError }) {
  const PasswordReauthSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Your password should be more than 8 characters")
      .required("Password field is required"),
  });

  return (
    <Formik
      initialValues={{
        password: "",
      }}
      validationSchema={PasswordReauthSchema}
      onSubmit={async (values) => {
        console.log(values.password)
        deleteUser(values.password)
      }}
    >
      {({ values, errors, touched }) => {
        return (
          <Form
            className="w-full pb-6"
            onChange={(e) => {
              e.preventDefault();
              setReauthPassword(values.password);
            }}
          >
            <div className="w-full flex flex-col space-y-2.5 justify-between items-start">
              <label htmlFor="name">
                Please enter your password to proceed:
              </label>
              <div className="flex w-full flex-col space-y-1.5 items-end">
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="border w-full border-primary-border focus:border-primary-blue outline-none rounded-md px-4 py-3.5 duration-200"
                  placeholder="Your password..."
                />
                {reauthError || (errors.password && touched.password) ? (
                  <p className="mt-1.5 ml-1.5 text-xs text-red-500 opacity-70">
                    *{reauthError ? reauthError.message : errors.password}
                  </p>
                ) : null}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
