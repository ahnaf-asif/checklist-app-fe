import { ReactNode, useEffect } from 'react';
import { AppShell, Box, Burger, Button, Flex, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@/Redux/hooks.ts';
import { openAuthModal } from '@/Redux/Slices/AuthModalSlice';
import { Sidebar } from './Sidebar.tsx';
import { NavLogout } from './NavLogout.tsx';

interface ICommonLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export const DefaultLayout = ({ children, showSidebar }: ICommonLayoutProps) => {
  const [opened, { toggle }] = useDisclosure();

  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!showSidebar) {
      if (opened) toggle();
    } else {
      if (!opened) toggle();
    }
  }, []);

  useEffect(() => {
    if (!showSidebar) {
      if (opened) toggle();
    }
  }, [showSidebar]);

  const toggleNavbar = () => {
    localStorage.setItem('defaultNavbarStatus', String(Number(!opened)));
    toggle();
  };

  const openSignInModal = () => {
    dispatch(openAuthModal());
  };

  return (
    <>
      <AppShell
        header={{ height: 80 }}
        navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="6rem">
            <Flex align="center" justify="space-between" h="100%" w="100vw">
              <Box>
                <Burger opened={opened} onClick={toggleNavbar} hiddenFrom="sm" size="sm" />
                <Box
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'var(--mantine-primary-color-filled)'
                  }}
                  component={Link}
                  to="/"
                >
                  CheckNest
                </Box>
              </Box>
              <Box visibleFrom="sm">
                {auth.user ? (
                  <NavLogout />
                ) : (
                  // </Button>
                  <Button onClick={openSignInModal} variant="outline">
                    Sign in
                  </Button>
                )}
              </Box>
            </Flex>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <Sidebar />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
};
