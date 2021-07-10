import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import React from 'react';
import { useGetAllUsersQuery } from '../../services/reportingService';
import { getName } from 'country-list';
import { User } from '../../types/serverTypes';

const UserTableRow = ({ id, name, countryOfOrigin }: User) => (
  <Tr>
    <Td isNumeric>{id}</Td>
    <Td>{name}</Td>
    <Td>{getName(countryOfOrigin)}</Td>
  </Tr>
);

const TableHeader = () => (
  <Tr>
    <Th isNumeric>User ID</Th>
    <Th>Name</Th>
    <Th>Country of origin</Th>
  </Tr>
);

const UsersTable = () => {
  const { data } = useGetAllUsersQuery();

  const users = data ? data : [];

  return (
    <Table variant="simple" colorScheme="telegram" w={'600px'}>
      <TableCaption>List of users</TableCaption>
      <Thead>
        <TableHeader />
      </Thead>
      <Tbody>
        {users.map((u) => (
          <UserTableRow key={u.id} id={u.id} name={u.name} countryOfOrigin={u.countryOfOrigin} />
        ))}
      </Tbody>
      <Tfoot>
        <TableHeader />
      </Tfoot>
    </Table>
  );
};

export default UsersTable;
