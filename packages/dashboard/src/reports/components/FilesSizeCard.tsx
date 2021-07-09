import React from 'react';
import StatsCard from './StatsCard';
import { useGetAverageFileSizeQuery, useGetFileCountQuery } from '../../services/reportingService';
import { FiServer } from 'react-icons/fi';

export default function FilesSizeCard() {
  const { data: numberOfFiles } = useGetFileCountQuery();
  const fileCount = numberOfFiles ? numberOfFiles : 0;
  const { data: averageFileSize } = useGetAverageFileSizeQuery();
  const sizePerFile = averageFileSize ? averageFileSize : 0;
  const fileSize = fileCount * sizePerFile;

  return <StatsCard title={'Size'} stat={`${fileSize} B`} icon={<FiServer size={'3em'} />} />;
}
