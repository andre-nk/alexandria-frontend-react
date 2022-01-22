import { useLocation } from "react-router-dom";

export default function DrawerLinks({ setIsOpen, title, pathname }) {
  const location = useLocation();

  return (
    <a href={pathname}>
      <div className="flex space-x-4 items-center py-4 cursor-pointer">
        {location.pathname === pathname && (
          <div className="h-[5px] w-[5px] bg-primary-blue rounded-full"></div>
        )}
        <p
          className={`text-lg`}
          onClick={() => setIsOpen(false)}
        >
          {title}
        </p>
      </div>
    </a>
  );
}
