import { Layout } from '@/Layouts';
import { Tabs, Title } from '@mantine/core';
import { Friends } from '@/Pages/Community/Friends.tsx';
import { AllUsers } from '@/Pages/Community/AllUsers.tsx';
import { useEffect, useState } from 'react';

export const Community = () => {
  const [activeTab, setActiveTab] = useState<string | null>('friends');

  useEffect(() => {}, [activeTab]);

  return (
    <Layout showSidebar>
      <Title>Community</Title>
      <Tabs value={activeTab} onChange={setActiveTab} mt={20} defaultValue="friends">
        <Tabs.List>
          <Tabs.Tab value="friends">Friends</Tabs.Tab>
          <Tabs.Tab value="all">All Users</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="friends">
          <Friends activeTab={activeTab} />
        </Tabs.Panel>
        <Tabs.Panel value="all">
          <AllUsers activeTab={activeTab} />
        </Tabs.Panel>
      </Tabs>
    </Layout>
  );
};
