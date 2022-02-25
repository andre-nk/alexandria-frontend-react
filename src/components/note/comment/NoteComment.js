import { useGetNoteComments } from "../../../hooks/useComment";
import CommentBlock from "./CommentBlock";
import CommentForm from "./CommentForm";

export default function NoteComment({
  noteID,
  isToolbarOpen,
  isCommentEnabled,
}) {
  const { noteCommentsQuery } = useGetNoteComments(noteID);

  return (
    isCommentEnabled && noteCommentsQuery.isSuccess && (
      <div className="flex justify-center py-8 overflow-hidden">
        <div
          className={`${
            isToolbarOpen ? "w-full lg:w-9/12" : "w-full lg:w-7/12"
          } overflow-hidden self-center duration-500`}
        >
          <h2 className="text-xl font-medium text-major-text">Comments</h2>
          <CommentForm noteID={noteID} />
          <div className="flex flex-col space-y-8">
            {noteCommentsQuery.data && noteCommentsQuery.data.map((comment, index) => {
              return (
                <div key={index}>
                  <CommentBlock noteID={noteID} comment={comment} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}
