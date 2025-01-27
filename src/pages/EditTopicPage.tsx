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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useTopics } from "../context/TopicsContext";
import { useAuth } from "../context/AuthContext";
import { Thesis } from "../types/types";
import { useParams, useNavigate } from "react-router-dom";

const EditTopicPage: React.FC = () => {
  const { topics, updateTopic } = useTopics();
  const { currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const thesisId = Number(id);

  const thesisToEdit = topics.find((t) => t.id === thesisId);

  const [title, setTitle] = useState(thesisToEdit?.title || "");
  const [description, setDescription] = useState(
    thesisToEdit?.description || ""
  );
  const [level, setLevel] = useState(thesisToEdit?.level || "Undergraduate");
  const [technologies, setTechnologies] = useState(
    thesisToEdit?.requiredTechnologies?.join(", ") || ""
  );
  const [prerequisites, setPrerequisites] = useState(
    thesisToEdit?.prerequisites?.join(", ") || ""
  );
  const [imageUrl, setImageUrl] = useState(thesisToEdit?.imageUrl || "");
  const [keepDocuments, setKeepDocuments] = useState(true);

  const handleSave = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !technologies.trim() ||
      !prerequisites.trim()
    ) {
      alert("Te rog să completezi toate câmpurile!");
      return;
    }

    if (
      !(
        currentUser &&
        ((currentUser.id === thesisToEdit?.authorId &&
          !thesisToEdit.supervisorId) ||
          (currentUser.id === thesisToEdit?.supervisorId &&
            !thesisToEdit.authorId))
      )
    ) {
      alert("Tema nu se poate modifica!");
      return;
    }

    const updatedTopic: Thesis = {
      ...thesisToEdit!,
      title,
      description,
      level,
      requiredTechnologies: technologies.split(",").map((tech) => tech.trim()),
      prerequisites: prerequisites.split(",").map((prereq) => prereq.trim()),
      imageUrl,
      documents: keepDocuments ? thesisToEdit?.documents : [],
    };

    updateTopic(updatedTopic);
    alert("Tema a fost actualizată cu succes!");
    navigate(`/thesis-details/${thesisId}`);
  };

  const handleCancel = () => {
    navigate(`/thesis-details/${thesisId}`);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Card elevation={3} sx={{ maxWidth: 700, margin: "0 auto", padding: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Modifică Tema
          </Typography>

          <Stack spacing={3}>
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
                  backgroundImage: `url(${imageUrl})`,
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={keepDocuments}
                  onChange={(e) => setKeepDocuments(e.target.checked)}
                />
              }
              label="Păstrează documentele existente"
            />
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ px: 4, py: 1 }}
              fullWidth
            >
              Salvează Modificările
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{ px: 4, py: 1 }}
              fullWidth
            >
              Anulează
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditTopicPage;
