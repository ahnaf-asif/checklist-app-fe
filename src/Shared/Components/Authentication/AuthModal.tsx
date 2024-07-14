import { useEffect } from 'react';
import { Box, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useAppDispatch, useAppSelector } from '@/Redux/hooks.ts';
import { closeAuthModal, openAuthModal } from '@/Redux/Slices/AuthModalSlice';
import { Authentication } from './Authentication.tsx';

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
        title="Authentication"
        centered
      >
        <Authentication />
      </Modal>
    </Box>
  );
};
