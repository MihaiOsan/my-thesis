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
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // ← Hook pentru navigare

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login cu email/parolă
  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      // După login reușit, navigăm spre HomePage
      navigate("/");
    } else {
      alert("Email sau parolă incorecte!");
    }
  };

  // (Mock) login cu Google
  const handleGoogleLogin = () => {
    alert("Autentificare cu Google (mock)!");
  };

  // (Mock) login cu Facebook
  const handleFacebookLogin = () => {
    alert("Autentificare cu Facebook (mock)!");
  };

  // (Mock) login cu GitHub
  const handleGitHubLogin = () => {
    alert("Autentificare cu GitHub (mock)!");
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
          <Avatar sx={{ width: 90, height: 90 }}>
            <PersonIcon sx={{ fontSize: 52 }} />
          </Avatar>

          <Typography variant="h4" gutterBottom>
            Autentificare
          </Typography>

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
            // onSubmit cu preventDefault, ca sa folosim handleLogin direct
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
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

            <Button type="submit" variant="contained" size="large" fullWidth>
              Login
            </Button>
          </Box>

          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Sau autentifică-te prin:
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
              onClick={handleGoogleLogin}
              fullWidth
            >
              Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={handleFacebookLogin}
              fullWidth
            >
              Facebook
            </Button>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              onClick={handleGitHubLogin}
              fullWidth
            >
              GitHub
            </Button>
          </Stack>

          <Divider sx={{ width: "100%", maxWidth: 400, my: 2 }} />

          <Typography variant="body2">
            Nu ai cont?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Creează unul!
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
