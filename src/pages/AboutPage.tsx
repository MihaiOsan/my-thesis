import React from "react";
import { Container, Typography, Box, Card, Grid, Avatar } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RateReviewIcon from "@mui/icons-material/RateReview";

const AboutPage: React.FC = () => {
  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      {/* Background Image Section */}
      <Box
        sx={{
          mb: 6,
          position: "relative",
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src="https://img.freepik.com/premium-photo/blue-office-notebook-pencil_115594-1183.jpg?semt=ais_hybrid"
          alt="Background Image"
          sx={{
            maxHeight: 300,
            width: "100%",
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

      {/* About Section */}
      <Card
        sx={{
          textAlign: "center",
          py: 5,
          borderRadius: 2,
          mb: 6,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Despre Sistemul nostru
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto" }}>
          Acest sistem a fost creat pentru a îmbunătăți procesul de propunere,
          gestionare și evaluare a lucrărilor academice. Studenții și profesorii
          colaborează într-un mediu structurat pentru a obține rezultate de
          succes.
        </Typography>
      </Card>

      {/* Features Section */}
      <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              boxShadow: 0,
            }}
          >
            <SchoolIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Colaborare Academică
            </Typography>
            <Typography variant="body2">
              Profesorii și studenții își coordonează eforturile într-un singur
              loc, cu vizibilitate completă asupra progresului.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              boxShadow: 0,
            }}
          >
            <AssignmentIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Gestionarea Temelor
            </Typography>
            <Typography variant="body2">
              Păstrați o evidență clară a temelor, documentelor și
              feedback-ului.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              boxShadow: 0,
            }}
          >
            <RateReviewIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Evaluări Calitative
            </Typography>
            <Typography variant="body2">
              Profesorii oferă feedback detaliat, ajutând studenții să-și
              îmbunătățească lucrările.
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Testimonials Section */}
      <Card
        sx={{
          textAlign: "center",
          py: 5,
          borderRadius: 2,
          mb: 6,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Ce spun utilizatorii noștri
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                textAlign: "center",
                py: 3,
                px: 2,
                borderRadius: 2,
                boxShadow: 2,

                margin: 2,
              }}
            >
              <Avatar
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt="Professor"
                sx={{ width: 80, height: 80, mx: "auto" }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Dr. Ana Dumitrescu
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                "Acest sistem a schimbat complet modul în care colaborăm cu
                studenții. Este eficient și ușor de utilizat."
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                textAlign: "center",
                py: 3,
                px: 2,
                borderRadius: 2,
                boxShadow: 2,
                margin: 2,
              }}
            >
              <Avatar
                src="https://randomuser.me/api/portraits/men/39.jpg"
                alt="Student"
                sx={{ width: 80, height: 80, mx: "auto" }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Alex Ionescu
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                "M-a ajutat să-mi organizez proiectele și să primesc feedback
                rapid. Mi-a simplificat semnificativ munca."
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default AboutPage;
