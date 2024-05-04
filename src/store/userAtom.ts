import { atom } from "jotai";

interface User {
  id: string;
  name: string;
  provider: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user?: User;
}

export const userAtom = atom<AuthState>({
  isLoggedIn: false,
  user: undefined,
});
