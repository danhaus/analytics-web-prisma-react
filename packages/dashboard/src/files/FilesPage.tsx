import { Box } from '@chakra-ui/react';
import React from 'react';
import FilesTable from './components/FilesTable';

const FilesPage = () => {
  return (
    <Box h="100vh">
      <FilesTable />
    </Box>
  );
};

export default FilesPage;
