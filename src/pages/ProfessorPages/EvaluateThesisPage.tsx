import React, { useMemo, useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Box,
} from "@mui/material";
import { useTopics } from "../../context/TopicsContext";
import { useAuth } from "../../context/AuthContext";
import { Thesis } from "../../types/types";

const EvaluateThesisPage: React.FC = () => {
  const { topics, evaluateThesis } = useTopics();
  const { isTeacherOrResearcher } = useAuth();

  const [selectedThesisId, setSelectedThesisId] = useState<number | "">("");
  const [grade, setGrade] = useState<number>(10);
  const [feedback, setFeedback] = useState("");
  const { getUsersWithoutPasswords } = useAuth();

  const evaluableTheses = topics.filter((t) => t.status === "Completed");

  const selectedThesis = evaluableTheses.find((t) => t.id === selectedThesisId);

  const studentUser = useMemo(
    () =>
      getUsersWithoutPasswords().find(
        (u) => Number(u.id) === Number(selectedThesis?.authorId)
      ),
    [selectedThesis?.authorId]
  );

  if (!isTeacherOrResearcher) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Acces interzis
        </Typography>
        <Typography align="center">
          Doar cadre didactice sau cercetători pot evalua lucrările.
        </Typography>
      </Container>
    );
  }

  const handleEvaluate = () => {
    if (selectedThesisId === "") {
      alert("Te rog selectează lucrarea pe care vrei să o evaluezi!");
      return;
    }
    evaluateThesis(selectedThesisId as number, grade, feedback);
    alert("Evaluare salvată cu succes!");
    setSelectedThesisId("");
    setGrade(10);
    setFeedback("");
  };

  return (
    <Container sx={{ marginTop: 4, maxWidth: "700px" }}>
      <Card elevation={3} sx={{ padding: 4, margin: "0 auto" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Evaluează Lucrare
          </Typography>

          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel id="thesis-select-label">Alege Lucrare</InputLabel>
              <Select
                labelId="thesis-select-label"
                value={selectedThesisId}
                onChange={(e) => setSelectedThesisId(e.target.value as number)}
              >
                <MenuItem value="">Nicio lucrare selectată</MenuItem>
                {evaluableTheses.map((thesis: Thesis) => (
                  <MenuItem key={thesis.id} value={thesis.id}>
                    {thesis.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Notă"
              type="number"
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              fullWidth
            />

            <TextField
              label="Feedback"
              multiline
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              fullWidth
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleEvaluate}
              sx={{ padding: "10px 0", fontSize: "1rem" }}
            >
              Evaluează
            </Button>

            {selectedThesis && (
              <Box
                sx={{
                  marginTop: 4,
                  padding: 3,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Detalii Lucrare
                </Typography>
                <Typography variant="body1">
                  <strong>Titlu:</strong> {selectedThesis.title}
                </Typography>
                <p></p>

                <Typography variant="body1">
                  <strong>Autor:</strong> {studentUser?.name}
                </Typography>
                <p />
                <Typography variant="body1">
                  <strong>Descriere:</strong> {selectedThesis.description}
                </Typography>
                <p />
                <Typography variant="body1">
                  <strong>Documente:</strong>{" "}
                </Typography>
                <p></p>
                {selectedThesis.documents?.length ? (
                  selectedThesis.documents.map((doc, index) => (
                    <Box
                      key={index}
                      sx={{
                        marginBottom: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 2,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        backgroundColor: "background.default",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {doc.name}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        href={doc.url}
                        target="_blank"
                      >
                        Vizualizează
                      </Button>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Niciun document disponibil
                  </Typography>
                )}
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EvaluateThesisPage;
