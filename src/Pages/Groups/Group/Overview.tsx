import { Box, Text, Card } from '@mantine/core';

export const Overview = ({ group }: any) => {
  return (
    <Box mt={20}>
      <Card shadow="xs" padding="md">
        <Box>
          <Text>{group.description}</Text>
          <Text size="xs" c="grey">
            Created by: {group.creator_username}
          </Text>
        </Box>
        <Box mt={20}>
          <Text>Total Members: {group.total_members}</Text>
          <Text>Total Checklists: {group.total_checklists}</Text>
        </Box>
      </Card>
    </Box>
  );
};
