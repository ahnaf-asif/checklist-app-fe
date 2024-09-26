import { Box, Table } from '@mantine/core';
import { useAppSelector } from '@/Redux/hooks.ts';
import { useEffect, useState } from 'react';
import { axios } from '@/Config';

export const Members = ({ group }: any) => {
  const auth = useAppSelector((state) => state.auth);
  const [members, setMembers] = useState<any[]>([]);

  const getMembers = async () => {
    try {
      const { data } = await axios.get(`/groups/${group.id}/members`);
      setMembers(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth.user) {
      getMembers();
    }
  }, [auth]);

  return (
    <Box mt={20}>
      <Table withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>SL</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {members.map(
            (member, index) => (
              <Table.Tr key={index}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{member.username}</Table.Td>
                <Table.Td>{member.name}</Table.Td>
                <Table.Td>{member.email}</Table.Td>
              </Table.Tr>
            ),
            []
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
