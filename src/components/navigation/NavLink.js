export default function NavLink({pathname, title}) {
  return (
    <a href={pathname}>
      <p
        className={
          `text-md cursor-pointer`
        }
      >
        {title}
      </p>
    </a>
  );
}
