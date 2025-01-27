import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Box,
  Pagination,
} from "@mui/material";
import ThesisCard from "../../components/ThesisCard";
import { useTopics } from "../../context/TopicsContext";
import { useAuth } from "../../context/AuthContext";

const SupervisedThesisPage: React.FC = () => {
  const { topics } = useTopics();
  const { currentUser, isTeacherOrResearcher } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!isTeacherOrResearcher) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Acces interzis
        </Typography>
        <Typography align="center">
          Doar cadre didactice sau cercetători pot vizualiza lucrările
          coordonate.
        </Typography>
      </Container>
    );
  }

  const supervisedTheses = topics.filter(
    (thesis) =>
      (thesis.status === "Accepted" || thesis.status === "In Progress") &&
      thesis.supervisorId === currentUser?.id
  );

  const filteredTheses = supervisedTheses.filter((thesis) => {
    const query = searchQuery.toLowerCase();
    return (
      thesis.title.toLowerCase().includes(query) ||
      thesis.description.toLowerCase().includes(query) ||
      thesis.requiredTechnologies?.some((tech) =>
        tech.toLowerCase().includes(query)
      ) ||
      thesis.prerequisites?.some((prereq) =>
        prereq.toLowerCase().includes(query)
      )
    );
  });

  const pageCount = Math.ceil(filteredTheses.length / itemsPerPage);
  const displayedTheses = filteredTheses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="left">
        Lucrări Coordonate
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          marginBottom: 4,
          justifyContent: "center",
        }}
      >
        {/* Search bar */}
        <TextField
          label="Căutare..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            flex: "2 1 300px", // Flexibil cu lățime minimă
          }}
        />
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {displayedTheses.map((thesis) => (
          <Grid item xs={12} sm={6} md={4} key={thesis.id}>
            <ThesisCard thesis={thesis} />
          </Grid>
        ))}
      </Grid>

      {filteredTheses.length === 0 && (
        <Typography variant="body1" sx={{ marginTop: 2, textAlign: "center" }}>
          Nu există lucrări coordonate care să corespundă criteriilor selectate.
        </Typography>
      )}

      {filteredTheses.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
};

export default SupervisedThesisPage;
