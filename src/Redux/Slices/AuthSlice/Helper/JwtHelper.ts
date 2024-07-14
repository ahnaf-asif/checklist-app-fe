import { jwtDecode } from 'jwt-decode';
import { IUser } from '../AuthSliceTypes.ts';

export const extractUserFromToken = (token: string): IUser => {
  const resp = jwtDecode(token) as { user: IUser };
  return {
    user_id: resp.user.user_id,
    name: resp.user.name,
    email: resp.user.email,
    iat: resp.user.iat,
    exp: resp.user.exp
  };
};
