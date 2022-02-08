import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { Formik, Field, Form } from "formik";
import { useState } from "react";

export default function SearchBar() {
  const navigate = useNavigate();
  const [isCreateMode, setIsCreateMode] = useState(false);
  const placeholderOptions = [
    'Type "/c" to create a new note',
    "Search anything on your notes here...",
  ];

  return (
    <Formik
      initialValues={{
        query: "",
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === "Backspace" && values.query.length === 0) {
                setIsCreateMode(false);
              }
            }}
            onChange={(e) => {
              e.preventDefault();
              let createTermIndex = values.query.indexOf("/c");

              if (createTermIndex >= 0) {
                setIsCreateMode(true);

                setFieldValue(
                  "query",
                  values.query.substring(
                    createTermIndex + 3,
                    values.query.length
                  )
                );
                console.log("Cleared!", values.query);
              }
            }}
            onSubmit={(e) => {
              e.preventDefault();
              console.log(isCreateMode);
              if (isCreateMode) {
                setIsCreateMode(false);
                navigate(`notes/new/${values.query}`);
              }
            }}
            className="flex flex-col w-full"
          >
            <div className="w-full h-14 bg-primary-white border border-minor-text rounded-xl flex align-middle px-4 mb-6">
              <IoSearch className="self-center mr-4" size={18} />
              {isCreateMode && (
                <div className="font-mono text-base my-3 mr-3 px-2.5 flex justify-center items-center rounded-md bg-primary-red bg-opacity-30">
                  <p>/create</p>
                </div>
              )}
              <Field
                autoFocus
                type="text"
                name="query"
                placeholder={
                  isCreateMode
                    ? "Type the note's title"
                    : placeholderOptions[Math.floor(Math.random() * 2)]
                }
                className="bg-transparent w-full focus:outline-none"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
