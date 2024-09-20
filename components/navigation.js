// components/NavigationEvents.js
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: true, // Disable the spinner
  speed: 100, // Adjust the speed of the progress bar
  minimum: 0.02, // Minimum percentage to start
  trickleSpeed: 30, // Adjust the trickle speed
  easing: "ease",
});

const NavigationEvents = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
    }, 3000);
  }, [pathname, searchParams]);

  return null;
};

export default NavigationEvents;
