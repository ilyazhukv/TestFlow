import { LoaderFunctionArgs } from "react-router-dom";
import { z } from "zod";

import { queryClient } from "@/shared/queryClient";
import { sessionQueryOptions } from "@/entities/session/session.api";
import { profileQueryOptions } from "@/entities/profile/profile.api";

export default async function profilePageLoader(args: LoaderFunctionArgs) {
  const parsedArgs = ProfileLoaderArgsSchema.parse(args);
  const { name } = parsedArgs.params;

  queryClient.prefetchQuery(sessionQueryOptions);

  queryClient.prefetchQuery(profileQueryOptions(name));

  return parsedArgs;
}

const ProfileLoaderArgsSchema = z.object({
  request: z.custom<Request>(),
  params: z.object({ 
    name: z.string().min(1, "Name is required") 
  }),
  context: z.any(),
});

export type ProfileLoaderArgs = z.infer<typeof ProfileLoaderArgsSchema>;
