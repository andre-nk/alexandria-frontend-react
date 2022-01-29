import * as Yup from "yup";
import Helmet from "react-helmet";
import { Formik, Field, Form } from "formik";

import { useAuth } from "../../hooks/useAuth";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFormatError } from "../../hooks/useFormatError";
import { useNavigate } from "react-router-dom";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid e-mail address")
    .required("E-mail field is required"),
});

export default function ForgotPasswordPage() {
  const { error, isResetSent, resetPassword } = useAuth();
  const { formatAuthError } = useFormatError();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (user !== null) {
    navigate("/");
  }

  return (
    <div className="min-w-full min-h-screen flex relative justify-center align-center p-8">
      <Helmet>
        <title>Forgot password - Alexandria</title>
      </Helmet>
      <div className="flex flex-col align-center self-center shadow-2xl max-w-sm rounded-2xl bg-primary-white z-10 py-12 px-12">
        <div className="flex flex-col justify-center items-center space-y-4 pb-6">
          <div className="self-center flex w-full justify-center items-center space-x-2">
            <img
              alt="logo"
              src="/logo.png"
              height="60"
              width="60"
              className="aspect-square"
            />
          </div>
          <h3 className="font-mono text-md text-center leading-relaxed tracking-wide text-major-text">
            <span>
              Enter your account's e-mail address and{" "}
              <strong className="font-medium text-primary-black">
                Alexandria{" "}
              </strong>
              will send a link to reset your password
            </span>
          </h3>
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={ResetPasswordSchema}
          onSubmit={async (values) => {
            await resetPassword(values.email);
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form className="flex flex-col">
                <div className="w-full">
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    className="border border-primary-border w-full focus:border-primary-blue outline-none rounded-md flex-1 px-4 py-3.5 duration-200 mt-3.5"
                    placeholder="E-mail address..."
                  />
                  {errors.email && touched.email ? (
                    <p className="mt-1.5 ml-1.5 text-xs text-red-500 opacity-70">
                      *{errors.email}
                    </p>
                  ) : null}
                </div>
                <button
                  className="bg-primary-blue text-primary-bg hover:bg-active-blue rounded-md text-medium border px-4 py-3 duration-200 mt-5"
                  type="submit"
                >
                  Reset password
                </button>
                {error && (
                  <p className="mt-2 ml-1.5 text-xs text-red-500 opacity-70 normal-case">
                    *{formatAuthError(error)}
                  </p>
                )}
                {isResetSent && (
                  <div className="flex flex-col space-y-2 mt-4 justify-center rounded-md items-center px-4 py-3.5 bg-primary-bg border border-primary-border">
                    <p className="text-xs text-primary-green normal-case text-center">
                      The reset password e-mail has been sent!
                    </p>
                    <a href="/auth/login">
                      <p className="text-primary-black text-xs hover:text-primary-blue underline duration-200 cursor-pointer">
                        Go back
                      </p>
                    </a>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
      <img
        alt="background"
        src="/ornament.svg"
        layout="fill"
        className="z-0 h-full object-cover absolute"
      />
    </div>
  );
}
