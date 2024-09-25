import { Box } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

interface ISidebarItem {
  itemText: string;
  itemLink: string;
  isCurrent?: boolean;
}

const sidebarItems = [
  {
    itemText: 'Dashboard',
    itemLink: '/dashboard'
  },
  {
    itemText: 'Community',
    itemLink: '/community'
  },
  {
    itemText: 'Groups',
    itemLink: '/groups'
  },
  {
    itemText: 'Checklists',
    itemLink: '/checklists'
  }
];

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <Box mx={20}>
      {sidebarItems.map((item, index) => (
        <SidebarItem
          key={index}
          itemText={item.itemText}
          itemLink={item.itemLink}
          isCurrent={pathname === item.itemLink}
        />
      ))}
    </Box>
  );
};

const SidebarItem = ({ itemText, itemLink, isCurrent }: ISidebarItem) => {
  return (
    <Link
      style={{
        display: 'block',
        padding: '10px',
        margin: '10px 0',
        textDecoration: 'none',
        color: isCurrent ? 'var(--mantine-primary-color-filled)' : 'black',
        fontSize: '1.2rem',
        fontWeight: 500
      }}
      to={itemLink}
    >
      {itemText}
    </Link>
  );
};
