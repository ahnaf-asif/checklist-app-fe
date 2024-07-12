import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '@/Config';
import { extractUserFromToken } from '../Helper';

const REGISTER_URL = '/auth/register';

export interface IRegisterData {
  name: string;
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
      const message = 'The email or password is incorrect';
      return rejectWithValue(message);
    }
  }
);
