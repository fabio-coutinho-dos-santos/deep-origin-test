export interface LoginInterface {
  accessToken: string;
  expiresIn: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
