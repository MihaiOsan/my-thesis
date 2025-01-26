import React from "react";
import { Container, Typography, Box, Card, Grid, Avatar } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RateReviewIcon from "@mui/icons-material/RateReview";

const AboutPage: React.FC = () => {
  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      {/* Secțiunea Imagine de Fundal */}
      <Box
        sx={{
          marginBottom: 4,
          position: "relative",
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src="https://img.freepik.com/premium-photo/blue-office-notebook-pencil_115594-1183.jpg?semt=ais_hybrid"
          alt="Imagine de fundal"
          sx={{
            maxHeight: "300px", // Dimensiunea maximă înălțime
            maxWidth: "100%", // Dimensiunea maximă lățime
            width: "auto", // Ajustare lățime pentru a păstra proporțiile
            height: "auto", // Ajustare înălțime pentru a păstra proporțiile
            borderRadius: 2,
            boxShadow: 3,
          }}
        />
        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          Bine ați venit în Sistemul nostru
        </Typography>
      </Box>

      {/* Secțiunea Despre */}
      <Card
        sx={{
          textAlign: "center",
          padding: 4,
          borderRadius: 2,
          marginBottom: 4,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Despre Sistemul nostru
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: "800px", margin: "0 auto" }}
          >
            Acest sistem a fost creat pentru a îmbunătăți procesul de propunere,
            gestionare și evaluare a lucrărilor academice. Studenții și
            profesorii colaborează într-un mediu structurat pentru a obține
            rezultate de succes.
          </Typography>
        </Box>
      </Card>

      {/* Secțiunea Funcționalități */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ marginBottom: 4 }}
      >
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <SchoolIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography variant="h6" gutterBottom>
              Colaborare Academică
            </Typography>
            <Typography variant="body2">
              Profesorii și studenții își coordonează eforturile într-un singur
              loc, cu vizibilitate completă asupra progresului.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <AssignmentIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography variant="h6" gutterBottom>
              Gestionarea Temelor
            </Typography>
            <Typography variant="body2">
              Păstrați o evidență clară a temelor, documentelor și
              feedback-ului.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <RateReviewIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography variant="h6" gutterBottom>
              Evaluări Calitative
            </Typography>
            <Typography variant="body2">
              Profesorii oferă feedback detaliat, ajutând studenții să-și
              îmbunătățească lucrările.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Secțiunea Testimoniale */}
      <Card
        sx={{
          textAlign: "center",
          padding: 4,
          borderRadius: 2,
          marginBottom: 4,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Ce spun utilizatorii noștri
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card>
                <Box textAlign="center">
                  <Avatar
                    src="https://randomuser.me/api/portraits/women/45.jpg"
                    alt="Profesor"
                    sx={{ width: 80, height: 80, margin: "0 auto" }}
                  />
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Dr. Ana Dumitrescu
                  </Typography>
                  <Typography variant="body1">
                    "Acest sistem a schimbat complet modul în care colaborăm cu
                    studenții. Este eficient și ușor de utilizat."
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <Box textAlign="center">
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/39.jpg"
                    alt="Student"
                    sx={{ width: 80, height: 80, margin: "0 auto" }}
                  />
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Alex Ionescu
                  </Typography>
                  <Typography variant="body1">
                    "M-a ajutat să-mi organizez proiectele și să primesc
                    feedback rapid. Mi-a simplificat semnificativ munca."
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
};

export default AboutPage;
