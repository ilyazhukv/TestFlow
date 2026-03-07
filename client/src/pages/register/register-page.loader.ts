export default async function registerPageLoader() {
  const data = { title: "Register" };

  return data;
}

export type RegisterPageData = Awaited<ReturnType<typeof registerPageLoader>>;
