import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../navigation/NavBar";
import Drawer from "../navigation/Drawer";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Layout(props) {
  const { user, authIsReady } = useAuthContext();
  const [isDrawerOpen, setDrawerIsOpen] = useState(false);

  const navigate = useNavigate();
  var isDynamic = false;

  if (navigate.pathname == "/" || navigate.pathname == "/app") {
    isDynamic = true;
  }

  return (
    <div>
      <Drawer isOpen={isDrawerOpen} setIsOpen={setDrawerIsOpen} />
      {navigate.pathname.indexOf("auth") < 1 && (
        <Navbar isDynamic={isDynamic} setIsOpen={setDrawerIsOpen} />
      )}
      <div className="debug-screens">{props.children}</div>
    </div>
  );
}
