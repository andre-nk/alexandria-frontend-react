import * as Yup from "yup";
import { Formik, Field, Form } from "formik";

import { useAuthContext } from "../../../hooks/useAuthContext";

export default function CommentForm() {
  const { user } = useAuthContext();

  const NewCommentSchema = Yup.object().shape({
    comment: Yup.string()
      .required("Comment field is required")
      .max(400, "Comment is too long"),
  });

  return (
    <div>
      <div className="w-full py-6">
        <Formik
          initialValues={{
            comment: "",
          }}
          validationSchema={NewCommentSchema}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form className="flex flex-col justify-center items-end">
                <div className="w-full flex items-center space-x-6">
                  <div className="h-12 w-12 aspect-square cursor-pointer rounded-full bg-primary-border overflow-clip">
                    <img
                      alt="profilePicture"
                      src={user.photoURL}
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <Field
                    type="text"
                    name="comment"
                    id="comment"
                    className="border border-primary-border w-full focus:border-primary-blue outline-none rounded-md flex-1 px-4 py-3.5 duration-200"
                    placeholder="Write your comment here..."
                  />
                  {errors.comment && touched.comment ? (
                    <p className="mt-1.5 ml-1.5 text-xs text-red-500 opacity-70">
                      *{errors.comment}
                    </p>
                  ) : null}
                </div>
                <button
                  className="bg-primary-blue text-primary-bg hover:bg-active-blue rounded-md text-medium border px-6 py-3 duration-200 mt-5"
                  type="submit"
                >
                  Post comment
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
