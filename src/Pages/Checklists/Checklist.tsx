import { axios } from "@/Config";
import { Layout } from "@/Layouts"
import { useAppSelector } from "@/Redux/hooks";
import { Skeleton, Tabs, Text, Space } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChecklistHome from "./Components/ChecklistHome";
import ChecklistEdit from "./Components/ChecklistEdit";
import ChecklistCompare from "./Components/ChecklistCompare";
import ChecklistAdmin from "./Components/ChecklistAdmin";

export const Checklist = () => {
    const auth = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState<boolean>(false);
    const [checklist, setChecklist] = useState<Record<string, any>>();
    const params = useParams();

    const getData = async () => {
        try {
            const response = await axios.get(`/checklists/${params.id}`, {
                params: { full: 1 }
            });
            if (response.status === 200) {
                setChecklist(response.data);
            } else {
                console.log(response.status, response.statusText);
                throw Error(response.statusText);
            }
        } catch (error) {
            notifications.show({
                title: "Error",
                message: error instanceof Error ? error.message : String(error),
                color: 'red'
            });
        }
    };

    useEffect(() => {
        setLoading(true);
        if (auth.user) getData();
        setLoading(false);
    }, [auth])
    return (<Layout showSidebar>
        {loading ? (
            <Skeleton height={200} />
        ) :
            checklist ?
                <Tabs defaultValue="home">
                    <Tabs.List>
                        <Tabs.Tab value="home">Home</Tabs.Tab>
                        {checklist!.enrolled && <Tabs.Tab value="edit">Edit</Tabs.Tab>}
                        {checklist!.enrolled && <Tabs.Tab value="compare">Compare</Tabs.Tab>}
                        {auth.user!.id === checklist!.creator_id && <Tabs.Tab value="admin">Admin</Tabs.Tab>}
                    </Tabs.List>
                    <Space h="md" />
                    {(
                        <>
                            <Tabs.Panel value="home">
                                <ChecklistHome checklist={checklist!} />
                            </Tabs.Panel>

                            {checklist!.enrolled && (
                                <Tabs.Panel value="edit">
                                    <ChecklistEdit checklist={checklist!} />
                                </Tabs.Panel>
                            )}
                            {checklist!.enrolled && (
                                <Tabs.Panel value="compare">
                                    <ChecklistCompare checklist={checklist!} />
                                </Tabs.Panel>
                            )}
                            {
                                auth.user!.id === checklist?.creator_id && (
                                    <Tabs.Panel value="admin">
                                        <ChecklistAdmin checklist={checklist!} />
                                    </Tabs.Panel>
                                )
                            }
                        </>
                    )}
                </Tabs>
                : <Text>Error loading checklist</Text>}
    </Layout>);
}
