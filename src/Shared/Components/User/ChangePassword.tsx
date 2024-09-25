import { hasLength, isNotEmpty, useForm } from '@mantine/form';
import { useAppSelector } from '@/Redux/hooks.ts';
import { Button, PasswordInput } from '@mantine/core';
import { axios } from '@/Config';
import { notifications } from '@mantine/notifications';

interface ChangePasswordFormProps {
  password: string;
  newPassword: string;
}

export const ChangePassword = ({ closeModal }: any) => {
  const auth = useAppSelector((state) => state.auth);

  const updateUserForm = useForm({
    initialValues: {
      password: '',
      newPassword: ''
    },
    validate: {
      password: isNotEmpty('password is required'),
      newPassword: hasLength({ min: 6, max: 100 }, 'password must be 6-100 characters long')
    }
  });

  const updateCurrentPassword = async (values: ChangePasswordFormProps) => {
    try {
      await axios.put(`/users/${auth.user?.id}/password`, values);
      closeModal();

      notifications.show({
        title: 'Success',
        message: 'Successfully updated password!!',
        color: 'green'
      });
    } catch (e) {
      const error = (e as any).response.data.error;
      if (error.includes('password')) {
        updateUserForm.setErrors({ password: error });
      }
    }
  };

  return (
    <form
      onSubmit={updateUserForm.onSubmit((values) => {
        updateCurrentPassword(values);
      })}
    >
      <PasswordInput
        autoComplete="off"
        mt={10}
        withAsterisk
        description="Input your current password."
        {...updateUserForm.getInputProps('password')}
        label="Current Password"
      ></PasswordInput>

      <PasswordInput
        autoComplete="off"
        mt={10}
        withAsterisk
        {...updateUserForm.getInputProps('newPassword')}
        label="New Password"
      ></PasswordInput>

      <Button type="submit" mt={20} fullWidth>
        Update Password
      </Button>
    </form>
  );
};
