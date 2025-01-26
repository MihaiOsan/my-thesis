// src/pages/AcceptTopicPage.tsx

import React from "react";
import { useTopics } from "../context/TopicsContext";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import { mockUsers } from "../data/mockUsers"; // sau un UsersContext
import { User } from "../types/types";

const AcceptTopicPage: React.FC = () => {
  const { topics, acceptTopic } = useTopics();
  const { isTeacherOrResearcher } = useAuth();

  // Verificăm permisiunea. Dacă userul NU e teacher/researcher, afișăm "Acces interzis."
  if (!isTeacherOrResearcher) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Acces interzis
        </Typography>
        <Typography>
          Doar cadre didactice sau cercetători pot accepta teme propuse.
        </Typography>
      </Container>
    );
  }

  // Filtrăm doar temele cu status = "Proposed"
  const proposedTopics = topics.filter((t) => t.status === "Proposed");

  // Funcție care întoarce userul (nume/poză) pe baza ID-ului
  const findUserById = (userId?: number): User | undefined => {
    return mockUsers.find((u) => u.id === userId);
  };

  const handleAccept = (thesisId: number) => {
    acceptTopic(thesisId);
    alert("Tema a fost acceptată!");
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Acceptă Teme Propuse
      </Typography>

      {proposedTopics.length === 0 ? (
        <Typography>Nu există teme propuse în așteptare.</Typography>
      ) : (
        proposedTopics.map((thesis) => {
          const authorUser = findUserById(thesis.authorId);
          const supervisorUser = findUserById(thesis.supervisorId);

          return (
            <Card key={thesis.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5">{thesis.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {thesis.description}
                </Typography>

                {/* Afișăm autorul (lookup cu authorId) */}
                {authorUser && (
                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <Avatar src={authorUser.avatarUrl} alt={authorUser.name} />
                    <Typography variant="subtitle2">
                      <strong>Autor:</strong> {authorUser.name}
                    </Typography>
                  </Stack>
                )}

                {/* Afișăm supervizorul, dacă există */}
                {supervisorUser && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      src={supervisorUser.avatarUrl}
                      alt={supervisorUser.name}
                    />
                    <Typography variant="subtitle2">
                      <strong>Coordonator:</strong> {supervisorUser.name}
                    </Typography>
                  </Stack>
                )}

                <Typography variant="subtitle2" mt={1}>
                  <strong>Status:</strong> {thesis.status}
                </Typography>

                <Button
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  onClick={() => handleAccept(thesis.id)}
                >
                  Acceptă
                </Button>
              </CardContent>
            </Card>
          );
        })
      )}
    </Container>
  );
};

export default AcceptTopicPage;
