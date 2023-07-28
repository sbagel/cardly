export interface User {
  id: number;
  username: string;
  name: string;
  photo: string;
}

export interface UsersState {
  user: User;
  loading: boolean;
  error: string;
  fetchUsers: (id: number) => Promise<void>;
  addUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}