export interface IUser {
  id: number;
  username: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export interface IAuthState {
  loading: boolean;
  dispatched: boolean;
  error: any;
  user: IUser | null;
}
