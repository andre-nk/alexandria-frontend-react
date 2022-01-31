import CommentForm from "./CommentForm";

export default function NoteComment({ isToolbarOpen, isCommentEnabled }) {
  return (
    isCommentEnabled && (
      <div className="flex justify-center py-8 overflow-hidden">
        <div
          className={`${
            isToolbarOpen ? "w-full lg:w-9/12" : "lg:w-7/12"
          } overflow-hidden self-center duration-500`}
        >
          <h2 className="text-xl font-medium text-major-text">Comments</h2>
          <CommentForm />
        </div>
      </div>
    )
  );
}
