import { hasLength, isNotEmpty, useForm, UseFormReturnType } from '@mantine/form';
import { Box, Button, Flex, PasswordInput, TextInput, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';

import { useAppDispatch, useAppSelector } from '@/Redux/hooks.ts';
import { loginUser, ILoginData } from '@/Redux/Slices/AuthSlice';
import { closeAuthModal } from '@/Redux/Slices/AuthModalSlice';
import { AuthModalProps } from './AuthModal.tsx';
import { useNavigate } from 'react-router-dom';

export const SignIn = ({ redirectTo }: AuthModalProps) => {
  const navigate = useNavigate();
  const signInForm: UseFormReturnType<ILoginData> = useForm({
    initialValues: {
      username: '',
      password: ''
    },
    validate: {
      username: hasLength({ min: 2, max: 50 }, 'username must be 2-50 characters long'),
      password: isNotEmpty('password is required')
    }
  });

  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [defaultError, setDefaultError] = useState<string | null>(null);

  const signInUser = (values: ILoginData) => {
    setDefaultError(null);
    try {
      dispatch(loginUser(values));
      if (redirectTo) {
        return navigate(redirectTo);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth.dispatched && auth.user) {
      notifications.show({
        title: `Welcome ${auth.user.name}!`,
        message: 'Successfully signed in',
        color: 'green'
      });

      dispatch(closeAuthModal());
    }
    if (auth.dispatched && auth.error) {
      setDefaultError(auth.error);
    }
  }, [auth]);

  return (
    <Box mt={20} mr={40} ml={40}>
      <Flex justify="center">
        <Box style={{ width: '320px' }}>
          <form
            onSubmit={signInForm.onSubmit((values) => {
              signInUser(values);
            })}
          >
            <input hidden name="email"></input>
            <TextInput
              autoComplete="new-username"
              withAsterisk
              required
              {...signInForm.getInputProps('username')}
              label="Username"
            ></TextInput>

            <PasswordInput
              autoComplete="new-password"
              mt={20}
              withAsterisk
              required
              {...signInForm.getInputProps('password')}
              label="Password"
            ></PasswordInput>

            <Button type="submit" mt={20} fullWidth>
              Sign In
            </Button>
            {defaultError && (
              <Text mt={10} c="red" size="xs">
                {defaultError}
              </Text>
            )}
            <Text mt={10} size="xs">
              If you don't have an account, please sign up first!
            </Text>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};
