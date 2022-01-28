import * as Yup from "yup";
import { useState } from "react";
import Helmet from "react-helmet";
import { Formik, Field, Form } from "formik";
import { IoImageOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useAuth } from "../../hooks/useAuth";
import { useFormatError } from "../../hooks/useFormatError";
import { useAuthContext } from "../../hooks/useAuthContext";
import SocialAuthComponent from "../../components/auth/SocialAuth";
import { useNavigate } from "react-router-dom";
import { useImageURL } from "../../hooks/useImageURL";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Your name should be less than 50 characters!")
    .required("Name field is required"),
  email: Yup.string()
    .email("Invalid e-mail address")
    .required("E-mail field is required"),
  password: Yup.string()
    .min(8, "Your password should be more than 8 characters")
    .required("Password field is required"),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { formatAuthError } = useFormatError();
  const [showPassword, setShowPassword] = useState(false);
  const { isValidImage, profilePicture, profilePictureUrl, imageToURL } =
    useImageURL();
  const { error, registerWithEmail, registerWithGithub, registerWithGoogle } =
    useAuth();

  if (user !== null) {
    navigate("/");
  }

  const pickImage = () => {
    document.getElementById("profilePicturePicker").click();
  };

  return (
    <div className="min-w-full min-h-screen relative flex justify-center align-center p-8">
      <Helmet>
        <title>Register - Alexandria</title>
        <meta
          name="Register"
          content="Create your Alexandria account and start your notetaking voyage!"
        />
      </Helmet>
      <div className="max-w-sm lg:w-4/12 px-8 flex flex-col align-center self-center shadow-2xl rounded-2xl bg-primary-white z-10 py-12 lg:px-12">
        <div className="flex flex-col justify-center items-center space-y-4 pb-6">
          <div className="self-center flex w-full justify-center items-center space-x-2">
            <img
              alt="logo"
              src="/logo.png"
              height="60"
              width="60"
              className="aspect-square"
            />
            <p className="text-minor-text self-center text-sm my-4 font-light duration-200">
              {"-----"}
            </p>
            <div
              className="flex items-center justify-center h-[55px] w-[55px] cursor-pointer"
              onClick={pickImage}
            >
              <div className="flex flex-col justify-center items-center group border-2 w-full h-full rounded-[0.9rem] border-dashed hover:bg-gray-100 hover:border-primary-blue duration-200">
                <div className="flex flex-col items-center space-y-2 justify-center text-gray-400 group-hover:text-primary-blue object-cover overflow-hidden">
                  {profilePictureUrl ? (
                    <div className="w-full rounded-[0.8rem]">
                      <img
                        alt="profilePicture"
                        src={profilePictureUrl}
                        height="55"
                        width="55"
                        className="object-cover "
                      />
                    </div>
                  ) : (
                    <IoImageOutline
                      size={24}
                      className={`${
                        isValidImage || !profilePicture
                          ? "text-gray-400 "
                          : "text-red-400"
                      } cursor-pointer`}
                    />
                  )}
                </div>
                <input
                  id="profilePicturePicker"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={imageToURL}
                />
              </div>
            </div>
          </div>
          <h3 className="font-mono text-md text-center tracking-wide text-major-text">
            <span>
              Create your{" "}
              <strong className="font-medium text-primary-black">
                Alexandria{" "}
              </strong>
              account
            </span>
            <br />
            and start your notetaking voyage!
          </h3>
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            await registerWithEmail(
              values.name,
              profilePicture,
              values.email,
              values.password
            );
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form className="flex flex-col">
                <div className="w-full">
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="border border-primary-border focus:border-primary-blue outline-none rounded-md w-full flex-1 px-4 py-3.5 duration-200 mt-3.5"
                    placeholder="Your name"
                  />
                  {errors.name && touched.name ? (
                    <p className="mt-1.5 ml-1.5 text-xs text-red-500 opacity-70">
                      *{errors.name}
                    </p>
                  ) : null}
                </div>
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
                  Create your account
                </button>
                {error && (
                  <p className="mt-2 ml-1.5 text-xs text-red-500 opacity-70 normal-case">
                    *{formatAuthError(error)}
                  </p>
                )}
              </Form>
            );
          }}
        </Formik>
        <SocialAuthComponent
          github={registerWithGithub}
          google={registerWithGoogle}
        />
        <span className="text-minor-text hover:text-major-text text-md self-center font-light duration-200 flex cursor-pointer">
          <p>Already have an account?</p>
          <a href="/auth/login">
            <span className="underline pl-1">Sign in!</span>
          </a>
        </span>
      </div>
      <img
        alt="background"
        src="/ornament.svg"
        layout="fill"
        className="z-0 object-cover absolute"
      />
    </div>
  );
}
