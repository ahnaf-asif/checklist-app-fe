import { Box, Button, Textarea, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { axios } from '@/Config';
import { notifications } from '@mantine/notifications';

export const CreateGroup = ({ closeModal, refresh }: any) => {
  const createGroupForm = useForm({
    initialValues: {
      name: '',
      description: ''
    },
    validate: {
      name: isNotEmpty('Name cannot be empty'),
      description: isNotEmpty('Description cannot be empty')
    }
  });

  const submitCreateGroup = async (values: any) => {
    try {
      await axios.post('/groups', values);
      refresh();
      notifications.show({
        title: 'Success',
        message: 'Group created successfully',
        color: 'green'
      });

      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <form
        onSubmit={createGroupForm.onSubmit((values) => {
          submitCreateGroup(values);
        })}
      >
        <TextInput
          label="Group Name"
          placeholder="Enter Group Name"
          mt={20}
          {...createGroupForm.getInputProps('name')}
        />
        <Textarea
          label="Description"
          mt={20}
          rows={4}
          placeholder="Enter Group Description"
          {...createGroupForm.getInputProps('description')}
        />

        <Button mt={20} type="submit" fullWidth>
          Create Group
        </Button>
      </form>
    </Box>
  );
};
