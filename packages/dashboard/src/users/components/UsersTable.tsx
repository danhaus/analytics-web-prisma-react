import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import React from 'react';

interface User {
  id: number;
  name: string;
  countryOfOrigin: string;
}

const UserTableRow = ({ id, name, countryOfOrigin }: User) => (
  <Tr>
    <Td isNumeric>{id}</Td>
    <Td>{name}</Td>
    <Td>{countryOfOrigin}</Td>
  </Tr>
);

const UsersTable = () => {
  const users: User[] = [
    { id: 1, name: 'James', countryOfOrigin: 'Finland' },
    { id: 2, name: 'Ariane', countryOfOrigin: 'Germany' },
  ];

  return (
    <Table variant="simple">
      <TableCaption>List of users</TableCaption>
      <Thead>
        <Tr>
          <Th isNumeric>User ID</Th>
          <Th>Name</Th>
          <Th>Country of origin</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((u) => (
          <UserTableRow id={u.id} name={u.name} countryOfOrigin={u.countryOfOrigin} />
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th isNumeric>User ID</Th>
          <Th>Name</Th>
          <Th>Country of origin</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

export default UsersTable;
