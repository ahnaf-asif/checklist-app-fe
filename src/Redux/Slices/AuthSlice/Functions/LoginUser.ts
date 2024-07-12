import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '@/Config';
import { extractUserFromToken } from '../Helper';

const LOGIN_URL = '/auth/login';

export interface ILoginData {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData: ILoginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(LOGIN_URL, formData);

      const jwtToken = data.token as string;
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      localStorage.setItem('jwtToken', jwtToken);

      return extractUserFromToken(jwtToken);
    } catch (e) {
      const message = 'The email or password is incorrect';
      return rejectWithValue(message);
    }
  }
);
