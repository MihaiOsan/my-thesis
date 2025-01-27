// src/pages/AssignedThesisPage.tsx

import React, { useMemo } from "react";
import {
  Container,
  Typography,
  Avatar,
  Stack,
  Chip,
  Divider,
  Box,
  Paper,
  Button,
  Card,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useTopics } from "../context/TopicsContext";
import { useAuth } from "../context/AuthContext";
import { mockUsers } from "../data/mockUsers";

const AssignedThesisPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { topics } = useTopics();
  const { currentUser } = useAuth();

  const thesis = topics.find((t) => t.id === Number(id));

  const supervisor = useMemo(
    () => mockUsers.find((u) => u.id === thesis?.supervisorId),
    [thesis?.supervisorId]
  );

  if (!thesis) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Tema nu a fost găsită
        </Typography>
      </Container>
    );
  }

  const isUserAssigned =
    thesis.authorId === currentUser?.id && thesis.supervisorId;

  return (
    <Container sx={{ marginTop: 4 }}>
      <Paper sx={{ padding: 4, boxShadow: 4 }}>
        {/* Imaginea temei */}
        <Box
          component="img"
          src={
            thesis.imageUrl ||
            "https://crc.losrios.edu/crc/main/img/body-misc/3-academics/cac/business-and-computer-science-body.png"
          }
          alt={thesis.title}
          sx={{
            display: "block",
            width: "100%",
            maxHeight: "300px",
            objectFit: "contain",
            marginBottom: 4,
            borderRadius: 1,
          }}
        />
        {/* Titlu și descriere */}
        <Typography variant="h4" gutterBottom align="center">
          {thesis.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {thesis.description}
        </Typography>
        {/* Detalii */}
        <Box>
          <Typography variant="body1" gutterBottom>
            <strong>Nivel:</strong> {thesis.level}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Tehnologii necesare:</strong>
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: "wrap", marginBottom: 2 }}
          >
            {thesis.requiredTechnologies?.map((tech, idx) => (
              <Chip label={tech} key={idx} />
            ))}
          </Stack>
          <Typography variant="body1" gutterBottom>
            <strong>Prerechizite:</strong>
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: "wrap", marginBottom: 2 }}
          >
            {thesis.prerequisites?.map((prereq, idx) => (
              <Chip label={prereq} key={idx} />
            ))}
          </Stack>
        </Box>
        {/* Divider */}
        <Divider sx={{ my: 3 }} />
        {/* Detalii suplimentare și buton de descărcare */}
        <Box>
          {isUserAssigned && (
            <>
              <Typography variant="body1" gutterBottom>
                <strong>Coordonator:</strong> {supervisor?.name || "N/A"}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar alt="Coordonator" src={supervisor?.avatarUrl} />
                <Typography>{supervisor?.email}</Typography>
              </Stack>
            </>
          )}
          {thesis.documents?.map((doc) => (
            <Card
              key={doc.id}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                boxShadow: 2,
                borderRadius: 2,
              }}
            >
              <Box sx={{ flex: "1 1 auto" }}>
                <Typography variant="h6" gutterBottom>
                  {doc.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {doc.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Încărcat de userul cu ID {doc.uploadedBy} la{" "}
                  {doc.uploadedAt.toLocaleDateString()}
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  href={doc.url}
                  target="_blank"
                  sx={{ marginLeft: 2 }}
                >
                  Vizualizează
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default AssignedThesisPage;
