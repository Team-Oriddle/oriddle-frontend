import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";


interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user?: User;
}

export const userAtom = atomWithStorage<AuthState>("authState", {
  isLoggedIn: false,
  user: undefined,  
})


// <AuthState>({
//   isLoggedIn: false,
//   user: undefined,
// });
