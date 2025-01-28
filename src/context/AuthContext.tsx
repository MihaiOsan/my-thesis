import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/types";

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
  getUsersWithoutPasswords: () => Omit<User, "password">[];
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

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
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Încarcă utilizatorii de la json-server la montare
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => {
        console.log("Received users before transformation:", data);
        const transformedData = data.map((item: User) => {
          const transformedItem: Partial<User> = {
            ...item,
            id: Number(item.id),
          };
          Object.keys(transformedItem).forEach((key) => {
            if (transformedItem[key as keyof User] === null) {
              transformedItem[key as keyof User] = undefined;
            }
          });
          return transformedItem as User;
        });
        console.log("Transformed users:", transformedData);
        setAllUsers(transformedData);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const getUsersWithoutPasswords = (): Omit<User, "password">[] => {
    return allUsers.map(({ password, ...rest }) => rest);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const response = await fetch(
      `http://localhost:3001/users?email=${email}&password=${password}`
    );
    const users = await response.json();
    if (users.length > 0) {
      setCurrentUser(users[0]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<boolean> => {
    const existingUser = allUsers.find((user) => user.email === email);
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      id: Date.now(), // Transmit ID-ul ca string
      name,
      email,
      password,
      role: role as "student" | "teacher" | "researcher" | "admin",
    };

    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const createdUser = await response.json();
      setAllUsers((prev) => [...prev, createdUser]);
      setCurrentUser(createdUser);
      return true;
    }

    return false;
  };

  const isAuthenticated = !!currentUser;
  const isTeacherOrResearcher =
    currentUser?.role === "teacher" || currentUser?.role === "researcher";

  const value: AuthContextProps = {
    currentUser,
    login,
    logout,
    isAuthenticated,
    isTeacherOrResearcher,
    signUp,
    getUsersWithoutPasswords,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
