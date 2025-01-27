// src/context/TopicsContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Thesis } from "../types/types";
import { mockTheses } from "../data/mockData";

interface TopicsContextProps {
  topics: Thesis[];
  addTopic: (newTopic: Thesis) => void;
  acceptTopic: (id: number) => void;
  evaluateThesis: (id: number, grade: number, feedback: string) => void;
  acceptThesis: (id: number, idProf: number) => void;
  updateTopic: (newThesis: Thesis) => void;
}

const TopicsContext = createContext<TopicsContextProps | undefined>(undefined);

/**
 * Hook personalizat pentru a folosi contextul
 */
export function useTopics() {
  const ctx = useContext(TopicsContext);
  if (!ctx) {
    throw new Error("useTopics must be used within a TopicsProvider");
  }
  return ctx;
}

/**
 * Provider
 */
export const TopicsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [topics, setTopics] = useState<Thesis[]>(mockTheses);

  // Funcții logice
  const addTopic = (newTopic: Thesis) => {
    setTopics((prev) => [...prev, newTopic]);
  };

  const acceptTopic = (id: number) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Accepted" } : t))
    );
  };

  const acceptThesis = (id: number, idProf: number) => {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              supervisorId: idProf,
              status: "Accepted",
            }
          : t
      )
    );
  };

  const evaluateThesis = (id: number, grade: number, feedback: string) => {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              evaluation: {
                grade,
                feedback,
                evaluationDate: new Date(),
              },
              status: "Graded",
            }
          : t
      )
    );
  };

  const updateTopic = (newThesis: Thesis) => {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === newThesis.id
          ? {
              ...newThesis,
            }
          : t
      )
    );
  };

  // returnăm totul în context
  return (
    <TopicsContext.Provider
      value={{
        topics,
        addTopic,
        acceptTopic,
        evaluateThesis,
        acceptThesis,
        updateTopic,
      }}
    >
      {children}
    </TopicsContext.Provider>
  );
};
