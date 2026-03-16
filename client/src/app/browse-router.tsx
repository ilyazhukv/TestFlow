import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { DefaultLayout } from "./layouts/default";

import { homePageRoute } from "@/pages/home/home-page.route";
import { loginPageRoute } from "@/pages/login/login-page.route";
import { registerPageRoute } from "@/pages/register/register-page.route";
import { testListPageRoute } from "@/pages/test-list/test-list-page.route";
import { page404Route } from "@/pages/page-404/page-404.route";
import { pathKeys } from "@/shared/router";
import { persistor, store } from "@/shared/store";
import { Spiner } from "@/shared/ui/spiner/spiner.ui";
import { queryClient } from "@/shared/queryClient";
import { sessionQueryOptions } from "@/entities/session/session.api";

async function rootLoader() {
  if (!store.getState().session) {
    try {
      await queryClient.fetchQuery({
        ...sessionQueryOptions,
        meta: { skipAuthRefresh: true }
      });
    } catch (e: any) {}
  }

  return null;
}
export function BootstrappedRouter() {
  const [router, setRouter] = useState<ReturnType<typeof browserRouter> | null>(
    null,
  );

  useEffect(() => {
    if (persistor.getState().bootstrapped) {
      setRouter(browserRouter());
    } else {
      const unsubscribe = persistor.subscribe(() => {
        if (persistor.getState().bootstrapped) {
          setRouter(browserRouter());
          unsubscribe();
        }
      });
    }
  }, []);

  if (!router) {
    return <Spiner />;
  }

  return <RouterProvider fallbackElement={<Spiner />} router={router} />;
}

const browserRouter = () =>
  createBrowserRouter([
    {
      errorElement: <BubbleError />,
      children: [
        {
          element: <DefaultLayout />,
          loader: rootLoader,
          children: [
            homePageRoute,
            loginPageRoute,
            registerPageRoute,
            testListPageRoute,
          ],
        },
        {
          element: <Outlet />,
          children: [page404Route],
        },
        {
          path: "*",
          loader: async () => redirect(pathKeys.page404),
        },
      ],
    },
  ]);

function BubbleError(): null {
  const error = useRouteError();

  if (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(
        typeof error === "string" ? error : JSON.stringify(error),
      );
    }
  }

  return null;
}
