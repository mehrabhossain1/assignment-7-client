import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://l2-b2-assignment-6-backend-mehrabhossain1.vercel.app/api/v1",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
