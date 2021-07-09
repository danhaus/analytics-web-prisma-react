import React from 'react';
import StatsCard from './StatsCard';
import { BsFileEarmark } from 'react-icons/bs';
import { useFileCount } from "../../hooks/reportingHooks";

export default function FilesCountCard() {
  const fileCount = useFileCount();
  return <StatsCard title={'Files'} stat={fileCount.toString()} icon={<BsFileEarmark size={'3em'} />} />;
}
