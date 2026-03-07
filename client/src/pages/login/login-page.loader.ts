import { LoaderFunctionArgs, redirect } from "react-router-dom";

import { pathKeys } from "@/shared/router";
import { store } from "@/shared/store";

export default async function loginPageLoader(args: LoaderFunctionArgs) {
  if (store.getState().session?.token) {
    redirect(pathKeys.root);
  }

  return args;
}
