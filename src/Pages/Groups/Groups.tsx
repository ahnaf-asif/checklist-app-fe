import { Layout } from '@/Layouts';
import { Button, Flex, Modal, Tabs, Title } from '@mantine/core';
import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { GroupsListView } from './GroupsListView.tsx';
import { useAppSelector } from '@/Redux/hooks.ts';
import { useDisclosure } from '@mantine/hooks';

import { CreateGroup } from './CreateGroup.tsx';

export const Groups = () => {
  const [activeTab, setActiveTab] = useState<string | null>('My Groups');
  const [refreshApi, setRefreshApi] = useState<Boolean>(false);
  const auth = useAppSelector((state) => state.auth);

  const refresh = () => {
    setRefreshApi(!refreshApi);
  };

  const [addGroupModal, addGroupModalMethods] = useDisclosure();

  return (
    <Layout showSidebar>
      <Flex justify="space-between" align="center">
        <Title>Groups</Title>
        <Button onClick={addGroupModalMethods.open} leftSection={<IconPlus />}>
          Add New Group
        </Button>
      </Flex>
      <Tabs value={activeTab} onChange={setActiveTab} mt={20} defaultValue="My Groups">
        <Tabs.List>
          <Tabs.Tab value="My Groups">My Groups</Tabs.Tab>
          <Tabs.Tab value="Enrolled Groups">Enrolled Groups</Tabs.Tab>
          <Tabs.Tab value="All Groups">All Groups</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="My Groups">
          <GroupsListView
            refresh={refreshApi}
            activeTab={activeTab}
            api={`/groups/created/${auth.user?.id}`}
          />
        </Tabs.Panel>
        <Tabs.Panel value="Enrolled Groups">
          <GroupsListView
            refresh={refreshApi}
            activeTab={activeTab}
            api={`/groups/enrolled/${auth.user?.id}`}
          />
        </Tabs.Panel>
        <Tabs.Panel value="All Groups">
          <GroupsListView refresh={refreshApi} activeTab={activeTab} api={`/groups`} />
        </Tabs.Panel>

        <Modal size="md" centered opened={addGroupModal} onClose={addGroupModalMethods.close}>
          <Modal.Title>Add New Group</Modal.Title>
          <CreateGroup closeModal={addGroupModalMethods.close} refresh={refresh} />
        </Modal>
      </Tabs>
    </Layout>
  );
};
