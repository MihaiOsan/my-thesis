import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import { useTopics } from "../../context/TopicsContext";
import { useAuth } from "../../context/AuthContext";

const GradesPage: React.FC = () => {
  const { topics } = useTopics();
  const { currentUser } = useAuth();

  // Obține temele completate sau evaluate ale studentului curent
  const gradedAndCompletedTopics = topics.filter(
    (t) =>
      t.authorId === currentUser?.id &&
      (t.status === "Completed" || t.status === "Graded")
  );

  if (!currentUser) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Acces interzis
        </Typography>
        <Typography align="center">
          Vă rugăm să vă autentificați pentru a accesa notele.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4, maxWidth: "700px" }}>
      <Card elevation={3} sx={{ padding: 4, margin: "0 auto" }}>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Notele Mele
          </Typography>

          {gradedAndCompletedTopics.length === 0 ? (
            <Typography align="center">
              Nu există lucrări finalizate sau notate momentan.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {gradedAndCompletedTopics.map((topic) => (
                <Grid item xs={12} key={topic.id}>
                  <Box
                    sx={{
                      padding: 2,
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      backgroundColor: "background.paper",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {topic.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Status: {topic.status}
                    </Typography>
                    {topic.status === "Graded" && topic.evaluation && (
                      <>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          <strong>Notă:</strong> {topic.evaluation.grade}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          <strong>Data evaluării:</strong>{" "}
                          {new Date(
                            topic.evaluation.evaluationDate
                          ).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          <strong>Review:</strong> {topic.evaluation.feedback}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default GradesPage;
