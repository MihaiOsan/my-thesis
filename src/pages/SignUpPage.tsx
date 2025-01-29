import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LanguageIcon from "@mui/icons-material/Language"; // ex. Google placeholder
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

const SignUpPage: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  // State pentru datele de înregistrare
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // rol implicit

  // handleSignUp: apelează signUp din AuthContext și redirecționează dacă are succes
  const handleSignUp = async () => {
    if (!name || !email || !password || !role) {
      alert("Te rugăm să completezi toate câmpurile!");
      return;
    }

    const success = await signUp(name, email, password, role);
    if (success) {
      navigate("/");
    } else {
      alert("Email-ul există deja sau a apărut o eroare!");
    }
  };

  // Opțiuni de sign up mock (Google, Facebook, GitHub)
  const handleGoogleSignUp = () => {
    alert("Înregistrare cu Google (mock)!");
  };
  const handleFacebookSignUp = () => {
    alert("Înregistrare cu Facebook (mock)!");
  };
  const handleGitHubSignUp = () => {
    alert("Înregistrare cu GitHub (mock)!");
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 12 }}>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 5,
            px: 4,
            gap: 3,
          }}
        >
          {/* Avatar cu un icon PersonAdd pentru "Sign Up" */}
          <Avatar sx={{ width: 90, height: 90 }}>
            <PersonAddIcon sx={{ fontSize: 52 }} />
          </Avatar>

          <Typography variant="h4" gutterBottom>
            Creare cont
          </Typography>

          {/* Formular pt date de bază (nume, email, parolă, rol) */}
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              maxWidth: 400,
              marginX: "auto",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            <TextField
              label="Nume complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Parolă"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />

            <FormControl fullWidth required>
              <InputLabel id="role-select-label">Rol</InputLabel>
              <Select
                labelId="role-select-label"
                value={role}
                label="Rol"
                onChange={(e) => setRole(e.target.value as string)}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Profesor</MenuItem>
                <MenuItem value="researcher">Cercetător</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" size="large" fullWidth>
              Înregistrează-te
            </Button>
          </Box>

          {/* Sau, cont cu Google/Facebook/GitHub (mock) */}
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Sau creează un cont prin:
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            sx={{ width: "100%", maxWidth: 400, marginX: "auto" }}
          >
            <Button
              variant="outlined"
              startIcon={<LanguageIcon />}
              onClick={handleGoogleSignUp}
              fullWidth
            >
              Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={handleFacebookSignUp}
              fullWidth
            >
              Facebook
            </Button>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              onClick={handleGitHubSignUp}
              fullWidth
            >
              GitHub
            </Button>
          </Stack>

          <Divider sx={{ width: "100%", maxWidth: 400, my: 2 }} />

          <Typography variant="body2">
            Ai deja cont?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Autentifică-te!
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignUpPage;
