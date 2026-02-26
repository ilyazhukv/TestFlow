export async function blogPageLoader() {
  const data = { title: "Blog" };

  return data;
}

export type BlogPageData = Awaited<ReturnType<typeof blogPageLoader>>;
