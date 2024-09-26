import { axios } from '@/Config';
import { Layout } from '@/Layouts';
import { useAppSelector } from '@/Redux/hooks';
import { Skeleton, Tabs, Space, Box, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ChecklistHome from './Components/ChecklistHome';
import ChecklistProgress from './Components/ChecklistProgress.tsx';
import ChecklistEdit from './Components/ChecklistEdit.tsx';

export const Checklist = () => {
  const auth = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [checklist, setChecklist] = useState<Record<string, any>>();
  const [individualChecklist, setIndividualChecklist] = useState<Record<string, any>>();
  const params = useParams();

  const getIndividualData = async () => {
    try {
      const response = await axios.get(`/checklists/individual/${params.id}`);
      setIndividualChecklist(response.data);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : String(error),
        color: 'red'
      });
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(`/checklists/${params.id}`);

      setChecklist(response.data);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : String(error),
        color: 'red'
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    if (auth.user) {
      getData();
      getIndividualData();
    }
    setLoading(false);
  }, [auth]);
  return (
    <Layout showSidebar>
      {loading || !checklist ? (
        <Skeleton height={200} />
      ) : (
        <Box>
          <Title>{checklist?.name}</Title>
          <Tabs mt={20} defaultValue="home">
            <Tabs.List>
              <Tabs.Tab value="home">Home</Tabs.Tab>
              <Tabs.Tab value="progress">Progress Tracker</Tabs.Tab>
              <Tabs.Tab value="edit">Edit</Tabs.Tab>
            </Tabs.List>
            <Space h="md" />
            <>
              <Tabs.Panel value="home">
                <ChecklistHome checklist={individualChecklist} />
              </Tabs.Panel>

              <Tabs.Panel value="progress">
                <ChecklistProgress checklist={individualChecklist!} />
              </Tabs.Panel>

              <Tabs.Panel value="edit">
                <ChecklistEdit
                  getIndividualData={getIndividualData}
                  checklist={individualChecklist!}
                />
              </Tabs.Panel>
            </>
          </Tabs>
        </Box>
      )}
    </Layout>
  );
};
