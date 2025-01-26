// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { User } from "../types/types";
import { mockUsers } from "../data/mockUsers";
import { Navigate, useNavigate } from "react-router-dom";

interface AuthContextProps {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isTeacherOrResearcher: boolean;
  signUp: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook pentru a folosi AuthContext
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Stocăm lista tuturor utilizatorilor mock
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);

  // Stocăm utilizatorul curent (sau null dacă nu e logat)
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Funcția de login (exista deja)
  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = allUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  // Funcția de logout
  const logout = () => {
    setCurrentUser(null);
  };

  // Funcția de signUp (nouă)
  const signUp = async (
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<boolean> => {
    // verificăm dacă email-ul există deja
    const emailExists = allUsers.some((u) => u.email === email);
    if (emailExists) {
      return false;
    }

    // creăm un user nou
    const newUser: User = {
      id: Date.now(), // ID mock
      name,
      email,
      password,
      role: role as "student" | "teacher" | "researcher" | "admin",
    };

    // îl adăugăm în listă
    setAllUsers((prev) => [...prev, newUser]);
    // logăm userul imediat după signUp
    setCurrentUser(newUser);
    return true;
  };

  // isAuthenticated
  const isAuthenticated = !!currentUser;

  // isTeacherOrResearcher
  const isTeacherOrResearcher =
    currentUser?.role === "teacher" || currentUser?.role === "researcher";

  const value: AuthContextProps = {
    currentUser,
    login,
    logout,
    isAuthenticated,
    isTeacherOrResearcher,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
