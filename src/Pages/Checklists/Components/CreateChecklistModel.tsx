import { axios } from '@/Config';
import { useAppSelector } from '@/Redux/hooks';
import { Modal, TextInput, Textarea, Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { useForm } from '@mantine/form';

interface CreateChecklistModalProps {
  opened: boolean;
  onClose: () => void;
}

const CreateChecklistModal = ({ opened, onClose }: CreateChecklistModalProps) => {
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.user) {
      onClose();
    }
  }, [auth]);

  const createChecklistForm = useForm({
    initialValues: {
      name: '',
      description: '',
      categories: ''
    }
  });

  const handleSubmit = async (value: any) => {
    try {
      const data = {
        name: value.name,
        description: value.description,
        creator_id: auth.user!.id,
        categories: value.categories.split(',').map((category: string) => category.trim())
      };

      const response = await axios.post('/checklists', data);
      if (response.status === 200) {
        notifications.show({
          title: 'Success',
          message: 'Created checklist successfully',
          color: 'Green'
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : String(error),
        color: 'red'
      });
    } finally {
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create New Checklist" centered>
      <form onSubmit={createChecklistForm.onSubmit((value) => handleSubmit(value))}>
        <TextInput
          label="Name"
          placeholder="Checklist name"
          {...createChecklistForm.getInputProps('name')}
        />

        <Textarea
          label="Description"
          placeholder="Checklist description"
          {...createChecklistForm.getInputProps('description')}
          mt="md"
        />

        <TextInput
          label="Categories"
          placeholder="Checklist categories, separated by comma"
          {...createChecklistForm.getInputProps('categories')}
          mt="md"
        />

        <Group mt="md" style={{ justifyContent: 'flex-end' }}>
          <Button type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CreateChecklistModal;
