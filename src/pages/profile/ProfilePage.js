import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { IoChevronForwardOutline, IoPencil } from "react-icons/io5";

import { useAuthContext } from "../../hooks/useAuthContext";

export default function ProfilePage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

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
    email: Yup.string()
      .email("Invalid e-mail address")
      .required("E-mail field is required"),
    password: Yup.string()
      .min(8, "Your password should be more than 8 characters")
      .required("Password field is required"),
  });

  console.log(UpdateProfileSchema);

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
                <IoPencil size={24} color={"#FFFFFF"} className="group-hover:opacity-100 opacity-0" />
              </div>
              <img src={user.photoURL} alt="profile-img" className="w-full" />
            </div>
            <div className="h-full flex flex-col space-y-1 items-start">
              <h2 className="text-[1.75rem] font-medium">{user.displayName}</h2>
              <span className="text-lg flex space-x-1">
                {user.role && <u>{user.role}</u>}
                {user.location && (
                  <div>
                    <p> based in </p>
                    <u>{user.location}</u>
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
              email: user.email,
              password: user.password,
            }}
            validationSchema={UpdateProfileSchema}
            onSubmit={async (values) => {}}
          >
            {({ errors, touched }) => {
              return (
                <Form className="w-full py-10 flex flex-col space-y-5">
                  <div className="w-full px-5 flex justify-between items-center">
                    <label htmlFor="name" className="flex-[4]">
                      Display name
                    </label>
                    <div className="flex-[1] bg-red-500"></div>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="flex-[7] border border-primary-border focus:border-primary-blue outline-none rounded-md px-4 py-3.5 duration-200"
                      placeholder="Display name..."
                    />
                    {errors.name && touched.name ? (
                      <p className="mt-1.5 ml-1.5 text-xs text-red-500 opacity-70">
                        *{errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div className="w-full px-5 flex justify-between items-center">
                    <div className="flex-[4] flex">
                      Role <p className="text-minor-text pl-1">{"(.opt)"}</p>
                    </div>
                    <div className="flex-[1] bg-red-500"></div>
                    <Field
                      type="text"
                      name="role"
                      id="role"
                      className="flex-[7] border border-primary-border focus:border-primary-blue outline-none rounded-md px-4 py-3.5 duration-200"
                      placeholder="Role description..."
                    />
                    {errors.role && touched.role ? (
                      <p className="mt-1.5 ml-1.5 text-xs text-red-500 opacity-70">
                        *{errors.role}
                      </p>
                    ) : null}
                  </div>
                  <div className="w-full px-5 flex justify-between items-center">
                    <div className="flex-[4] flex">
                      Location{" "}
                      <p className="text-minor-text pl-1">{"(.opt)"}</p>
                    </div>
                    <div className="flex-[1] bg-red-500"></div>
                    <Field
                      type="text"
                      name="location"
                      id="location"
                      className="flex-[7] border border-primary-border focus:border-primary-blue outline-none rounded-md px-4 py-3.5 duration-200"
                      placeholder="Your location..."
                    />
                    {errors.location && touched.location ? (
                      <p className="mt-1.5 ml-1.5 text-xs text-red-500 opacity-70">
                        *{errors.location}
                      </p>
                    ) : null}
                  </div>
                  <div className="w-full px-5 flex justify-between items-center">
                    <label htmlFor="name" className="flex-[4]">
                      E-mail address
                    </label>
                    <div className="flex-[1] bg-red-500"></div>
                    <Field
                      type="text"
                      name="email"
                      id="email"
                      className="flex-[7] border border-primary-border focus:border-primary-blue outline-none rounded-md px-4 py-3.5 duration-200"
                      placeholder="E-mail address..."
                    />
                    {errors.email && touched.email ? (
                      <p className="mt-1.5 ml-1.5 text-xs text-red-500 opacity-70">
                        *{errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div className="w-full px-5 rounded-md duration-200 hover:bg-gray-100 flex py-4 justify-between items-center">
                    <p>Reset password</p>
                    <IoChevronForwardOutline size={18} />{" "}
                  </div>
                  <div className="w-full px-5 rounded-md duration-200 hover:bg-primary-red hover:bg-opacity-10 flex py-4 justify-between items-center">
                    <p className="text-primary-red">Delete account</p>
                    <IoChevronForwardOutline size={18} />{" "}
                  </div>
                  <div className="w-3/12 self-end flex justify-end pt-5">
                    <button
                      className="bg-primary-blue text-primary-bg hover:bg-active-blue rounded-md text-medium border px-6 py-3 duration-200"
                      type="submit"
                    >
                      Update profile
                    </button>
                    {/* {error && (
                      <p className="mt-2 ml-1.5 text-xs text-red-500 opacity-70 normal-case">
                        *{formatAuthError(error)}
                      </p>
                    )} */}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
