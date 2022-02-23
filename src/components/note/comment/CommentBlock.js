import { useAccountByUID } from "../../../hooks/useAccount";

export default function CommentBlock({ comment }) {
  const { userByUIDQuery } = useAccountByUID(comment.creator_uid);

  const commentDate = new Date(comment.created_at);

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
          <div className="flex flex-col w-[80%] lg:w-[90%] space-y-1">
            <div className="w-full flex items-center space-x-2">
              <p className="text-md font-medium text-major-text">
                {userByUIDQuery.data.displayName}
              </p>
              <p className="text-md text-minor-text">{commentDate.getHours() + ":" + commentDate.getMinutes()}</p>
            </div>
            <p className="text-md font-light text-major-text">
              {comment.content}
            </p>
          </div>
        </div>
      </div>
    )
  );
}
