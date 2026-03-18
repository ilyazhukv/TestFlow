export const pathKeys = {
  root: "/",
  home: "/",
  login: "/login",
  register: "/register",
  page404: "/404",

  test: {
    root: "/test",
    create: "/test/create",
    bySlug: (slug: string) => `/test/${slug}`,
  },

  editor: {
    root: "/editor/",
    bySlug: (slug: string) => `/editor/${slug}/`,
  },
};
