import { IoStar, IoStarOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function NoteCard({ _id, title, isStarred, author, tags }) {
  return (
    <Link to={`/notes/${_id}`}>
      <div className="h-[14rem] bg-white hover:shadow-lg mt-2 mb-8 p-6 duration-200 flex flex-col justify-between items-start">
        <div className="w-full flex justify-between items-start">
          <h2 className="text-xl font-medium">{title}</h2>
          {isStarred ? (
            <IoStar className="text-yellow-400" size={24} />
          ) : (
            <IoStarOutline size={24} />
          )}
        </div>
        <div className="flex flex-col space-y-3">
          <div className="text-md font-mono">
            by:{" "}
            <span className="hover:text-primary-red underline duration-200">
              {author}
            </span>
          </div>
          <div className="flex flex-wrap space-x-2">
            {tags &&
              tags.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="py-1 px-2 rounded-md bg-slate-100 hover:bg-primary-blue hover:text-white duration-200 cursor-pointer text-sm"
                  >
                    <p>{item}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Link>
  );
}
