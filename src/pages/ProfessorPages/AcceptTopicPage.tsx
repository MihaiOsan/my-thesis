import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Avatar,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { useTopics } from "../../context/TopicsContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AcceptTopicPage: React.FC = () => {
  const { topics, updateTopic, deleteTopic, acceptThesis } = useTopics();
  const { isTeacherOrResearcher, currentUser } = useAuth();
  const [selectedTopicId, setSelectedTopicId] = useState<number | "">("");

  const navigate = useNavigate();

  const { getUsersWithoutPasswords } = useAuth();

  if (!isTeacherOrResearcher) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Acces interzis
        </Typography>
        <Typography>
          Doar cadre didactice sau cercetători pot accepta teme propuse.
        </Typography>
      </Container>
    );
  }

  const proposedTopics = topics.filter(
    (t) =>
      t.status === "Proposed" &&
      t.supervisorId === currentUser?.id &&
      !t.authorId
  );

  const studentProposedTopics = topics.filter(
    (t) => t.status === "Proposed" && t.authorId
  );

  console.log(studentProposedTopics);
  const findUserById = (userId?: number) =>
    getUsersWithoutPasswords().find((u) => Number(u.id) === Number(userId));

  const handleAccept = (thesisId: number, studentId: number) => {
    acceptThesis(thesisId, currentUser!.id, studentId);

    // Remove the student's applications from other theses
    const otherTopics = topics.filter((t) => t.id !== thesisId);
    otherTopics.forEach((topic) => {
      if (topic.studentsApplications?.includes(Number(studentId))) {
        const updatedApplications = topic.studentsApplications.filter(
          (id) => id !== studentId
        );
        updateTopic({
          ...topic,
          studentsApplications: updatedApplications,
        });
      }
    });

    // Remove the student’s proposed theses
    const studentProposedTopics = topics.filter(
      (t) => t.proposedBy === studentId
    );
    studentProposedTopics.forEach((topic) => {
      if (topic.id !== thesisId) deleteTopic(topic.id);
    });
    alert("Tema a fost acceptata cu succes!");
    navigate(`/thesis-details/${thesisId}`);
  };

  const handleThesisDetails = (id: number): void => {
    navigate(`/thesis-details/${id}`);
  };

  const handleStudentDetails = (id: number): void => {
    console.log(id);
    alert("Function not implemented");
  };

  const renderStudentsForTopic = (topicId: number) => {
    const topic = topics.find((t) => t.id === topicId);
    const studentIds = topic?.studentsApplications || [];

    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Studenți care au aplicat:
        </Typography>
        <Grid container spacing={2}>
          {studentIds.map((studentId) => {
            const studentUser = findUserById(studentId);

            return (
              <Grid item xs={12} sm={6} md={4} key={studentId}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "background.paper",
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={studentUser?.avatarUrl}
                        alt={studentUser?.name}
                      />
                      <Box>
                        <Typography variant="subtitle1">
                          {studentUser?.name || "Student necunoscut"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {studentUser?.email}
                        </Typography>
                      </Box>
                    </Stack>

                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 2, width: "100%" }}
                      onClick={() => handleStudentDetails(studentUser!.id)}
                    >
                      Detalii
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mt: 2, width: "100%" }}
                      onClick={() => handleAccept(topic!.id, studentUser!.id)}
                    >
                      Selectează
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Acceptă Teme Propuse
      </Typography>

      {/* Section 1: My Works */}
      <Box sx={{ mb: 6 }}>
        <Card
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 4,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Lucrările mele
          </Typography>
          {proposedTopics.length === 0 ? (
            <Typography>Nu există lucrări propuse momentan.</Typography>
          ) : (
            <>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Lucrările mele</InputLabel>
                <Select
                  value={selectedTopicId}
                  onChange={(e) => setSelectedTopicId(Number(e.target.value))}
                >
                  {proposedTopics.map((thesis) => (
                    <MenuItem key={thesis.id} value={thesis.id}>
                      {thesis.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedTopicId &&
                renderStudentsForTopic(Number(selectedTopicId))}
            </>
          )}
        </Card>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Section 2: Student Proposed Topics */}
      <Box>
        <Card
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 4,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Lucrări propuse de studenți
          </Typography>
          {studentProposedTopics.length === 0 ? (
            <Typography>
              Nu există teme propuse de studenți momentan.
            </Typography>
          ) : (
            studentProposedTopics.map((thesis) => {
              const authorUser = findUserById(thesis.authorId);

              return (
                <Card
                  key={thesis.id}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "background.paper",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {thesis.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {thesis.description}
                    </Typography>
                    {authorUser && (
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        mt={2}
                      >
                        <Avatar
                          src={authorUser.avatarUrl}
                          alt={authorUser.name}
                        />
                        <Typography variant="subtitle2">
                          <strong>Autor:</strong> {authorUser.name}
                        </Typography>
                      </Stack>
                    )}
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      mt={2}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleAccept(thesis.id, thesis.authorId!)
                        }
                      >
                        Acceptă
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleStudentDetails(thesis.authorId!)}
                      >
                        Detalii Student
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleThesisDetails(thesis.id)}
                      >
                        Detalii Lucrare
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })
          )}
        </Card>
      </Box>
    </Container>
  );
};

export default AcceptTopicPage;
