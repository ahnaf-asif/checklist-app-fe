import { Box, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useEffect } from 'react';

import { AuthenticationModal } from '@/Shared/Components';
import { useAppSelector, useAppDispatch } from '@/Redux/hooks.ts';
import { closeAuthModal, openAuthModal } from '@/Redux/Slices/AuthModalSlice';
import { Link } from 'react-router-dom';

export const CommonLayout = ({ children }: any) => {
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
      {children}
      <Modal
        closeOnClickOutside={false}
        opened={authenticationModalOpened}
        onClose={() => setAuthModal(false)}
        title="Authentication"
        centered
      >
        <AuthenticationModal />
      </Modal>
      <Button onClick={() => setAuthModal(true)}>Open modal</Button>
      <Link to={'/'}>Home</Link> <Link to={'/protected'}>About</Link>
    </Box>
  );
};
