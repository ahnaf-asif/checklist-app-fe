import { Box, Button, Skeleton, Table } from '@mantine/core';
import { useAppSelector } from '@/Redux/hooks.ts';
import { useEffect, useState } from 'react';
import { axios } from '@/Config';
import { notifications } from '@mantine/notifications';

const UsersSkeleton = () => {
  return (
    <Box>
      {[1, 2, 3, 4, 5].map((i) => (
        <Box key={i} mt={6}>
          <Skeleton height={25} mt={10} />
        </Box>
      ))}
    </Box>
  );
};
export const AllUsers = ({ activeTab }: any) => {
  const auth = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`/users`);
      setUsers(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const addFriend = async (name: string, id: number) => {
    try {
      await axios.post(`/users/${auth.user?.id}/friends/${id}`);
      notifications.show({
        title: 'Success',
        message: `Successfully added ${name} as friend`,
        color: 'green'
      });
      await getAllUsers();
    } catch (e) {
      console.log(e);
    }
  };

  const unfriend = async (name: string, id: number) => {
    try {
      await axios.delete(`/users/${auth.user?.id}/friends/${id}`);
      notifications.show({
        title: 'Success',
        message: `Successfully unfriended ${name}`,
        color: 'green'
      });
      await getAllUsers();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth.user) {
      getAllUsers();
    }
  }, [auth, activeTab]);

  return (
    <Box>
      {loading ? (
        <UsersSkeleton />
      ) : (
        <Box mt={20}>
          <Table withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>SL</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Username</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {users.map(({ id, name, username, email, is_friend }, index) => {
                return (
                  <Table.Tr key={id}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{name}</Table.Td>
                    <Table.Td>{username}</Table.Td>
                    <Table.Td>{email}</Table.Td>
                    <Table.Td>
                      {is_friend ? (
                        <Button onClick={() => unfriend(name, id)} size="xs" color="orange">
                          Unfriend
                        </Button>
                      ) : (
                        <Button onClick={() => addFriend(name, id)} size="xs" color="green">
                          Add Friend
                        </Button>
                      )}
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};
