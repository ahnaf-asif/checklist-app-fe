import { useEffect } from 'react';
import { openAuthModal } from '@/Redux/Slices/AuthModalSlice';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks.ts';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (auth.dispatched && auth.user) {
      return navigate('/');
    } else dispatch(openAuthModal());
  }, []);

  return <></>;
};
