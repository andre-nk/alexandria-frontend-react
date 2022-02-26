import Helmet from "react-helmet";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";

export default function NotePage() {
  const [query, setQuery] = useState(null);
  const SignupSchema = Yup.object().shape({
    query: Yup.string().required("E-mail field is required"),
  });

  return (
    <div>
      <Helmet>
        <title>Your notes - Alexandria</title>
        <meta
          name="Your notes"
          content="Browse your programming notes collection here"
        />
      </Helmet>
      <div className="px-10 py-14 lg:px-20">
        <h2 className="text-3xl font-semibold">{query ? `1 note(s) for "${query}":` : "Search your notes:"}</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            setQuery(values.query);
          }}
        >
          {() => {
            return (
              <Form className="flex space-x-4 mt-5">
                <div className="w-full">
                  <Field
                    type="text"
                    name="query"
                    id="query"
                    className="border border-primary-border w-full focus:border-primary-blue outline-none rounded-md flex-1 px-4 py-3.5 duration-200"
                    placeholder="Search anything... (ex: React Custom Hooks)"
                  />
                </div>
                <button
                  className="bg-primary-blue text-primary-bg hover:bg-active-blue rounded-md text-medium border px-6 py-3.5 duration-200"
                  type="submit"
                >
                  Search
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
