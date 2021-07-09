import React from 'react';
import { Box } from '@chakra-ui/react';
import FileStatsByType from '../components/FileStatsByType';
import TotalCards from '../components/TotalCards';

const ReportsPage = () => {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <TotalCards />
      <FileStatsByType />
    </Box>
  );
};

export default ReportsPage;
