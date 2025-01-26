import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { lightTheme, darkTheme } from "./theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import HomePage from "./pages/HomePage";
import ProposeTopicPage from "./pages/ProposeTopicPage";
import AcceptTopicPage from "./pages/AcceptTopicPage";
import SupervisedThesisPage from "./pages/SupervisedThesisPage";
import EvaluateThesisPage from "./pages/EvaluateThesisPage";
import LoginPage from "./pages/LoginPage";

import { TopicsProvider, useTopics } from "./context/TopicsContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import SignUpPage from "./pages/SignUpPage";
import ThesisDetailsPage from "./pages/ThesisDetailsPage";
import ProfessorProposalsPage from "./pages/ProfessorProposalsPage";
import AboutPage from "./pages/AboutPage";
import AssignedThesisPage from "./pages/AssignedThesisPage";
import EditTopicPage from "./pages/EditTopicPage";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  /**
   * Navbar: Responsive AppBar with Drawer for smaller screens
   */
  const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const { topics } = useTopics();

    const userAssignedThesis = topics.find(
      (topic) => topic.authorId === currentUser?.id && topic.supervisorId
    );

    const renderMenuItems = () => (
      <List>
        <ListItem component={Link} to="/about" button>
          <ListItemText primary="Acasa" />
        </ListItem>

        <ListItem component={Link} to="/" button>
          <ListItemText primary="Teme" />
        </ListItem>
        {currentUser?.role === "student" && (
          <>
            {userAssignedThesis && (
              <ListItem component={Link} to="/propose-topic" button>
                <ListItemText primary="Propune Temă" />
              </ListItem>
            )}
            {userAssignedThesis && (
              <ListItem
                component={Link}
                to={`/thesis/${userAssignedThesis.id}`}
                button
              >
                <ListItemText primary="Tema Mea" />
              </ListItem>
            )}
          </>
        )}
        {(currentUser?.role === "teacher" ||
          currentUser?.role === "researcher") && (
          <>
            <ListItem component={Link} to="/supervised-thesis" button>
              <ListItemText primary="Lucrări Coordonate" />
            </ListItem>
            <ListItem component={Link} to="/professor-proposals" button>
              <ListItemText primary="Teme Propuse" />
            </ListItem>
            <ListItem component={Link} to="/propose-topic" button>
              <ListItemText primary="Propune Temă" />
            </ListItem>
            <ListItem component={Link} to="/accept-topic" button>
              <ListItemText primary="Acceptă Temă" />
            </ListItem>
            <ListItem component={Link} to="/evaluate" button>
              <ListItemText primary="Evaluează" />
            </ListItem>
          </>
        )}
      </List>
    );

    return (
      <AppBar position="static">
        <Toolbar>
          {/* Hamburger icon for mobile view */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Regular buttons for larger screens */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button color="inherit" component={Link} to="/about">
              Acasa
            </Button>
            <Button color="inherit" component={Link} to="/">
              Teme
            </Button>
            {currentUser?.role === "student" && (
              <>
                {!userAssignedThesis && (
                  <Button color="inherit" component={Link} to="/propose-topic">
                    Propune Temă
                  </Button>
                )}
                {userAssignedThesis && (
                  <Button
                    color="inherit"
                    component={Link}
                    to={`/thesis/${userAssignedThesis.id}`}
                  >
                    Tema mea
                  </Button>
                )}
              </>
            )}
            {(currentUser?.role === "teacher" ||
              currentUser?.role === "researcher") && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/supervised-thesis"
                >
                  Lucrări Coordonate
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/professor-proposals"
                >
                  Teme Propuse
                </Button>

                <Button color="inherit" component={Link} to="/propose-topic">
                  Propune Temă
                </Button>
                <Button color="inherit" component={Link} to="/accept-topic">
                  Acceptă Temă
                </Button>
                <Button color="inherit" component={Link} to="/evaluate">
                  Evaluează
                </Button>
              </>
            )}
          </Box>

          {/* Right-aligned user actions */}
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {!currentUser ? (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            ) : (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            )}
            <Button color="inherit" onClick={handleToggleTheme}>
              {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
            </Button>
          </Box>
        </Toolbar>

        {/* Drawer for mobile view */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {renderMenuItems()}
        </Drawer>
      </AppBar>
    );
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <BrowserRouter>
          <TopicsProvider>
            {/* AppBar */}
            <Navbar />

            {/* Container pt paginile efective, maxWidth="md" => centrare la ~960px */}
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/propose-topic" element={<ProposeTopicPage />} />
                <Route path="/accept-topic" element={<AcceptTopicPage />} />
                <Route
                  path="/professor-proposals"
                  element={<ProfessorProposalsPage />}
                />
                <Route path="/thesis/:id" element={<ThesisDetailsPage />} />
                <Route
                  path="/thesis-details/:id"
                  element={<ThesisDetailsPage />}
                />
                <Route path="/edit-thesis/:id" element={<EditTopicPage />} />

                <Route
                  path="/supervised-thesis"
                  element={<SupervisedThesisPage />}
                />
                <Route path="/evaluate" element={<EvaluateThesisPage />} />
              </Routes>
            </Container>
          </TopicsProvider>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
