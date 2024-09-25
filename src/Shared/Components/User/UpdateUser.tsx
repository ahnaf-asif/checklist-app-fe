import { hasLength, isEmail, isNotEmpty, useForm } from '@mantine/form';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks.ts';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { axios } from '@/Config';
import { updateAuth } from '@/Redux/Slices/AuthSlice';
import { notifications } from '@mantine/notifications';

interface UpdateUserFormProps {
  name: string;
  email: string;
  password: string;
}

export const UpdateUser = ({ closeModal }: any) => {
  const auth = useAppSelector((state) => state.auth);

  const updateUserForm = useForm({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validate: {
      name: hasLength({ min: 2, max: 100 }, 'name must be 2-100 characters long'),
      email: isEmail('Enter a valid email'),
      password: isNotEmpty('password is required')
    }
  });

  const dispatch = useAppDispatch();

  const updateCurrentUser = async (values: UpdateUserFormProps) => {
    try {
      const { data } = await axios.put(`/users/${auth.user?.id}`, values);
      localStorage.setItem('jwtToken', data.token);

      dispatch(updateAuth());

      closeModal();

      notifications.show({
        title: 'Success',
        message: 'Successfully updated personal Info!!',
        color: 'green'
      });
    } catch (e) {
      const error = (e as any).response.data.error;
      if (error.includes('password')) {
        updateUserForm.setErrors({ password: error });
      }
    }
  };

  useEffect(() => {
    if (auth.user) {
      updateUserForm.setValues({
        name: auth.user.name,
        email: auth.user.email
      });
    }
  }, [auth]);

  return (
    <form
      onSubmit={updateUserForm.onSubmit((values) => {
        updateCurrentUser(values);
      })}
    >
      <TextInput
        description="You are not allowed to change your username."
        autoComplete="off"
        disabled
        withAsterisk
        required
        value={auth.user?.username}
        label="Username"
      ></TextInput>

      <TextInput
        autoComplete="off"
        withAsterisk
        mt={10}
        required
        {...updateUserForm.getInputProps('name')}
        label="Name"
      ></TextInput>

      <TextInput
        autoComplete="off"
        mt={10}
        withAsterisk
        required
        {...updateUserForm.getInputProps('email')}
        label="Email"
      ></TextInput>

      <PasswordInput
        autoComplete="off"
        mt={10}
        withAsterisk
        description="You must input your password to update your account."
        {...updateUserForm.getInputProps('password')}
        label="Password"
      ></PasswordInput>

      <Button type="submit" mt={20} fullWidth>
        Update
      </Button>
    </form>
  );
};
