import { Layout } from '@/Layouts';
import { Title, TextInput, Tabs, Space, Button, Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useDebounceCallback } from '@mantine/hooks';
import { axios } from '@/Config';
import { notifications } from '@mantine/notifications';
import { useAppSelector } from '@/Redux/hooks';
import { ChecklistGrid } from './Components/ChecklistCard';
import CreateChecklistModal from './Components/CreateChecklistModel';

export const Checklists = () => {
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [checklists, setChecklists] = useState<Record<string, any>[]>([]);
    const [modalOpened, setModalOpened] = useState(false);

    const openModal = () => setModalOpened(true);
    const closeModal = () => setModalOpened(false);
    const auth = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (modalOpened) return;
        handleSearch();
    }, [auth, modalOpened])

    const handleSearch = useDebounceCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('/checklists', {
                params: { searchQuery: query }
            });
            setChecklists(response.data);
        } catch (error) {
            notifications.show({
                title: "Error",
                message: error instanceof Error ? error.message : String(error),
                color: 'red'
            });
        } finally {
            setLoading(false);
        }

    }, 200);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.currentTarget.value);
        handleSearch();
    }

    const getChecklistItems = (filter: string) => {
        const condition = (enrolled: boolean) => {
            if (filter === "all") return true;
            if (filter === 'enrolled') return enrolled;
            return !enrolled;
        }
        return ChecklistGrid(condition, checklists, loading);
    }
    return (
        <Layout showSidebar >
            <Flex justify="space-between" align="center">
                <Title>Checklists</Title>
                <Button leftSection={<IconPlus />} onClick={openModal}>
                    Create New Checklist
                </Button>
            </Flex>
            <TextInput
                onChange={handleChange}
                placeholder="Search checklists"
                leftSection={<IconSearch size={18} />}
                style={{ marginTop: 20, marginBottom: 20 }}
            />
            <Tabs defaultValue="enrolled">
                <Tabs.List>
                    <Tabs.Tab value="enrolled">
                        Enrolled
                    </Tabs.Tab>
                    <Tabs.Tab value="unenrolled">
                        Unenrolled
                    </Tabs.Tab>
                    <Tabs.Tab value="all">
                        All
                    </Tabs.Tab>
                </Tabs.List>

                <Space h="md" />

                <Tabs.Panel value="enrolled">
                    {getChecklistItems("enrolled")}
                </Tabs.Panel>

                <Tabs.Panel value="unenrolled">
                    {getChecklistItems("unenrolled")}
                </Tabs.Panel>

                <Tabs.Panel value="all">
                    {getChecklistItems("all")}
                </Tabs.Panel>

            </Tabs>
            <CreateChecklistModal opened={modalOpened} onClose={closeModal} />
        </Layout>
    );
};
