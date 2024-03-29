import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, File, FileType } from '../types/serverTypes';

type UsersResponse = User[];
type FilesResponse = File[];
type FileStatsByTypeResponse = { type: FileType; count: number; duration: number; size: number }[];

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
    getFileCount: builder.query<number, void>({
      query: () => 'reports/fileCount',
    }),
    getAverageFileSize: builder.query<number, void>({
      query: () => 'reports/averageFileSize',
    }),
    getFileStatsByType: builder.query<FileStatsByTypeResponse, void>({
      query: () => 'reports/fileStats',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllUsersQuery,
  useGetAllFilesQuery,
  useGetFileCountQuery,
  useGetFileStatsByTypeQuery,
  useGetAverageFileSizeQuery,
} = reportingAPI;
