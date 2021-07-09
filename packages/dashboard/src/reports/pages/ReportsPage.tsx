import React from 'react';
import { Box, chakra, SimpleGrid } from '@chakra-ui/react';
import UsersCard from '../components/UsersCard';
import FilesCountCard from '../components/FilesCountCard';

const ReportsPage = () => {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
        Totals
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <UsersCard />
        <FilesCountCard />
      </SimpleGrid>
    </Box>
  );
};

export default ReportsPage;
