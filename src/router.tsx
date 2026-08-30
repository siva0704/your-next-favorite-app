import { QueryClient } from "@tanstack/react-query";
import { createRouter as createRouterInstance } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const getBasePath = () => {
  if (typeof process !== "undefined" && process.env.TSS_ROUTER_BASEPATH) {
    return process.env.TSS_ROUTER_BASEPATH;
  }
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path.startsWith("/your-next-favorite-app")) {
      return "/your-next-favorite-app";
    }
    if (window.location.hostname.endsWith("github.io")) {
      const match = path.match(/^\/([^/]+)/);
      if (match && match[1]) {
        return `/${match[1]}`;
      }
    }
  }
  return undefined;
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
