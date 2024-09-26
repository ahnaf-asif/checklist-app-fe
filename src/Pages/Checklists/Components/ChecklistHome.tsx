import { Container, Group, Badge, Text, Card, Box } from '@mantine/core';

const ChecklistHome = ({ checklist }: any) => {
  return (
    <Container>
      <Card shadow="sm" withBorder>
        <Text>{checklist?.name}</Text>
        <Group mt={10} justify="flex-between" style={{ marginTop: 5, marginBottom: 5 }}>
          <Badge color="blue" variant="light">
            Created by: {checklist?.creator_name}
          </Badge>
          <Badge color="green" variant="light">
            Used by: {checklist?.used_by}
          </Badge>
        </Group>
        <Box mt={20}>
          <Text mb={20} fw={500}>
            Categories:
          </Text>
          {checklist?.categories?.map((category: any) => {
            return (
              <Badge mx={2} key={category.id} color="cyan" variant="light">
                {category?.name}
              </Badge>
            );
          })}
        </Box>
        <Text size="sm" style={{ lineHeight: 1.5 }} mt={20}>
          {checklist?.description}
        </Text>
      </Card>
    </Container>
  );
};

export default ChecklistHome;
