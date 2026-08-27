import { QueryClient } from "@tanstack/react-query";
import { createRouter as createRouterInstance } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const getBasePath = () => {
  if (typeof window !== "undefined") {
    if (window.location.pathname.startsWith("/your-next-favorite-app")) {
      return "/your-next-favorite-app";
    }
  }
  const envBase = import.meta.env.BASE_URL;
  if (envBase && envBase !== "/") {
    return envBase.endsWith("/") ? envBase.slice(0, -1) : envBase;
  }
  return "/your-next-favorite-app";
};

export function createRouter() {
  const queryClient = new QueryClient();

  const router = createRouterInstance({
    routeTree,
    basepath: getBasePath(),
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
}

export const getRouter = createRouter;
