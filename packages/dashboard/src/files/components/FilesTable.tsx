import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import React from 'react';
import { useGetAllFilesQuery } from '../../services/reportingService';
import { File } from '../../types/serverTypes';

const FilesTableRow = ({ uuid, name, type, duration, size }: Omit<File, 'userId'>) => (
  <Tr>
    <Td isNumeric>{uuid}</Td>
    <Td>{name}</Td>
    <Td>{type}</Td>
    <Td isNumeric>{duration}</Td>
    <Td isNumeric>{size}</Td>
  </Tr>
);

const TableHeader = () => (
  <Tr>
    <Th isNumeric>UUID</Th>
    <Th>Name</Th>
    <Th>Type</Th>
    <Th>Duration</Th>
    <Th>Size</Th>
  </Tr>
);

const FilesTable = () => {
  const { data } = useGetAllFilesQuery();

  const files = data ? data : [];

  return (
    <Table variant="simple">
      <TableCaption>List of files</TableCaption>
      <Thead>
        <TableHeader />
      </Thead>
      <Tbody>
        {files.map((f) => (
          <FilesTableRow {...f} />
        ))}
      </Tbody>
      <Tfoot>
        <TableHeader />
      </Tfoot>
    </Table>
  );
};

export default FilesTable;
