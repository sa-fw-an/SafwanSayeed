import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

export const ROUTES = [
  "/",
  "/work",
  "/journey",
  "/studio",
  "/contact",
] as const;
export type Route = (typeof ROUTES)[number];

function readRoute(): Route {
  const hash = window.location.hash.replace(/^#/, "");
  const base = "/" + hash.split("/").filter(Boolean)[0];
  return (ROUTES as readonly string[]).includes(base) ? (base as Route) : "/";
}

type RouterValue = {
  route: Route;
  navigate: (to: Route) => void;
};

const RouterContext = createContext<RouterValue>({
  route: "/",
  navigate: () => {},
});

export function useRouter() {
  return useContext(RouterContext);
}

/**
 * Hash-based router. Page changes are wrapped in a View Transition when the
 * browser supports it; flushSync makes the DOM update synchronous so the
 * transition can snapshot old/new frames correctly.
 */
export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (to: Route) => {
    if (to === readRoute()) return;
    const go = () => {
      flushSync(() => {
        window.location.hash = to.slice(1);
        setRoute(to);
      });
      window.scrollTo(0, 0);
    };
    if (
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      document.startViewTransition
    ) {
      document.startViewTransition(go);
    } else {
      go();
    }
  };

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}
