import React from 'react';
import StatsCard from './StatsCard';
import { useGetAllFilesQuery } from '../../services/reportingService';
import { BsFileEarmark } from 'react-icons/bs';

export default function FilesCard() {
  const allFiles = useGetAllFilesQuery();
  const numberOfUsers = allFiles.data ? allFiles.data.length : 0;
  return <StatsCard title={'Files'} stat={numberOfUsers.toString()} icon={<BsFileEarmark size={'3em'} />} />;
}
