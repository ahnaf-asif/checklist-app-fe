import { Box, Button, Card, Flex, Table, Text } from '@mantine/core';
import { useAppSelector } from '@/Redux/hooks.ts';
import { axios } from '@/Config';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

export const GroupView = ({ getGroups, group }: any) => {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const deleteGroup = async () => {
    try {
      await axios.delete(`/groups/${group.id}`);
      notifications.show({
        title: 'Success',
        message: 'Group deleted successfully',
        color: 'green'
      });
      await getGroups();
    } catch (e) {
      console.log(e);
    }
  };

  const joinGroup = async () => {
    try {
      await axios.post(`/groups/${group.id}/join`);
      notifications.show({
        title: 'Success',
        message: 'Group joined successfully',
        color: 'green'
      });
      await getGroups();
    } catch (e) {
      console.log(e);
    }
  };

  const leaveGroup = async () => {
    try {
      await axios.post(`/groups/${group.id}/leave`);
      notifications.show({
        title: 'Success',
        message: 'Group left successfully',
        color: 'green'
      });
      await getGroups();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text fw={500}>{group.name}</Text>
      <Text size="xs" c="grey">
        Created by: {group.creator_username}
      </Text>

      <Box mt={20}>
        <Text size="sm" c="grey">
          {group.description}
        </Text>
      </Box>
      <Box mt={20}>
        <Table withRowBorders={false}>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td p={0}>Total Members</Table.Td>
              <Table.Td p={0}>{group.total_members}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td p={0}>Total Checklists</Table.Td>
              <Table.Td p={0}>{group.total_checklists}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Box>
      <Box mt={20}>
        <Flex wrap="wrap" gap={10} justify="flex-end" align="center">
          {(group.creator_username === auth.user?.username || Boolean(Number(group.is_member))) && (
            <Button onClick={() => navigate(`/groups/${group.id}`)} size="xs">
              Enter Group
            </Button>
          )}
          {group.creator_username !== auth.user?.username && Boolean(Number(group.is_member)) && (
            <Button onClick={leaveGroup} color="orange" size="xs">
              Leave Group
            </Button>
          )}
          {group.creator_username !== auth.user?.username && !Boolean(Number(group.is_member)) && (
            <Button onClick={joinGroup} color="green" size="xs">
              Join Group
            </Button>
          )}
          {group.creator_username === auth.user?.username && (
            <Button onClick={deleteGroup} color="red" size="xs">
              Delete Group
            </Button>
          )}
        </Flex>
      </Box>
    </Card>
  );
};
