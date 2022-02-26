import moment from "moment-mini";
import { IoTrashOutline } from "react-icons/io5";
import { useAccountByUID } from "../../../hooks/useAccount";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useDeleteComment } from "../../../hooks/useComment";

export default function CommentBlock({ noteID, comment }) {
  const { deleteCommentMutation } = useDeleteComment();
  const { user } = useAuthContext();
  const { userByUIDQuery } = useAccountByUID(comment.creator_uid);

  const commentDate = moment(comment.created_at).fromNow();

  return (
    userByUIDQuery.isSuccess && (
      <div>
        <div className="w-full flex items-start justify-start space-x-7">
          <div className="h-12 w-12 aspect-square cursor-pointer rounded-full bg-primary-border overflow-clip">
            <img
              alt="profilePicture"
              width={36}
              height={36}
              src={userByUIDQuery.data.photoURL}
              className="object-cover w-full h-full bg-gray-300"
            />
          </div>
          <div className="flex flex-col w-[80%] lg:w-[90%] space-y-1.5">
            <div className="w-full flex items-center space-x-2">
              <p className="text-md font-medium text-major-text">
                {userByUIDQuery.data.displayName}
              </p>
              <p className="text-sm text-minor-text">{commentDate}</p>
            </div>
            <p className="text-md font-light text-major-text">
              {comment.content}
            </p>
          </div>
          {comment.creator_uid === user.uid && (
            <button
              onClick={() => {
                deleteCommentMutation.mutate({
                  noteID,
                  commentID: comment._id,
                });
              }}
              className="p-1 flex items-center justify-center space-x-2 text-minor-text hover:text-primary-red"
            >
              <IoTrashOutline size={16} />
              <p className="text-xs">Delete</p>
            </button>
          )}
        </div>
      </div>
    )
  );
}
