import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  Grid,
  Link as MuiLink,
} from "@mui/material";
import {
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import holasignup from "../../assets/holasignup.gif";

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#166534",
      light: "#16a34a",
      dark: "#14532d",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
    h3: {
      fontWeight: 800,
      letterSpacing: "-0.5px",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.3px",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "#f8fafc",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#f1f5f9",
            },
            "&.Mui-focused": {
              backgroundColor: "#ffffff",
              boxShadow: "0 0 0 3px rgba(22, 101, 52, 0.1)",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          fontSize: "1rem",
          padding: "12px 24px",
          transition: "all 0.3s ease",
        },
      },
    },
  },
});

const providers = [
  { id: "github", name: "GitHub", icon: <GitHubIcon /> },
  { id: "google", name: "Google", icon: <GoogleIcon /> },
];

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    phone_number: "",
  });

  const validateForm = () => {
    if (!userData.username.trim()) {
      toast.error("Username is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (userData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    if (userData.password !== userData.password2) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!/^\d{10}$/.test(userData.phone_number)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    const formData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password2: userData.password2, // Adding password confirmation
      phone_number: userData.phone_number,
    };

    try {
      const response = await fetch(
        "https://holaholacarbackend-5.onrender.com/api/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include", // Include cookies if needed
        }
      );

      if (!response.ok) {
        const data = await response.json();
        // Handle different types of error responses
        if (data.username) {
          throw new Error(data.username[0]);
        } else if (data.email) {
          throw new Error(data.email[0]);
        } else if (data.password) {
          throw new Error(data.password[0]);
        } else if (data.detail) {
          throw new Error(data.detail);
        } else {
          throw new Error("Registration failed");
        }
      }

      const data = await response.json();
      toast.success("Registration successful! Please verify your email.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    toast.info(`${provider} registration coming soon!`);
  };

  return (
    <div className="mt-24">
      <ThemeProvider theme={theme}>
        <Grid container sx={{ minHeight: "100vh" }}>
          {/* Left Side - Image */}
          <Grid
            item
            xs={false}
            sm={6}
            sx={{
              backgroundImage: `url(${holasignup})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: { xs: "none", sm: "block" },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(22,101,52,0.4) 100%)",
                backdropFilter: "brightness(1.1)",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                padding: 4,
                zIndex: 1,
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                align="center"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  mb: 3,
                  fontSize: { sm: "2.5rem", md: "3rem" },
                }}
              >
                Join HolaHolaCar
              </Typography>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  maxWidth: "80%",
                  letterSpacing: "0.5px",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                  opacity: 0.9,
                }}
              >
                Create your account and start your journey with us
              </Typography>
            </Box>
          </Grid>

          {/* Right Side - Form */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: { xs: 3, md: 8 },
                backgroundColor: "white",
              }}
            >
              <Container maxWidth="xs">
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  color="primary"
                  sx={{ mb: 1 }}
                >
                  Create Account
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                  sx={{ mb: 4, opacity: 0.8 }}
                >
                  Join our community today
                </Typography>

                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: "12px",
                      backgroundColor: "rgba(211, 47, 47, 0.05)",
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  {providers.map((provider) => (
                    <Button
                      key={provider.id}
                      variant="outlined"
                      fullWidth
                      startIcon={provider.icon}
                      color="secondary"
                      onClick={() => handleSocialRegister(provider.name)}
                      sx={{
                        py: 1.5,
                        borderWidth: 1.5,
                        "&:hover": {
                          borderColor: "primary.main",
                          backgroundColor: "rgba(22, 101, 52, 0.04)",
                          borderWidth: 1.5,
                        },
                      }}
                    >
                      {provider.name}
                    </Button>
                  ))}
                </Box>

                <Divider sx={{ my: 4 }}>or continue with email</Divider>

                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="username"
                    value={userData.username}
                    onChange={(e) =>
                      setUserData({ ...userData, username: e.target.value })
                    }
                    margin="normal"
                    required
                    disabled={loading}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email address"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    margin="normal"
                    required
                    disabled={loading}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone_number"
                    type="tel"
                    value={userData.phone_number}
                    onChange={(e) =>
                      setUserData({ ...userData, phone_number: e.target.value })
                    }
                    margin="normal"
                    required
                    disabled={loading}
                    inputProps={{
                      maxLength: 10,
                      pattern: "[0-9]*",
                    }}
                    helperText="Enter 10-digit phone number"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    margin="normal"
                    required
                    disabled={loading}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="password2"
                    type="password"
                    value={userData.password2}
                    onChange={(e) =>
                      setUserData({ ...userData, password2: e.target.value })
                    }
                    margin="normal"
                    required
                    disabled={loading}
                    sx={{ mb: 3 }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      py: 1.8,
                      backgroundColor: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 8px rgba(22, 101, 52, 0.2)",
                      },
                    }}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>

                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 4, opacity: 0.8 }}
                  >
                    Already have an account?{" "}
                    <MuiLink
                      component={Link}
                      to="/login"
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Sign in
                    </MuiLink>
                  </Typography>
                </form>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default RegisterForm;
