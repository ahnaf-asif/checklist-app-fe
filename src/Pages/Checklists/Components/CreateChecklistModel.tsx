import { axios } from '@/Config';
import { useAppSelector } from '@/Redux/hooks';
import { Modal, TextInput, Textarea, Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

interface CreateChecklistModalProps {
    opened: boolean;
    onClose: () => void;
}

const CreateChecklistModal = ({ opened, onClose }: CreateChecklistModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const auth = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!auth.user) {
            onClose();
        }
    }, [auth])

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/checklists', {
                name: name,
                description: description,
                creator_id: auth.user!.id
            });
            if (response.status === 200) {
                notifications.show({
                    title: "Success",
                    message: "Created checklist successfully",
                    color: 'Green'
                });

            }
        } catch (error) {
            notifications.show({
                title: "Error",
                message: error instanceof Error ? error.message : String(error),
                color: 'red'
            });

        } finally {
            onClose();
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Create New Checklist"
            centered
        >
            <TextInput
                label="Name"
                placeholder="Checklist name"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                required
            />

            <Textarea
                label="Description"
                placeholder="Checklist description"
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
                required
                mt="md"
            />

            <Group mt="md" style={{ justifyContent: 'flex-end' }}>
                <Button onClick={handleSubmit}>Create</Button>
            </Group>
        </Modal>
    );
};

export default CreateChecklistModal;
