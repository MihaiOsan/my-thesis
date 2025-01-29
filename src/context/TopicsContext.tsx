import React, { createContext, useContext, useEffect, useState } from "react";
import { Thesis } from "../types/types";

interface TopicsContextProps {
  topics: Thesis[];
  addTopic: (newTopic: Thesis) => void;
  evaluateThesis: (id: number, grade: number, feedback: string) => void;
  acceptThesis: (id: number, idProf: number, studId: number) => void;
  updateTopic: (newThesis: Thesis) => void;
  deleteTopic: (id: number) => void;
}

const TopicsContext = createContext<TopicsContextProps | undefined>(undefined);

export function useTopics() {
  const ctx = useContext(TopicsContext);
  if (!ctx) {
    throw new Error("useTopics must be used within a TopicsProvider");
  }
  return ctx;
}

export const TopicsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [topics, setTopics] = useState<Thesis[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/theses")
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data before transformation:", data);
        const transformedData = data.map((item: Thesis) => {
          // Convertește id din string în number
          const idAsNumber =
            typeof item.id === "string" ? Number(item.id) : item.id;

          // Transformă valorile null în undefined
          const transformedItem: Partial<Thesis> = { ...item, id: idAsNumber };
          Object.keys(transformedItem).forEach((key) => {
            if (transformedItem[key as keyof Thesis] === null) {
              transformedItem[key as keyof Thesis] = undefined;
            }
          });

          return transformedItem as Thesis;
        });
        console.log("Transformed data:", transformedData);
        setTopics(transformedData);
      })
      .catch((error) => console.error("Error fetching theses:", error));
  }, []);

  const addTopic = (newTopic: Thesis) => {
    const topicToSave = {
      ...newTopic,
      id: String(newTopic.id),
      authorId: newTopic.authorId ? String(newTopic.authorId) : undefined,
      supervisorId: newTopic.supervisorId
        ? String(newTopic.supervisorId)
        : undefined,
      proposedBy: newTopic.proposedBy ? String(newTopic.proposedBy) : undefined,
      proposedTo: newTopic.proposedTo ? String(newTopic.proposedTo) : undefined,
    };

    fetch("http://localhost:3001/theses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topicToSave),
    })
      .then((response) => response.json())
      .then((topicToSave) => {
        setTopics((prev) => [
          ...prev,
          { ...topicToSave, id: Number(topicToSave.id) },
        ]);
      })
      .catch((error) => console.error("Error adding topic:", error));
  };

  const acceptThesis = (id: number, idProf: number, studId: number) => {
    fetch(`http://localhost:3001/theses/${String(id)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        supervisorId: String(idProf),
        status: "Accepted",
        authorId: String(studId),
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setTopics((prev) =>
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  supervisorId: idProf,
                  status: "Accepted",
                  authorId: studId,
                }
              : t
          )
        );
      })
      .catch((error) => console.error("Error accepting thesis:", error));
  };

  const evaluateThesis = (id: number, grade: number, feedback: string) => {
    fetch(`http://localhost:3001/theses/${String(id)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        evaluation: { grade, feedback, evaluationDate: new Date() },
        status: "Graded",
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setTopics((prev) =>
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  evaluation: { grade, feedback, evaluationDate: new Date() },
                  status: "Graded",
                }
              : t
          )
        );
      })
      .catch((error) => console.error("Error evaluating thesis:", error));
  };

  const updateTopic = (newThesis: Thesis) => {
    fetch(`http://localhost:3001/theses/${String(newThesis.id)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newThesis),
    })
      .then((response) => response.json())
      .then(() => {
        setTopics((prev) =>
          prev.map((t) => (t.id === newThesis.id ? newThesis : t))
        );
      })
      .catch((error) => console.error("Error updating topic:", error));
  };

  const deleteTopic = (id: number) => {
    fetch(`http://localhost:3001/theses/${String(id)}`, {
      method: "DELETE",
    })
      .then(() => {
        setTopics((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((error) => console.error("Error deleting topic:", error));
  };

  return (
    <TopicsContext.Provider
      value={{
        topics,
        addTopic,
        evaluateThesis,
        acceptThesis,
        updateTopic,
        deleteTopic,
      }}
    >
      {children}
    </TopicsContext.Provider>
  );
};
