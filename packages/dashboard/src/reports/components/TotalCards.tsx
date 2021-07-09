import { Box, chakra, SimpleGrid } from '@chakra-ui/react';
import StatsCard from './StatsCard';
import { BsFileEarmark, BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import React from 'react';
import { useFileCount, useFileSize, useNumberOfUsers } from '../../hooks/reportingHooks';

const TotalCards = () => {
  const i = { type: 'a', size: 1, duration: 3, count: 3 };

  const numberOfUsers = useNumberOfUsers();
  const fileCount = useFileCount();
  const fileSize = useFileSize();

  return (
    <Box key={i.type}>
      <chakra.h1 textAlign={'center'} fontSize={'4xl'} pb={5} fontWeight={'bold'}>
        Totals
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'Users'} stat={numberOfUsers.toString()} icon={<BsPerson size={'3em'} />} />
        <StatsCard title={'Files'} stat={fileCount.toString()} icon={<BsFileEarmark size={'3em'} />} helpText={`${(fileCount/numberOfUsers).toFixed(1)} per user`} />
        <StatsCard title={'Size'} stat={`${fileSize} B`} icon={<FiServer size={'3em'} />} helpText={`${(fileSize/fileCount).toFixed(0)} B/user`} />
      </SimpleGrid>
    </Box>
  );
};

export default TotalCards;
