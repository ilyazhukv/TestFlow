import { api } from "@/shared/api/api.instance";
import { queryOptions } from "@tanstack/react-query";

export const adminStatsQueryOptions = queryOptions({
  queryKey: ["admin", "stats"],
  queryFn: async () => {
    const { data } = await api.get("/admin/stats");
    return data;
  },
});

export const adminUsersQueryOptions = (page: number = 1) =>
  queryOptions({
    queryKey: ["admin", "users", page],
    queryFn: async () => {
      const { data } = await api.get(`/admin/users?page=${page}&limit=20`);
      return data;
    },
  });

export const adminTestsQueryOptions = (page: number = 1) =>
  queryOptions({
    queryKey: ["admin", "tests", page],
    queryFn: async () => {
      const { data } = await api.get(`/admin/tests?page=${page}&limit=20`);
      return data;
    },
  });