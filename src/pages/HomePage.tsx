import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Pagination,
} from "@mui/material";
import ThesisCard from "../components/ThesisCard";
import { useTopics } from "../context/TopicsContext";
import { useAuth } from "../context/AuthContext";
import { Thesis } from "../types/types";

const HomePage: React.FC = () => {
  const { topics } = useTopics();
  const { currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [proposedByFilter, setProposedByFilter] = useState<
    "student" | "teacher" | "all"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const filteredTopics = topics.filter((topic: Thesis) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      topic.title.toLowerCase().includes(query) ||
      topic.description.toLowerCase().includes(query) ||
      topic.requiredTechnologies?.some((tech) =>
        tech.toLowerCase().includes(query)
      ) ||
      topic.prerequisites?.some((prereq) =>
        prereq.toLowerCase().includes(query)
      );

    if (proposedByFilter === "student") {
      return (
        matchesSearch &&
        topic.supervisorId === undefined &&
        topic.authorId !== undefined
      );
    } else if (proposedByFilter === "teacher") {
      return (
        matchesSearch &&
        topic.authorId === undefined &&
        topic.supervisorId !== undefined
      );
    } else if (proposedByFilter === "all") {
      return (
        matchesSearch &&
        (topic.supervisorId === undefined || topic.authorId === undefined)
      );
    }

    return matchesSearch;
  });

  // Calculăm elementele curente bazate pe pagină
  const pageCount = Math.ceil(filteredTopics.length / itemsPerPage);

  const displayedTopics = filteredTopics.slice(
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
        Teme Disponibile
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
        {/* Search bar mai mare */}
        <TextField
          label="Căutare..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            flex: "2 1 300px", // Flexibil cu lățime minimă
          }}
        />

        {/* Dropdown */}
        <FormControl
          sx={{
            flex: "1 1 200px", // Flexibil cu lățime minimă
          }}
        >
          <InputLabel id="proposed-by-filter-label">Propus de</InputLabel>
          <Select
            labelId="proposed-by-filter-label"
            value={proposedByFilter}
            onChange={(e) =>
              setProposedByFilter(
                e.target.value as "student" | "teacher" | "all"
              )
            }
          >
            <MenuItem value="all">Toate</MenuItem>
            <MenuItem value="student">Propus de Studenți</MenuItem>
            <MenuItem value="teacher">Propus de Profesori</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Afișare carduri */}
      <Grid container spacing={2} justifyContent="center">
        {displayedTopics.map((topic) => (
          <Grid item xs={12} sm={6} md={4} key={topic.id}>
            <ThesisCard thesis={topic} userRole={currentUser?.role || ""} />
          </Grid>
        ))}
      </Grid>

      {filteredTopics.length === 0 && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Nu există teme care să corespundă criteriilor selectate.
        </Typography>
      )}

      {/* Paginare */}
      {filteredTopics.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Pagination
            count={Math.max(1, pageCount)}
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

export default HomePage;
