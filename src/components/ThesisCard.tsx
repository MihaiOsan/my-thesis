import React, { useMemo } from "react";
import { Thesis } from "../types/types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Stack,
  Button,
} from "@mui/material";
import { mockUsers } from "../data/mockUsers";
import { useNavigate } from "react-router-dom";

interface ThesisCardProps {
  thesis: Thesis;
}

const ThesisCard: React.FC<ThesisCardProps> = ({ thesis }) => {
  const navigate = useNavigate();

  // Găsim studentul (autorul) și coordonatorul
  const studentUser = useMemo(
    () => mockUsers.find((u) => u.id === thesis.authorId),
    [thesis.authorId]
  );
  const supervisorUser = useMemo(
    () => mockUsers.find((u) => u.id === thesis.supervisorId),
    [thesis.supervisorId]
  );

  // Navighează la pagina de detalii
  const handleViewDetails = () => {
    navigate(`/thesis-details/${thesis.id}`);
  };

  return (
    <Card sx={{ maxWidth: 300, margin: 2, borderRadius: 4, boxShadow: 2 }}>
      <CardMedia
        component="img"
        height="150"
        image={
          thesis.imageUrl != undefined
            ? thesis.imageUrl
            : "https://crc.losrios.edu/crc/main/img/body-misc/3-academics/cac/business-and-computer-science-body.png"
        }
        alt="Tip temă"
      />

      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight="bold">
            {thesis.title}
          </Typography>
          {/*<Typography variant="body2" color="text.secondary">
            <strong>Status:</strong> {thesis.status}
          </Typography>*/}

          {/* Afișăm studentul (autorul) dacă există*/}
          {studentUser && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar src={studentUser.avatarUrl} alt={studentUser.name} />
              <Typography variant="body2">
                <strong>Student:</strong> {studentUser.name}
              </Typography>
            </Stack>
          )}

          {/* Afișăm profesorul (coordonatorul) dacă există */}
          {supervisorUser && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                src={supervisorUser.avatarUrl}
                alt={supervisorUser.name}
              />
              <Typography variant="body2">
                <strong>Profesor:</strong> {supervisorUser.name}
              </Typography>
            </Stack>
          )}

          {/* Prerechizite */}
          {thesis.prerequisites!.length > 0 && (
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                <strong>Prerechizite:</strong>
              </Typography>
              {thesis.prerequisites!.map((prerequisite, index) => (
                <Typography key={index} variant="body2" color="text.secondary">
                  - {prerequisite}
                </Typography>
              ))}
            </Stack>
          )}

          {/* Buton de vizualizare a detaliilor */}
          <Button variant="outlined" size="small" onClick={handleViewDetails}>
            View
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ThesisCard;
