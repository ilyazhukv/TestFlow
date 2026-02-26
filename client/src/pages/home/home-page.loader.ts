export async function homePageLoader() {
  const data = { title: "Home" };

  return data;
}

export type HomePageData = Awaited<ReturnType<typeof homePageLoader>>;
