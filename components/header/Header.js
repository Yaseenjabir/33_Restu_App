"use client";

import { useEffect, useState } from "react";
import DesktopHeader from "./desktopHeader";
import MobileHeader from "./mobileHeader";

const Header = () => {
  const [username, setUsername] = useState();

  useEffect(() => {
    const json = localStorage.getItem("costumer");
    const parsed = json && JSON.parse(json);
    if (parsed) {
      setUsername(parsed.name);
    }
  }, []);

  return (
    <>
      <MobileHeader username={username} />
      <DesktopHeader />
    </>
  );
};

export default Header;
