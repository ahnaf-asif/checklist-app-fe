import { useRoutes } from 'react-router-dom';
import { ReactElement } from 'react';
import { Dashboard, Home, Groups, Community, Checklists, Login } from '@/Pages';
import { GroupPage } from '@/Pages/Groups/Group';
import { Checklist } from '@/Pages/Checklists';

export interface RouteType {
  path: string;
  element: ReactElement;
}

const routeList: RouteType[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/groups',
    element: <Groups />
  },
  {
    path: '/groups/:id',
    element: <GroupPage />
  },
  {
    path: '/community',
    element: <Community />
  },
  {
    path: '/checklists',
    element: <Checklists />
  },
  {
    path: '/checklists/:id',
    element: <Checklist />
  },
  {
    path: '/login',
    element: <Login />
  }
];

export const AppRoutes = () => {
  return useRoutes(routeList);
};
