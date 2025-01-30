import React from "react";
import {
  Container,
  Typography,
  Avatar,
  Stack,
  Card,
  Chip,
  Divider,
  Box,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTopics } from "../context/TopicsContext";
import { useAuth } from "../context/AuthContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageviewIcon from "@mui/icons-material/Pageview";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Thesis } from "../types/types";

const ThesisDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { topics, updateTopic, acceptThesis, deleteTopic } = useTopics();
  const { currentUser } = useAuth();

  const thesisId = Number(id);
  const thesis = topics.find((t) => t.id === thesisId);

  const navigate = useNavigate();

  const { getUsersWithoutPasswords } = useAuth();

  if (!thesis) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Tema nu a fost găsită
        </Typography>
      </Container>
    );
  }

  const studentUser = getUsersWithoutPasswords().find(
    (u) => Number(u.id) === Number(thesis.authorId)
  );
  const supervisorUser = getUsersWithoutPasswords().find(
    (u) => Number(u.id) === Number(thesis.supervisorId)
  );

  // Functions for buttons
  const handleApply = () => {
    if (!thesis) {
      alert("Tema nu a fost găsită.");
      return;
    }

    // Verifici dacă utilizatorul curent este deja în lista de așteptare
    if (!thesis.studentsApplications?.includes(currentUser!.id)) {
      // Creezi o nouă versiune a obiectului temei cu utilizatorul adăugat în lista de așteptare
      const updatedThesis: Thesis = {
        ...thesis,
        studentsApplications: [
          ...(thesis.studentsApplications || []),
          currentUser!.id,
        ],
      };

      // Apelezi updateTopic pentru a actualiza tema
      updateTopic(updatedThesis);
      alert("Te-ai înscris pentru această lucrare.");
    } else {
      alert("Ești deja în lista de așteptare pentru această lucrare.");
    }
  };

  const handleAccept = () => {
    acceptThesis(thesis.id, currentUser!.id, thesis.authorId!);
    alert("Lucrarea a fost acceptată.");
  };

  const handleEdit = () => {
    navigate(`/edit-thesis/${thesis.id}`);
  };

  const handleDelete = () => {
    const confirmed = window.confirm("Sigur doriți să ștergeți această temă?");
    if (confirmed) {
      deleteTopic(thesis.id);
      alert("Tema a fost ștearsă.");
      navigate("/");
    }
  };

  const handleUploadDocuments = () => {
    alert("Function not implemented.");
    throw new Error("Function not implemented.");
  };

  const handleTurnPaper = (): void => {
    const confirmed = window.confirm(
      "Sigur doriți să predați această lucrare? Acțiunea este ireversibilă (momentan)"
    );
    if (confirmed) {
      if (!thesis) {
        alert("Tema nu a fost găsită.");
        return;
      }
      if (thesis.authorId === currentUser!.id) {
        const updatedThesis: Thesis = {
          ...thesis,
          status: "Completed",
        };

        // Apelezi updateTopic pentru a actualiza tema
        updateTopic(updatedThesis);
        alert("Lucrarea a fost predată cu succes");
      } else {
        alert("S-a produs o eroare!");
      }
    }
  };

  const handleUnassign = (): void => {
    const confirmed = window.confirm(
      "Sigur doriți să renunțați la această lucrare? Acțiunea este ireversibilă ducând la ștergerea temei (dacă este propusă de student) sau la redeschiderea ei (propusă de profesor)."
    );
    if (confirmed) {
      if (!thesis) {
        alert("Tema nu a fost găsită.");
        return;
      }
      if (thesis.supervisorId === thesis.proposedBy) {
        const updatedThesis: Thesis = {
          ...thesis,
          status: "Proposed",
          authorId: undefined,
        };

        // Apelezi updateTopic pentru a actualiza tema
        updateTopic(updatedThesis);
        alert("Lucrarea a fost redeschisă cu succes!");
      } else {
        deleteTopic(thesis.id);
        alert("Lucrarea a fost ștearsă!");
      }
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Paper sx={{ padding: 4, boxShadow: 4 }}>
        {/* Header image with preserved aspect ratio */}
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
            maxHeight: "350px",
            objectFit: "cover",
            marginBottom: 4,
            borderRadius: 1,
            boxShadow: 3,
          }}
        />
        {/* Title */}
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          {thesis.title}
        </Typography>
        {/* Description */}
        <Typography variant="body1" gutterBottom>
          {thesis.description}
        </Typography>
        {/* User Info */}
        <Box
          sx={{ display: "flex", justifyContent: "space-between", marginY: 2 }}
        >
          {studentUser && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={studentUser.avatarUrl} alt={studentUser.name} />
              <Typography>
                <strong>Student:</strong> {studentUser.name}
              </Typography>
            </Stack>
          )}
          {supervisorUser && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={supervisorUser.avatarUrl}
                alt={supervisorUser.name}
              />
              <Typography>
                <strong>Coordonator:</strong> {supervisorUser.name}
              </Typography>
            </Stack>
          )}
        </Box>
        {/* Divider */}
        <Divider sx={{ my: 3 }} />
        {/* Details */}
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
            {thesis.requiredTechnologies!.map((tech, idx) => (
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
            {thesis.prerequisites!.map((prereq, idx) => (
              <Chip label={prereq} key={idx} />
            ))}
          </Stack>

          <Typography variant="body1" gutterBottom>
            <strong>Status:</strong> {thesis.status}
          </Typography>
        </Box>
        {/* Documents */}
        {thesis.documents && thesis.documents.length > 0 && (
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h5" gutterBottom>
              Documente
            </Typography>
            <Stack spacing={2}>
              {thesis.documents.map((doc) => (
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
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {doc.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Încărcat de userul cu ID {doc.uploadedBy} la{" "}
                      {doc.uploadedAt
                        ? new Date(doc.uploadedAt).toLocaleDateString()
                        : "Data necunoscută"}
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      href={doc.url}
                      target="_blank"
                      startIcon={<PageviewIcon />}
                      sx={{ marginLeft: 2 }}
                    >
                      Vizualizează
                    </Button>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Box>
        )}
        {/* Buttons */}
        {currentUser && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between", // Mută un grup de butoane la stânga și altul la dreapta
              alignItems: "center",
              marginTop: 4,
              gap: 2,
            }}
          >
            {/* Butonul de delete în partea stângă */}
            {((currentUser.role === "teacher" &&
              thesis.supervisorId === currentUser.id &&
              !thesis.authorId) ||
              (currentUser.role === "student" &&
                thesis.authorId === currentUser.id &&
                !thesis.supervisorId)) && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
                sx={{
                  paddingX: 3,
                  fontSize: "1rem",
                }}
              >
                Șterge
              </Button>
            )}

            {currentUser.role === "student" &&
              thesis.authorId === currentUser.id &&
              thesis.supervisorId &&
              thesis.status !== "Completed" &&
              thesis.status !== "Graded" && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleUnassign}
                  startIcon={<BackspaceIcon />}
                  sx={{
                    paddingX: 3,
                    fontSize: "1rem",
                  }}
                >
                  Schimbă lucrarea
                </Button>
              )}

            {/* Celelalte butoane în partea dreaptă */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {currentUser?.role === "student" && !thesis.authorId && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleApply}
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    paddingX: 3,
                    fontSize: "1rem",
                  }}
                >
                  Aplică
                </Button>
              )}

              {currentUser?.role === "teacher" && !thesis.supervisorId && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAccept}
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    paddingX: 3,
                    fontSize: "1rem",
                  }}
                >
                  Acceptă lucrarea
                </Button>
              )}

              {/* Butonul pentru încărcarea documentelor */}
              {currentUser &&
                (thesis.supervisorId === currentUser.id ||
                  thesis.authorId === currentUser.id) &&
                thesis.status !== "Completed" &&
                thesis.status !== "Graded" && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleUploadDocuments} // Aici ar fi funcția pentru încărcarea documentelor
                    startIcon={<UploadFileIcon />}
                    sx={{
                      paddingX: 3,
                      fontSize: "1rem",
                    }}
                  >
                    Încarcă Documente
                  </Button>
                )}

              {currentUser.role === "student" &&
                thesis.authorId === currentUser.id &&
                thesis.supervisorId &&
                thesis.status !== "Completed" &&
                thesis.status !== "Graded" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTurnPaper}
                    startIcon={<WhereToVoteIcon />}
                    sx={{
                      paddingX: 3,
                      fontSize: "1rem",
                    }}
                  >
                    Preda Lucrarea
                  </Button>
                )}

              {((currentUser.role === "teacher" &&
                thesis.supervisorId === currentUser.id &&
                !thesis.authorId) ||
                (currentUser.role === "student" &&
                  thesis.authorId === currentUser.id &&
                  !thesis.supervisorId)) &&
                thesis.status !== "Completed" &&
                thesis.status !== "Graded" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}
                    startIcon={<EditIcon />}
                    sx={{
                      paddingX: 3,
                      fontSize: "1rem",
                    }}
                  >
                    Modifică
                  </Button>
                )}
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ThesisDetailsPage;
