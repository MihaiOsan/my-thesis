import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Stack,
  Box,
} from "@mui/material";
import { useTopics } from "../context/TopicsContext";
import { useAuth } from "../context/AuthContext";
import { Thesis } from "../types/types";

const ProposeTopicPage: React.FC = () => {
  const { addTopic } = useTopics();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState<"Undergraduate" | "Masters" | "PhD">(
    "Undergraduate"
  );
  const [technologies, setTechnologies] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handlePropose = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !technologies.trim() ||
      !prerequisites.trim()
    ) {
      alert("Te rog să completezi toate câmpurile!");
      return;
    }

    const newTopic: Thesis = {
      id: Date.now(),
      title,
      description,
      authorId: currentUser?.role === "student" ? currentUser!.id : undefined,
      supervisorId:
        currentUser?.role === "teacher" || currentUser?.role === "researcher"
          ? currentUser!.id
          : undefined,
      status: "Proposed",
      level,
      proposedBy: currentUser!.id,
      requiredTechnologies: technologies.split(",").map((tech) => tech.trim()),
      prerequisites: prerequisites.split(",").map((prereq) => prereq.trim()),
      imageUrl:
        imageUrl !== ""
          ? imageUrl
          : "https://crc.losrios.edu/crc/main/img/body-misc/3-academics/cac/business-and-computer-science-body.png",
      proposalDate: new Date(),
    };

    addTopic(newTopic);
    alert("Tema a fost propusă cu succes!");
    setTitle("");
    setDescription("");
    setTechnologies("");
    setPrerequisites("");
    setImageUrl("");
  };

  if (!currentUser) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Acces interzis
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Card elevation={3} sx={{ maxWidth: 700, margin: "0 auto", padding: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Propune o Temă
          </Typography>

          <Stack spacing={3}>
            {/* Secțiunea 1: Detalii generale */}
            <TextField
              label="Titlu"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Descriere"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />

            {/* Secțiunea 2: Specificații */}
            <FormControl fullWidth>
              <InputLabel>Nivel</InputLabel>
              <Select
                value={level}
                onChange={(e) =>
                  setLevel(
                    e.target.value as "Undergraduate" | "Masters" | "PhD"
                  )
                }
              >
                <MenuItem value="Undergraduate">Licență</MenuItem>
                <MenuItem value="Masters">Masterat</MenuItem>
                <MenuItem value="PhD">Doctorat</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Tehnologii necesare (separate prin virgulă)"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              fullWidth
            />
            <TextField
              label="Prerechizite (separate prin virgulă)"
              value={prerequisites}
              onChange={(e) => setPrerequisites(e.target.value)}
              fullWidth
            />

            {/* Secțiunea 3: Imagine + Previzualizare */}
            <Box>
              <Typography variant="subtitle1">
                Previzualizare Imagine
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  backgroundImage: `url(${
                    imageUrl
                      ? imageUrl
                      : "https://crc.losrios.edu/crc/main/img/body-misc/3-academics/cac/business-and-computer-science-body.png"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginTop: 1,
                }}
              />
            </Box>
            <TextField
              label="URL imagine"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
            />
          </Stack>

          <Button
            variant="contained"
            sx={{ mt: 4, px: 4, py: 1 }}
            fullWidth
            onClick={handlePropose}
          >
            Propune
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProposeTopicPage;
