import { Box} from '@chakra-ui/react';
import React from 'react';
import UsersTable from "../components/UsersTable";

const UsersPage = () => {
  return (
    <Box h="100vh">
      <UsersTable/>
    </Box>
  );
};

export default UsersPage;
