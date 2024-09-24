import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '@/Config';
import { extractUserFromToken } from '../Helper';

const REGISTER_URL = '/users/signup';

export interface IRegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  'auth/login',
  async (formData: IRegisterData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(REGISTER_URL, formData);

      const jwtToken = data.token as string;
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      localStorage.setItem('jwtToken', jwtToken);

      return extractUserFromToken(jwtToken);
    } catch (e) {
      // @ts-ignore
      const error = e.response.data.error;
      return rejectWithValue(error);
    }
  }
);
