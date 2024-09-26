import { AuthGuard } from '@/Guards';
import { Layout } from '@/Layouts';
import { Box, LoadingOverlay, Tabs, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/Redux/hooks.ts';
import { useEffect, useState } from 'react';
import { axios } from '@/Config';
import { Overview } from '@/Pages/Groups/Group/Overview.tsx';
import { Members } from '@/Pages/Groups/Group/Members.tsx';

export const Group = () => {
  const { id } = useParams();
  const auth = useAppSelector((state) => state.auth);
  const [loading, isLoading] = useState(true);
  const [group, setGroup] = useState({
    name: '',
    id: -1,
    description: '',
    created_at: '',
    creator_username: '',
    total_checklists: '',
    total_members: '',
    is_member: true
  });

  const getGroup = async () => {
    try {
      const { data } = await axios.get(`/groups/${id}`);
      setGroup(data);
      isLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth.user) {
      getGroup();
    }
  }, [auth]);

  return (
    <AuthGuard>
      <Layout showSidebar>
        {loading ? (
          <LoadingOverlay visible={loading} />
        ) : (
          <Box>
            <Title>{group.name}</Title>
            <Tabs mt={20} defaultValue="overview">
              <Tabs.List>
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="Members">Members</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="overview">
                <Overview group={group} />
              </Tabs.Panel>
              <Tabs.Panel value="Members">
                <Members group={group} />
              </Tabs.Panel>
            </Tabs>
          </Box>
        )}
      </Layout>
    </AuthGuard>
  );
};
