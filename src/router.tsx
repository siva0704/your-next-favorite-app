import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const getBasePath = () => {
  const envBase = import.meta.env.BASE_URL;
  if (envBase && envBase !== "/") {
    return envBase.endsWith("/") ? envBase.slice(0, -1) : envBase;
  }
  return "/your-next-favorite-app";
};

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    basepath: getBasePath(),
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
