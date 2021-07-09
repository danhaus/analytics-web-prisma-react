import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import React from 'react';
import { useGetAllUsersQuery, User } from '../../services/reportingService';
import { getName } from 'country-list';

const UserTableRow = ({ id, name, countryOfOrigin }: User) => (
  <Tr>
    <Td isNumeric>{id}</Td>
    <Td>{name}</Td>
    <Td>{getName(countryOfOrigin)}</Td>
  </Tr>
);

const UsersTable = () => {
  const { data } = useGetAllUsersQuery();

  const users = data ? data : [];

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
