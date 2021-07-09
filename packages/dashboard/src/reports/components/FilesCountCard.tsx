import React from 'react';
import StatsCard from './StatsCard';
import {  useGetFileCountQuery } from "../../services/reportingService";
import { BsFileEarmark } from 'react-icons/bs';

export default function FilesCountCard() {
  const {data} = useGetFileCountQuery();
  const fileCount = data ? data : 0;
  return <StatsCard title={'Files'} stat={fileCount.toString()} icon={<BsFileEarmark size={'3em'} />} />;
}
