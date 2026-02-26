export async function docsPageLoader() {
  const data = { title: "Docs" };

  return data;
}

export type DocsPageData = Awaited<ReturnType<typeof docsPageLoader>>;
