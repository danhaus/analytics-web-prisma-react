import { Box, chakra, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import StatsCard from './StatsCard';
import { BsFileEarmark } from 'react-icons/bs';
import { useGetFileStatsByTypeQuery } from '../../services/reportingService';
import { FiServer } from 'react-icons/fi';
import { IoIosTimer } from 'react-icons/all';

const FileStatsByType = () => {
  const { data: fileStatsByTypeFromQuery } = useGetFileStatsByTypeQuery();
  const fileSizeByType = fileStatsByTypeFromQuery ? fileStatsByTypeFromQuery : [];
  return (
    <Box>
      {fileSizeByType.map((i) => (
        <Box key={i.type}>
          <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={5} fontWeight={'bold'}>
            {i.type}
          </chakra.h1>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard title="Files" stat={i.count.toString()} icon={<BsFileEarmark size={'3em'} />} />
            <StatsCard
              title="Size"
              stat={`${i.size} B`}
              icon={<FiServer size={'3em'} />}
              helpText={`${(i.size / i.count).toFixed(0)} B/file`}
            />
            <StatsCard
              title="Duration"
              stat={`${i.duration} s`}
              icon={<IoIosTimer size={'3em'} />}
              helpText={`${(i.duration / i.count).toFixed(0)} s/file`}
            />
          </SimpleGrid>
        </Box>
      ))}
    </Box>
  );
};
export default FileStatsByType;
