export const pathKeys = {
  root: "/",
  home: "/",
  login: "/login",
  register: "/register",
  page404: "/404",

  tests: {
    root: "/test",
    bySlug: (slug: string) => `/test/${slug}`,
  },
};
