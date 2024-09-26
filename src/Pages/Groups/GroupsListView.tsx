import { Box, Grid, Skeleton } from '@mantine/core';
import { useAppSelector } from '@/Redux/hooks.ts';
import { useEffect, useState } from 'react';
import { axios } from '@/Config';
import { GroupView } from './GroupView.tsx';

const GroupsSkeleton = () => {
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

export const GroupsListView = ({ activeTab, api, refresh }: any) => {
  const auth = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<any[]>([]);

  const getGroups = async () => {
    try {
      const { data } = await axios.get(api);
      setGroups(data);
      console.log(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth.user) {
      getGroups();
    }
  }, [auth, activeTab, refresh]);

  return (
    <Box>
      {loading ? (
        <GroupsSkeleton />
      ) : (
        <Box mt={20}>
          <Grid gutter={20}>
            {groups.map((group) => (
              <Grid.Col key={group.id} span={4}>
                <GroupView getGroups={getGroups} group={group} />
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
