import { AppRoutes } from '@/Routes';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks.ts';
import { updateAuth } from '@/Redux/Slices/AuthSlice';
import { Box } from '@mantine/core';

function App() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth.dispatched) {
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken && !auth.user) {
        dispatch(updateAuth());
      }
    }
  }, [auth]);

  return (
    <Box>
      <AppRoutes />
    </Box>
  );
}

export default App;
