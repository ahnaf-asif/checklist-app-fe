import { Grid, Card, Button, Skeleton, Group, Badge, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/Redux/hooks.ts';
import { useEffect } from 'react';
import { axios } from '@/Config';
import { notifications } from '@mantine/notifications';
export const ChecklistGrid = (condition: any, checklists: any[], loading: boolean) => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);

  const enrollChecklist = async (data: any) => {
    try {
      await axios.post('/checklists/enroll', data);
      notifications.show({
        title: 'Success',
        message: 'Enrolled successfully',
        color: 'green'
      });
      navigate(`/checklists/${data.checklist_id}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth.user) console.log(checklists);
  }, [auth, checklists]);

  return (
    <Grid>
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Card shadow="sm" padding="lg">
                <Skeleton height={200} radius="sm" />
                <Skeleton height={30} mt="md" radius="sm" />
                <Skeleton height={20} mt="sm" radius="sm" />
                <Skeleton height={20} mt="sm" width="60%" radius="sm" />
                <Skeleton height={36} mt="md" radius="sm" />
              </Card>
            </Grid.Col>
          ))
        : checklists
            .filter((checklist) => condition(checklist.enrolled))
            .map((checklist) => (
              <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={checklist.id}>
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
                  {(checklist.enrolled || checklist.creator_id === auth.user?.id) && (
                    <Button
                      mt={20}
                      onClick={() => navigate(`/checklists/${checklist.id}`)}
                      variant="outline"
                    >
                      Enter
                    </Button>
                  )}
                  {!checklist.enrolled && checklist.creator_id !== auth.user?.id && (
                    <Button
                      mt={20}
                      onClick={() =>
                        enrollChecklist({ user_id: auth.user?.id, checklist_id: checklist.id })
                      }
                    >
                      Enroll
                    </Button>
                  )}
                </Card>
              </Grid.Col>
            ))}
    </Grid>
  );
};
