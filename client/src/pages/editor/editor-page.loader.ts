import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { z } from "zod";

import { queryClient } from "@/shared/queryClient";
import { pathKeys } from "@/shared/router";
import { store } from "@/shared/store";
import { testQueryOptions } from "@/entities/test/test.api";
import { sessionQueryOptions } from "@/entities/session/session.api";

export async function editorCreatePageLoader(args: LoaderFunctionArgs) {
  if (!store.getState()?.session) redirect(pathKeys.login);

  queryClient.prefetchQuery(sessionQueryOptions);

  return args;
}

export async function editorUpdatePageLoader(args: LoaderFunctionArgs) {
  if (!store.getState()?.session) redirect(pathKeys.login);

  const parsedArgs = EditorLoaderArgsSchema.parse(args);
  const { params } = parsedArgs;
  const { slug } = params;

  queryClient.prefetchQuery(sessionQueryOptions);
  queryClient.prefetchQuery(testQueryOptions(slug));

  return parsedArgs;
}

const EditorLoaderArgsSchema = z.object({
  request: z.custom<Request>(),
  params: z.object({ slug: z.string() }),
  context: z.any(),
});

export type EditorLoaderArgs = z.infer<typeof EditorLoaderArgsSchema>;
