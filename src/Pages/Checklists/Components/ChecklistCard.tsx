import { Grid, Card, Button, Skeleton, Group, Badge, Text } from '@mantine/core';
export const ChecklistGrid = (condition: any, checklists: any[], loading: boolean) => {
    return (
        <Grid>
            {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 3, }} key={index}>
                        <Card shadow="sm" padding="lg">
                            <Skeleton height={200} radius="sm" />
                            <Skeleton height={30} mt="md" radius="sm" />
                            <Skeleton height={20} mt="sm" radius="sm" />
                            <Skeleton height={20} mt="sm" width="60%" radius="sm" />
                            <Skeleton height={36} mt="md" radius="sm" />
                        </Card>
                    </Grid.Col>
                ))
                : checklists.filter(checklist => condition(checklist.enrolled)).map((checklist) => (
                    <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 3, }} key={checklist.id}>
                        <Card shadow="sm" padding="lg">
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
                            <Button
                                fullWidth
                                mt="md"
                                variant={checklist.enrolled ? 'outline' : 'filled'}
                            >
                                {checklist.enrolled ? 'Edit' : 'Enroll'}
                            </Button>
                        </Card>
                    </Grid.Col>
                ))}
        </Grid>
    );
}
