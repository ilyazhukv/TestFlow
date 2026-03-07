import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Provider as ReduxProvider } from "react-redux";

import { BootstrappedRouter } from "./browse-router";

import { refreshSession } from "@/entities/session/session.api";
import { attachAuthInterceptor, setRefreshHandler } from "@/shared/api/api.instance";
import { queryClient } from "@/shared/queryClient";
import { store } from "@/shared/store";

attachAuthInterceptor(() => store.getState().session?.token);
setRefreshHandler(refreshSession)

export default function App() {
  return (
    <ErrorBoundary fallback={"Something went wrong..."}>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <BootstrappedRouter />
        </QueryClientProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
}
