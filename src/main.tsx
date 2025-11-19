import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/theme.css";
import HomePage from "./pages/HomePage";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Legal from "./pages/Legal";
import DeleteAccount from "./pages/DeleteAccount";
import GuestDeleteAccount from "./pages/GuestDeleteAccount";
import PGDetails from "./pages/PGDetails";

function Router() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      const sameOrigin = url.origin === window.location.origin;
      const isFile =
        url.pathname.endsWith(".pdf") || url.pathname.endsWith(".zip");
      if (sameOrigin && !anchor.target && !isFile && !url.hash) {
        e.preventDefault();
        if (url.pathname !== window.location.pathname) {
          history.pushState({}, "", url.pathname);
          setPath(url.pathname);
          window.scrollTo({ top: 0 });
        }
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const view = useMemo(() => {
    switch (path) {
      case "/terms":
        return <Terms />;
      case "/privacy":
        return <Privacy />;
      case "/legal":
        return <Legal />;
      case "/delete-account":
        return <DeleteAccount />;
      case "/guest-delete-account":
        return <GuestDeleteAccount />;
      case "/pg":
        return <PGDetails />;
      default:
        return <HomePage />;
    }
  }, [path]);

  return view;
}

const root = document.getElementById("root") as HTMLElement;
createRoot(root).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
