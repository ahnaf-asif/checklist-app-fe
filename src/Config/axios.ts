import axios from 'axios';
import { store } from '@/Redux/store';
import { API_URL } from '@/Config';
import { openAuthModal } from '@/Redux/Slices/AuthModalSlice';

const axiosExtended = axios.create({
  baseURL: API_URL,
  headers: {}
});

axiosExtended.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(openAuthModal());
    }
    return Promise.reject(error);
  }
);

export default axiosExtended;
