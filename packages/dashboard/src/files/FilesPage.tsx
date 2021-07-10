import { Box } from '@chakra-ui/react';
import React from 'react';
import FilesTable from './components/FilesTable';

const FilesPage = () => {
  return (
    <Box h="100vh" align="center">
      <FilesTable />
    </Box>
  );
};

export default FilesPage;
