import { useAppDispatch, useAppSelector } from '@/Redux/hooks.ts';
import { Menu, Button, rem } from '@mantine/core';
import {
  IconChevronRight,
  IconChevronDown,
  IconUser,
  IconMail,
  IconLogout
} from '@tabler/icons-react';
import { clearAuth } from '@/Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export const NavLogout = () => {
  const [opened, setOpened] = useState(false);
  const auth = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(clearAuth());
    notifications.show({
      title: 'Success!!!',
      message: 'Successfully signed out',
      color: 'green'
    });
    return navigate('/');
  };

  return (
    <Menu opened={opened} onChange={setOpened} shadow="md" width={300}>
      <Menu.Target>
        <Button
          variant="outline"
          rightSection={opened ? <IconChevronDown /> : <IconChevronRight />}
        >
          {auth.user?.username}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Personal Details</Menu.Label>
        <Menu.Item leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}>
          {auth.user?.name}
        </Menu.Item>
        <Menu.Item leftSection={<IconMail style={{ width: rem(14), height: rem(14) }} />}>
          {auth.user?.email}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          onClick={signOut}
        >
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
