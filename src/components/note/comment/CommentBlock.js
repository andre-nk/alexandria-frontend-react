export default function CommentBlock({ comment }) {
  return (
    <div>
      <div className="w-full flex items-start justify-between">
        <div className="h-12 w-12 aspect-square cursor-pointer rounded-full bg-primary-border overflow-clip">
          <img
            alt="profilePicture"
            width={36}
            height={36}
            className="object-cover w-full h-full bg-gray-300"
          />
        </div>
        <div className="flex flex-col w-[90%] space-y-1">
          <div className="w-full flex items-center space-x-2">
            <p className="text-md font-medium text-major-text">
              {comment.name}
            </p>
            <p className="text-md text-minor-text">4:00 PM</p>
          </div>
          <p className="text-md font-light text-major-text">
              {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
}
