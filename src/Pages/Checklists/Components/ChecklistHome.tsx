import { Container, Button, Group, Badge, Text } from '@mantine/core';

interface ChecklistHomeProps {
  checklist: Record<string, any>;
}

const ChecklistHome: React.FC<ChecklistHomeProps> = ({ checklist }) => {
  return (
    <Container>
      <Text>{checklist.name}</Text>
      <Group justify="flex-between" style={{ marginTop: 5, marginBottom: 5 }}>
        <Badge color="blue" variant="light">
          Created by: {checklist.creator_name}
        </Badge>
        <Badge color="green" variant="light">
          Used by: {checklist.used_by}
        </Badge>
      </Group>
      <Text size="sm" style={{ lineHeight: 1.5 }}>
        {checklist.description}
      </Text>
      <Button fullWidth mt="md" variant={checklist.enrolled ? 'outline' : 'filled'}>
        {checklist.enrolled ? 'Edit' : 'Enroll'}
      </Button>{' '}
    </Container>
  );
};

export default ChecklistHome;
