import CommentBlock from "./CommentBlock";
import CommentForm from "./CommentForm";

export default function NoteComment({ isToolbarOpen, isCommentEnabled }) {
  const mockComments = [
    {
      name: "Andreas 1",
      content: "So, wdyt guys?",
    },
    {
      name: "Andreas 2",
      content: "So, wdyt guys?",
    },
    {
      name: "Andreas 3",
      content: "So, wdyt guys?",
    },
  ];

  return (
    isCommentEnabled && (
      <div className="flex justify-center py-8 overflow-hidden">
        <div
          className={`${
            isToolbarOpen ? "w-full lg:w-9/12" : "w-full lg:w-7/12"
          } overflow-hidden self-center duration-500`}
        >
          <h2 className="text-xl font-medium text-major-text">Comments</h2>
          <CommentForm />
          <div className="flex flex-col space-y-8">
            {mockComments.map((comment, index) => {
              return (
                <div key={index}>
                  <CommentBlock comment={comment} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}
