import { useLocation } from "react-router-dom";

export default function NavLink({pathname, title}) {
  const location = useLocation();

  return (
    <a href={pathname}>
      <p
        className={
          `${location.pathname === pathname && "font-medium"} text-md cursor-pointer`
        }
      >
        {title}
      </p>
    </a>
  );
}
