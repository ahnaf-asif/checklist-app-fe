export interface IUser {
  user_id: number;
  name: string;
  email: string;
}

export interface IAuthState {
  loading: boolean;
  dispatched: boolean;
  error: any;
  user: IUser | null;
}
