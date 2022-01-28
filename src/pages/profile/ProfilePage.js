import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { IoChevronForwardOutline, IoPencil } from "react-icons/io5";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const { updateProfileAPI, error, success } = useAuth();

  const UpdateProfileSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, "Your name should be less than 50 characters!")
      .required("Name field is required"),
    role: Yup.string().max(
      50,
      "Your role description should be less than 50 characters!"
    ),
    location: Yup.string().max(
      50,
      "Your location name should be less than 50 characters!"
    ),
  });

  useEffect(() => {
    if (error) {
      openSnackbar(error.message, {
        position: "bottom-right",
        style: {
          backgroundColor: "midnightblue",
          border: "2px solid lightgreen",
          color: "lightblue",
          fontFamily: "sans-serif",
          fontSize: "20px",
          textAlign: "center",
        },
        closeStyle: {
          color: "lightcoral",
          fontSize: "16px",
        },
      });
    } else if (success) {
      console.log("Success");

      openSnackbar(success, {
        position: "bottom-right",
        style: {
          backgroundColor: "midnightblue",
          border: "2px solid lightgreen",
          color: "lightblue",
          fontFamily: "sans-serif",
          fontSize: "20px",
          textAlign: "center",
        },
        closeStyle: {
          color: "lightcoral",
          fontSize: "16px",
        },
      });
    }
  }, [error, success]);

  return (
    <div className="px-20 py-8">
      <div className="w-full flex justify-between items-center">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="px-5 py-[0.5rem] cursor-pointer flex justify-center items-center rounded-md bg-primary-white hover:bg-gray-100 duration-200 border-2 border-primary-border"
        >
          Back
        </button>
        <h2 className="text-lg font-medium">Profile Page</h2>
      </div>
      <div className="py-12 w-full flex justify-center">
        <div className="w-7/12">
          <div className="w-full px-4 flex space-x-12 items-center justify-start">
            <div className="h-28 w-28 rounded-full overflow-clip relative bg-gray-300">
              <div className="absolute top-0 w-full h-full flex justify-center items-center group bg-primary-black bg-opacity-0 hover:bg-opacity-50 duration-200">
                <IoPencil
                  size={24}
                  color={"#FFFFFF"}
                  className="group-hover:opacity-100 opacity-0"
                />
              </div>
              <img src={user.photoURL} alt="profile-img" className="w-full" />
            </div>
            <div className="h-full flex flex-col space-y-1 items-start">
              <h2 className="text-[1.75rem] font-medium">{user.displayName}</h2>
              <span className="text-lg flex space-x-2">
                {user.role && (
                  <u className="hover:text-primary-blue">{user.role}</u>
                )}
                {user.location && (
                  <div className="flex space-x-2">
                    <p> based in </p>
                    <u className="hover:text-primary-blue">{user.location}</u>
                  </div>
                )}
              </span>
            </div>
          </div>
          <Formik
            initialValues={{
              name: user.displayName,
              role: user.role,
              location: user.location,
            }}
            validationSchema={UpdateProfileSchema}
            onSubmit={async (values) => {
              updateProfileAPI(user, values.name, values.role, values.location);
            }}
          >
            {({ errors, touched }) => {
              return (
                <Form className="w-full py-10 flex flex-col space-y-5">
                  <div className="w-full px-5 flex justify-between items-center">
                    <label htmlFor="name" className="flex-[4]">
                      Display name
                    </label>
                    <div className="flex-[1] bg-red-500"></div>
                    <div className="flex-[8] flex flex-col space-y-1.5 items-end">
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        className="border w-full border-primary-border focus:border-primary-blue outline-none rounded-md px-4 py-3.5 duration-200"
                        placeholder="Display name..."
                      />
                      {errors.name && touched.name ? (
                        <p className="mt-1.5 ml-1.5 text-xs text-red-500 opacity-70">
                          *{errors.name}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full px-5 flex justify-between items-center">
                    <div className="flex-[4] flex">
                      Role <p className="text-minor-text pl-1">{"(.opt)"}</p>
                    </div>
                    <div className="flex-[1] bg-red-500"></div>
                    <div className="flex-[8] flex flex-col space-y-1.5 items-end">
                      <Field
                        type="text"
                        name="role"
                        id="role"
                        className="border w-full border-primary-border focus:border-primary-blue outline-none rounded-md px-4 py-3.5 duration-200"
                        placeholder="Role description..."
                      />
                      {errors.role && touched.role ? (
                        <p className="mt-1.5 ml-1.5 text-xs text-red-500 opacity-70">
                          *{errors.role}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full px-5 flex justify-between items-center">
                    <div className="flex-[4] flex">
                      Location{" "}
                      <p className="text-minor-text pl-1">{"(.opt)"}</p>
                    </div>
                    <div className="flex-[1] bg-red-500"></div>
                    <div className="flex-[8] flex flex-col space-y-1.5 items-end">
                      <Field
                        type="text"
                        name="location"
                        id="location"
                        className="border w-full border-primary-border focus:border-primary-blue outline-none rounded-md px-4 py-3.5 duration-200"
                        placeholder="Location description..."
                      />
                      {errors.location && touched.location ? (
                        <p className="mt-1.5 ml-1.5 text-xs text-red-500 opacity-70">
                          *{errors.location}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full px-5 flex justify-between items-center">
                    <label htmlFor="name" className="flex-[4]">
                      E-mail address
                    </label>
                    <div className="flex-[1] bg-red-500"></div>
                    <div className="flex-[8] flex flex-col space-y-1.5 items-end">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        disabled
                        value={user.email}
                        className="border w-full border-primary-border disabled:opacity-40 focus:border-primary-blue outline-none rounded-md px-4 py-3.5 duration-200"
                        placeholder="E-mail address..."
                      />
                      {errors.email && touched.email ? (
                        <p className="mt-1.5 ml-1.5 text-xs text-red-500 opacity-70">
                          *{errors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full px-5 rounded-md duration-200 hover:bg-gray-100 flex py-4 justify-between items-center">
                    <p>Reset password</p>
                    <IoChevronForwardOutline size={18} />{" "}
                  </div>
                  <div className="w-full px-5 rounded-md duration-200 hover:bg-primary-red hover:bg-opacity-10 flex py-4 justify-between items-center">
                    <p className="text-primary-red">Delete account</p>
                    <IoChevronForwardOutline size={18} />{" "}
                  </div>
                  <button
                    className="bg-primary-blue w-[20%] self-end mt-5 text-primary-bg hover:bg-active-blue rounded-md text-medium border px-4 py-3 duration-200"
                    type="submit"
                  >
                    Update profile
                  </button>
                  {error && <p>{error.message}</p>}
                  {success && <p>{success}</p>}
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
