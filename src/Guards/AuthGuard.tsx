import { LoadingOverlay } from '@mantine/core';
import { ReactNode, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@/Redux/hooks.ts';
import { updateAuth } from '@/Redux/Slices/AuthSlice/AuthSlice.ts';
import { checkJwtExpiration } from './Helper.ts';
import { openAuthModal } from '@/Redux/Slices/AuthModalSlice';

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);
  const authModalOpened = useAppSelector((state) => state.authModal.isOpen);

  const reAuthenticate = () => {
    dispatch(openAuthModal());
  };
  const authorizeExistingUser = () => {
    dispatch(updateAuth());
  };

  useEffect(() => {
    if (!auth.dispatched) {
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken == null || !checkJwtExpiration(jwtToken)) {
        reAuthenticate();
      } else if (!auth.user) {
        authorizeExistingUser();
      }
    } else if (!auth.user) {
      reAuthenticate();
    }
  }, [auth, dispatch, authModalOpened]);

  if (auth.loading) {
    return <LoadingOverlay visible />;
  }

  if (auth.dispatched && auth.user) {
    return <>{children}</>;
  }
};
