import { useRoutes } from 'react-router-dom';
import { ReactElement } from 'react';
import { Dashboard, Home, Groups, Friends, Checklists, Login } from '@/Pages';

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
    path: '/friends',
    element: <Friends />
  },
  {
    path: '/checklists',
    element: <Checklists />
  },
  {
    path: '/login',
    element: <Login />
  }
];

export const AppRoutes = () => {
  return useRoutes(routeList);
};
