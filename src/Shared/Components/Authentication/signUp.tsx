import { hasLength, isEmail, isNotEmpty, useForm, UseFormReturnType } from '@mantine/form';
import { Box, Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';

import { IRegisterData } from '@/Redux/Slices/AuthSlice';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks.ts';
import { registerUser } from '@/Redux/Slices/AuthSlice';
import { closeAuthModal } from '@/Redux/Slices/AuthModalSlice';
import { AuthModalProps } from './AuthModal.tsx';
import { useNavigate } from 'react-router-dom';

type SignUpFormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUp = ({ redirectTo }: AuthModalProps) => {
  const navigate = useNavigate();
  const signUpForm: UseFormReturnType<SignUpFormValues> = useForm({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },

    validate: {
      name: hasLength({ min: 2, max: 100 }, 'name must be 2-100 characters long'),
      username: hasLength({ min: 2, max: 50 }, 'username must be 2-50 characters long'),
      email: isEmail('Enter a valid email'),
      password: isNotEmpty('password is required'),
      confirmPassword: (value: string, values: SignUpFormValues) =>
        value === values.password ? null : 'passwords do not match'
    }
  });

  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [defaultError, setDefaultError] = useState<string | null>(null);

  const signUpUser = (values: SignUpFormValues) => {
    const { confirmPassword, ...formValues } = values;
    dispatch(registerUser(formValues as IRegisterData));
    if (redirectTo) {
      return navigate(redirectTo);
    }
  };

  useEffect(() => {
    if (auth.dispatched && auth.user) {
      dispatch(closeAuthModal());
    }
    if (auth.dispatched && auth.error) {
      if (auth.error.includes('username')) {
        signUpForm.setFieldError('username', 'username already exists');
      } else if (auth.error.includes('email')) {
        signUpForm.setFieldError('email', 'email already exists');
      } else {
        setDefaultError(auth.error);
      }
    }
  }, [auth]);

  return (
    <Box mt={20} mr={40} ml={40}>
      <Flex justify="center">
        <Box style={{ width: '320px' }}>
          <form
            onSubmit={signUpForm.onSubmit((values) => {
              signUpUser(values);
            })}
          >
            <TextInput
              autoComplete="off"
              withAsterisk
              required
              {...signUpForm.getInputProps('name')}
              label="Name"
            ></TextInput>

            <TextInput
              autoComplete="off"
              withAsterisk
              required
              {...signUpForm.getInputProps('username')}
              label="Username"
            ></TextInput>

            <TextInput
              autoComplete="off"
              withAsterisk
              required
              {...signUpForm.getInputProps('email')}
              label="Email"
            ></TextInput>

            <PasswordInput
              autoComplete="off"
              mt={10}
              withAsterisk
              required
              {...signUpForm.getInputProps('password')}
              label="Password"
            ></PasswordInput>

            <PasswordInput
              autoComplete="off"
              mt={10}
              withAsterisk
              required
              {...signUpForm.getInputProps('confirmPassword')}
              label="Confirm Password"
            ></PasswordInput>

            {defaultError && (
              <Text mt={10} c="red" size="xs">
                {defaultError}
              </Text>
            )}

            <Button type="submit" mt={10} fullWidth>
              Sign Up
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};
