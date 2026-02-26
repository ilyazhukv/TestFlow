export async function aboutPageLoader() {
  const data = { title: "About" };

  return data;
}

export type AboutPageData = Awaited<ReturnType<typeof aboutPageLoader>>;
