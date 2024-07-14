import { ReactNode, useEffect } from 'react';
import { AppShell, Box, Burger, Group, Skeleton } from '@mantine/core';
import { IconCircleChevronLeft, IconCircleChevronRight } from '@tabler/icons-react';

import { useDisclosure } from '@mantine/hooks';

interface ICommonLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export const DefaultLayout = ({ children, showSidebar }: ICommonLayoutProps) => {
  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    if (!showSidebar) {
      if (opened) toggle();
    } else if (localStorage.getItem('defaultNavbarStatus') !== null) {
      const cur: boolean = Boolean(Number(localStorage.getItem('defaultNavbarStatus')));

      console.log('cur = ', cur);
      if (opened !== cur) toggle();
    } else {
      localStorage.setItem('defaultNavbarStatus', String(Number(opened)));
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

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggleNavbar} hiddenFrom="sm" size="sm" />
            Logo
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          Navbar
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={true} />
            ))}
        </AppShell.Navbar>
        <AppShell.Main>
          {showSidebar && (
            <Box visibleFrom="sm">
              {opened ? (
                <IconCircleChevronLeft
                  style={{ cursor: 'pointer' }}
                  size="30"
                  onClick={toggleNavbar}
                />
              ) : (
                <IconCircleChevronRight
                  style={{ cursor: 'pointer' }}
                  size="30"
                  onClick={toggleNavbar}
                />
              )}
            </Box>
          )}
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
};
