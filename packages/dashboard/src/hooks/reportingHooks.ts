import {
  useGetAllUsersQuery,
  useGetAverageFileSizeQuery,
  useGetFileCountQuery
} from "../services/reportingService";

export const useFileCount = () => {
  const { data } = useGetFileCountQuery();
  return data ? data : 0;
};

export const useNumberOfUsers = () => {
  const allUsers = useGetAllUsersQuery();
  return allUsers.data ? allUsers.data.length : 0;
};

export const useFileSize = () => {
  const fileCount = useFileCount();
  const { data: averageFileSize } = useGetAverageFileSizeQuery();
  const sizePerFile = averageFileSize ? averageFileSize : 0;
  return fileCount * sizePerFile;
}
