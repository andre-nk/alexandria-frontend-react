import { IoChevronForwardOutline } from "react-icons/io5";

export default function NoteToolbarButton({
  buttonIcon,
  buttonTitle,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="w-full p-3 flex justify-between items-center rounded-md hover:bg-gray-100 duration-200 border-2 border-primary-border"
    >
      <div className="flex space-x-3 items-center">
        {buttonIcon}
        <p className="text-sm">{buttonTitle}</p>
      </div>
      <IoChevronForwardOutline size={16} />
    </button>
  );
}
