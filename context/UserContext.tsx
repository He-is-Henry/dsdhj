"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "../lib/axios";
import { AxiosError } from "axios";

interface AuthContextType {
  user: User | null;
  checked: boolean;
  login: (userData: User) => void;
  setChecked: (checked: boolean) => void;
  error: string | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    setChecked(true);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get("users/me");
        setUser(response.data);
      } catch (e) {
        const err = e as AxiosError<{ error: string }>;
        setError(
          !err.response
            ? "No server response"
            : err.response.data?.error || err.message,
        );
        setUser(null);
      } finally {
        setChecked(true);
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, checked, login, setChecked, error, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};