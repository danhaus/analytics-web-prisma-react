import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, File } from '../types/serverTypes';

type UsersResponse = User[];
type FilesResponse = File[];

// Define a service using a base URL and expected endpoints
export const reportingAPI = createApi({
  reducerPath: 'reportingAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<UsersResponse, void>({
      query: (name) => `users/`,
    }),
    getAllFiles: builder.query<FilesResponse, void>({
      query: () => 'files/',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllUsersQuery, useGetAllFilesQuery } = reportingAPI;
