import { RouteObject } from "react-router-dom";

import { pathKeys } from "@/shared/router";

export const editorPageRoute: RouteObject = {
  path: pathKeys.editor.root,
  children: [
    {
      index: true,
      lazy: async () => {
        const [loader, Component] = await Promise.all([
          import("./editor-page.loader").then((m) => m.editorCreatePageLoader),
          import("./editor-page.ui").then((m) => m.CreateEditorPage),
        ]);

        return { loader, Component };
      },
    },
    {
      path: ":slug",
      lazy: async () => {
        const [loader, Component] = await Promise.all([
          import("./editor-page.loader").then((m) => m.editorUpdatePageLoader),
          import("./editor-page.ui").then((m) => m.UpdateEditorPage)
        ]);

        return { loader, Component };
      },
    },
  ],
};
