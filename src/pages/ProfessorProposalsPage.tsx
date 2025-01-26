import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Box,
  Pagination,
} from "@mui/material";
import ThesisCard from "../components/ThesisCard";
import { useTopics } from "../context/TopicsContext";
import { useAuth } from "../context/AuthContext";

const ProfessorProposalsPage: React.FC = () => {
  const { topics } = useTopics();
  const { currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // Filter topics proposed by the current professor
  const filteredTopics = topics.filter(
    (topic) => topic.supervisorId === currentUser?.id && !topic.authorId
  );

  // Apply search filter
  const searchFilteredTopics = filteredTopics.filter((topic) => {
    const query = searchQuery.toLowerCase();
    return (
      topic.title.toLowerCase().includes(query) ||
      topic.description.toLowerCase().includes(query) ||
      topic.requiredTechnologies?.some((tech) =>
        tech.toLowerCase().includes(query)
      ) ||
      topic.prerequisites?.some((prereq) =>
        prereq.toLowerCase().includes(query)
      )
    );
  });

  // Calculate pagination
  const pageCount = Math.ceil(searchFilteredTopics.length / itemsPerPage);
  const displayedTopics = searchFilteredTopics.slice(
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
      <Typography variant="h4" gutterBottom textAlign="center">
        Temele Propuse
      </Typography>
      {/* Flex container adaptabil */}
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

      {/* Display cards */}
      <Grid container spacing={2} justifyContent="center">
        {displayedTopics.map((topic) => (
          <Grid item xs={12} sm={6} md={4} key={topic.id}>
            <ThesisCard thesis={topic} userRole={currentUser?.role || ""} />
          </Grid>
        ))}
      </Grid>

      {searchFilteredTopics.length === 0 && (
        <Typography variant="body1" sx={{ marginTop: 2, textAlign: "center" }}>
          Nu există teme care să corespundă criteriilor selectate.
        </Typography>
      )}

      {/* Pagination */}
      {searchFilteredTopics.length > 0 && (
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

export default ProfessorProposalsPage;
