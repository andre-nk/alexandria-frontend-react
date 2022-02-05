import { IoArchive } from "react-icons/io5";

export default function NoteArchiveBanner() {
    return (
        <div className={`w-full absolute top-0 flex space-x-4 justify-start items-center py-3 px-11 bg-primary-border`}>
          <IoArchive size={18} className="text-primary-blue" />
          <p className="text-sm text-major-text">This note is archived and currently can't be shared. You can unarchive this note on the toolbar</p>
        </div>
    )
}
