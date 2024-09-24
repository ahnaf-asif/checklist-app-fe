import { useEffect } from 'react';
import { Box, Modal, Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUser, IconUserPlus } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '@/Redux/hooks.ts';
import { closeAuthModal, openAuthModal } from '@/Redux/Slices/AuthModalSlice';

import { SignIn } from './signIn.tsx';
import { SignUp } from './signUp.tsx';

export const AuthModal = () => {
  const [authenticationModalOpened, { open: displayAuthModal, close: unDisplayAuthModal }] =
    useDisclosure(false);
  const dispatch = useAppDispatch();
  const authModalOpened = useAppSelector((state) => state.authModal.isOpen);

  useEffect(() => {
    if (authModalOpened) {
      displayAuthModal();
    } else {
      unDisplayAuthModal();
    }
  }, [authModalOpened]);

  const setAuthModal = (shouldOpen: boolean) => {
    if (shouldOpen) dispatch(openAuthModal());
    else dispatch(closeAuthModal());
  };

  return (
    <Box>
      <Modal
        closeOnClickOutside={false}
        opened={authenticationModalOpened}
        onClose={() => setAuthModal(false)}
        centered
        size="lg"
      >
        {/*<Authentication />*/}
        <Tabs defaultValue="gallery">
          <Tabs.List grow>
            <Tabs.Tab value="gallery" leftSection={<IconUser />}>
              Sign In
            </Tabs.Tab>
            <Tabs.Tab value="messages" leftSection={<IconUserPlus />}>
              Sign Up
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="gallery">
            <SignIn />
          </Tabs.Panel>
          <Tabs.Panel value="messages">
            <SignUp></SignUp>
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </Box>
  );
};
