import React, { useState, useContext, useEffect } from "react";
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
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import {
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import login from "../../assets/login.gif";

// Add this theme configuration after the imports
const theme = createTheme({
  palette: {
    primary: {
      main: "#166534",
      light: "#16a34a",
      dark: "#14532d",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#4b5563",
      light: "#9ca3af",
      dark: "#1f2937",
      contrastText: "#ffffff"
    },
    error: {
      main: "#dc2626",
      light: "#ef4444",
      dark: "#991b1b"
    },
    background: {
      default: "#ffffff",
      paper: "#f9fafb"
    }
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h3: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.01em"
    },
    h4: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.3
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.6
    },
    button: {
      textTransform: "none",
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          fontSize: "1rem",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "#f8fafc",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "#f1f5f9"
            },
            "&.Mui-focused": {
              backgroundColor: "#ffffff",
              boxShadow: "0 0 0 2px rgba(22, 101, 52, 0.2)"
            }
          }
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          "&::before, &::after": {
            borderColor: "rgba(0, 0, 0, 0.08)"
          }
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    "none",
    "0 1px 2px rgba(0,0,0,0.05)",
    // ...add more shadows if needed
    "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)"
  ]
});

const providers = [
  { id: "github", name: "GitHub", icon: <GitHubIcon /> },
  { id: "google", name: "Google", icon: <GoogleIcon /> },
];

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  useEffect(() => {
    // Check for remembered email
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setCredentials(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }

    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const validateForm = () => {
    if (!credentials.email || !credentials.password) {
      setError("Please fill in all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (credentials.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid credentials");
      }

      // Store tokens
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem("email", credentials.email);
      } else {
        localStorage.removeItem("email");
      }

      // Store user data
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Update auth context
      if (handleLogin) {
        await handleLogin(data.user);
      }

      toast.success(`Welcome back, ${data.user.username}!`);
      navigate("/home");
      setTimeout(() => {
        window.location.reload(); 
      },);
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`${provider} login coming soon!`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  return (
    <div className="mt-24">
    <ThemeProvider theme={theme}>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={6}
          sx={{
            backgroundImage: `url(${login})`,
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
              background: "linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(22,101,52,0.4) 100%)",
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
              Welcome Back!
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
              Login to your account and start your journey
            </Typography>
          </Box>
        </Grid>

        {/* Right side - Form */}
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
                Sign In
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
                    onClick={() => handleSocialLogin(provider.name)}
                    startIcon={provider.icon}
                    color="secondary"
                    disabled={loading}
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

              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth
                  label="Email address"
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  disabled={loading}
                  error={Boolean(error && error.toLowerCase().includes("email"))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  disabled={loading}
                  error={Boolean(error && error.toLowerCase().includes("password"))}
                  sx={{ mb: 3 }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="primary"
                        disabled={loading}
                      />
                    }
                    label="Remember me"
                  />
                  <MuiLink
                    component={Link}
                    to="/forgot-password"
                    sx={{
                      color: "primary.main",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Forgot password?
                  </MuiLink>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
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
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 4, opacity: 0.8 }}
              >
                Don't have an account?{" "}
                <MuiLink
                  component={Link}
                  to="/register"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Sign up
                </MuiLink>
              </Typography>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
  );
};

export default Login;