import * as Yup from "yup";
import { useState } from "react";
import Helmet from "react-helmet";
import { Formik, Field, Form } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import SocialAuthComponent from "../../components/auth/SocialAuth";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import {
  useGithubRegister,
  useGoogleRegister,
  useSignIn,
} from "../../hooks/useAuth";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid e-mail address")
    .required("E-mail field is required"),
  password: Yup.string()
    .min(8, "Your password should be more than 8 characters")
    .required("Password field is required"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useAuthContext();
  const { signInMutation } = useSignIn();
  const { googleRegisterMutation } = useGoogleRegister();
  const { githubRegisterMutation } = useGithubRegister();
  const navigate = useNavigate();

  if (user !== null) {
    navigate("/");
  }

  return (
    <div className="min-w-full min-h-screen relative flex justify-center align-center p-8">
      <Helmet>
        <title>Log in - Alexandria</title>
        <meta
          name="Log in"
          content="Log in to your Alexandria account and continue your notetaking voyage!"
        />
      </Helmet>
      <div className="max-w-sm px-8 lg:w-4/12 flex flex-col align-center self-center shadow-2xl rounded-2xl bg-primary-white z-10 py-12 lg:px-12">
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
          <h3 className="font-mono text-md text-center tracking-wide text-major-text">
            <span>
              Log in to{" "}
              <strong className="font-medium text-primary-black">
                Alexandria{" "}
              </strong>
              and
            </span>
            <br />
            continue your notetaking voyage!
          </h3>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            signInMutation.mutate({
              email: values.email,
              password: values.password,
            });
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
                <div className="w-full">
                  <div className="flex align-center justify-center mt-3.5">
                    <Field
                      name="password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="border border-primary-border focus:border-primary-blue outline-none rounded-md flex-1 px-4 py-3.5 duration-200"
                      placeholder="Password..."
                    />
                    {
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? (
                          <AiOutlineEye
                            size={20}
                            className="ml-4 self-center text-major-text cursor-pointer"
                          />
                        ) : (
                          <AiOutlineEyeInvisible
                            size={20}
                            className="ml-4 self-center text-major-text cursor-pointer"
                          />
                        )}
                      </button>
                    }
                  </div>
                  {errors.password && touched.password ? (
                    <p className="mt-1.5 ml-1.5 text-xs text-red-500 opacity-70">
                      *{errors.password}
                    </p>
                  ) : null}
                </div>
                <button
                  className="bg-primary-blue text-primary-bg hover:bg-active-blue rounded-md text-medium border px-4 py-3 duration-200 mt-5"
                  type="submit"
                >
                  Log in
                </button>
                {(signInMutation.error ||
                  githubRegisterMutation.error ||
                  googleRegisterMutation.error) && (
                  <p className="mt-2 ml-1.5 text-xs text-red-500 opacity-70 normal-case">
                    *
                    {signInMutation.error.message ||
                      githubRegisterMutation.error.message ||
                      googleRegisterMutation.error.message}
                  </p>
                )}
                <span className="text-minor-text text-sm self-end mt-3 font-light duration-200 flex cursor-pointer group">
                  <p>Forgot your password?</p>
                  <a href="/auth/forgot">
                    <span className="underline pl-1 hover:text-primary-blue duration-200">
                      Reset it here!
                    </span>
                  </a>
                </span>
              </Form>
            );
          }}
        </Formik>
        <div className="mt-2 flex flex-col justify-center">
          <SocialAuthComponent
            github={() => {
              githubRegisterMutation.mutate();
            }}
            google={() => {
              googleRegisterMutation.mutate();
            }}
          />
          <span className="text-minor-text hover:text-major-text text-md self-center font-light duration-200 flex cursor-pointer">
            <p>Doesn't have an account?</p>
            <a href="/auth/register">
              <span className="underline pl-1">Register!</span>
            </a>
          </span>
        </div>
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
