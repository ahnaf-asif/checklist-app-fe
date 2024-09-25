import { Box, Button, Flex, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks.ts';
import { axios } from '@/Config';
import { clearAuth } from '@/Redux/Slices/AuthSlice';
import { notifications } from '@mantine/notifications';

export const DeleteAccount = ({ closeModal }: any) => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const deleteAccount = async () => {
    try {
      const resp = await axios.delete(`/users/${auth.user?.id}`);
      localStorage.removeItem('jwtToken');
      dispatch(clearAuth());

      closeModal();

      notifications.show({
        title: 'Success',
        message: resp.data.message,
        color: 'green'
      });
    } catch (e) {}
  };

  return (
    <Box>
      <Text>Are you sure you want to delete your account?</Text>
      <Flex justify="center" gap={10} mt={20}>
        <Button onClick={deleteAccount} color="red">
          Yes
        </Button>
        <Button onClick={closeModal} color="green">
          No
        </Button>
      </Flex>
    </Box>
  );
};
