import { useRoutes } from 'react-router-dom';
import { ReactElement } from 'react';
import { Home } from '@/Pages';

export interface RouteType {
  path: string;
  element: ReactElement;
}

const routeList: RouteType[] = [
  {
    path: '/',
    element: <Home />
  }
];

export const AppRoutes = () => {
  return useRoutes(routeList);
};
