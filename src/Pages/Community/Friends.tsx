import { Box, Button, Skeleton, Table } from '@mantine/core';
import { useAppSelector } from '@/Redux/hooks.ts';
import { axios } from '@/Config';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';

const FriendsSkeleton = () => {
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

export const Friends = ({ activeTab }: any) => {
  const auth = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState<any[]>([]);

  const getAllFriends = async () => {
    try {
      const { data } = await axios.get(`/users/${auth.user?.id}/friends`);
      setFriends(data);
      setLoading(false);
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
      await getAllFriends();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth.user) {
      getAllFriends();
    }
  }, [auth, activeTab]);

  return (
    <Box mt={20}>
      {loading ? (
        <FriendsSkeleton />
      ) : (
        <Box>
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
              {friends.map(({ id, name, username, email }, index) => {
                return (
                  <Table.Tr key={id}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{name}</Table.Td>
                    <Table.Td>{username}</Table.Td>
                    <Table.Td>{email}</Table.Td>
                    <Table.Td>
                      <Button
                        onClick={() => {
                          unfriend(name, id);
                        }}
                        size="xs"
                        color="orange"
                      >
                        Unfriend
                      </Button>
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
