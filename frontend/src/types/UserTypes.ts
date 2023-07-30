export interface User {
  id: number;
  username: string;
  name: string;
  photo: string;
}

export interface UsersState {
  user: User | null;
  loading: boolean;
  error: string;
  fetchUser: (username: string) => Promise<void>;
  addUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  login: (user: User | null) => Promise<void>;
  logout: () => void;
  checkStorage: () => void;
}