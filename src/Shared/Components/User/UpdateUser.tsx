import { hasLength, isEmail, isNotEmpty, useForm } from '@mantine/form';
import { useAppSelector } from '@/Redux/hooks.ts';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useEffect } from 'react';

export const UpdateUser = () => {
  const auth = useAppSelector((state) => state.auth);

  const updateUserForm = useForm({
    initialValues: {
      name: '',
      email: '',
      username: '',
      password: ''
    },
    validate: {
      name: hasLength({ min: 2, max: 100 }, 'name must be 2-100 characters long'),
      email: isEmail('Enter a valid email'),
      password: isNotEmpty('password is required')
    }
  });

  useEffect(() => {
    if (auth.user) {
      updateUserForm.setValues({
        name: auth.user.name,
        email: auth.user.email,
        username: auth.user.username
      });
    }
  }, [auth]);

  return (
    <form
      onSubmit={updateUserForm.onSubmit((values) => {
        console.log(values);
      })}
    >
      <TextInput
        description="You are not allowed to change your username."
        autoComplete="off"
        disabled
        withAsterisk
        required
        {...updateUserForm.getInputProps('username')}
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
