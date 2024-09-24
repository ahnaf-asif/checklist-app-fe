import { jwtDecode } from 'jwt-decode';
import { IUser } from '../AuthSliceTypes.ts';

export const extractUserFromToken = (token: string): IUser => {
  const user = jwtDecode(token) as IUser;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    iat: user.iat,
    exp: user.exp
  };
};
