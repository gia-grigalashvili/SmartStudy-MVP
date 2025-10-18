import { LoginResponse, UserType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const USER_KEY = "user";
const USER_TYPE_KEY = "userType";

const getInitialUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};
const getInitialUserType = (): UserType | undefined => {
  try {
    const val = localStorage.getItem(USER_TYPE_KEY);
    if (val === "student" || val === "teacher" || val === "administration")
      return val as UserType;
    return undefined;
  } catch {
    return undefined;
  }
};

interface AuthStore {
  isLoggedIn: boolean;
  currentUser: LoginResponse["user"] | null;
  login: (data: { data: LoginResponse }) => void;
  logout: () => void;
  userType?: UserType;
  updatedAt?: string;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => {
      return {
        isLoggedIn: !!getInitialUser(),
        currentUser: getInitialUser(),
        userType: getInitialUserType(),
        updatedAt: new Date().toISOString(),
        login: ({ data }) => {
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
          localStorage.setItem(USER_TYPE_KEY, data.userType);
          set(() => ({
            isLoggedIn: true,
            currentUser: data.user,
            updatedAt: new Date().toISOString(),
            userType: data.userType as UserType
          }));
        },
        logout: () => {
          localStorage.removeItem(USER_KEY);
          localStorage.removeItem(USER_TYPE_KEY);
          set(() => ({
            isLoggedIn: false,
            currentUser: null,
            userType: undefined
          }));
        }
      };
    },
    {
      name: "smart-study-auth-store"
    }
  )
);
