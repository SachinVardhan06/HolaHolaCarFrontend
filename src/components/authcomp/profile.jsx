import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  PhotoCamera as PhotoCameraIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../comp/themeprovider";
import { getUserProfile, updateProfile } from "../../context/api";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Removed duplicate declaration of pollingInterval

  const [profileData, setProfileData] = useState({
    full_name: "",
    bio: "",
    image: null,
    phone_number: "",
    address: "",
    gender: "",
    date_of_birth: "",
    driving_license: "",
    total_rides: 0,
    rating: 0,
    verification_status: "PENDING",
  });

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: darkMode ? "rgb(17, 24, 39)" : "rgb(249, 250, 251)",
      paddingTop: "7rem",
    },
    paper: {
      background: darkMode 
        ? "linear-gradient(to bottom, rgb(31, 41, 55), rgb(17, 24, 39))"
        : "white",
      boxShadow: darkMode
        ? "0 4px 20px rgba(0, 0, 0, 0.4)"
        : "0 4px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "1rem",
      border: darkMode ? "1px solid rgb(55, 65, 81)" : "none",
    },
    input: {
      background: darkMode ? "rgba(55, 65, 81, 0.5)" : "white",
      borderRadius: "0.5rem",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: darkMode ? "rgb(75, 85, 99)" : "rgb(209, 213, 219)",
        },
        "&:hover fieldset": {
          borderColor: darkMode ? "rgb(107, 114, 128)" : "rgb(156, 163, 175)",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#3B82F6",
        },
      },
      "& .MuiInputLabel-root": {
        color: darkMode ? "rgb(156, 163, 175)" : "rgb(107, 114, 128)",
      },
      "& .MuiInputBase-input": {
        color: darkMode ? "rgb(229, 231, 235)" : "rgb(17, 24, 39)",
      },
    },
    button: {
      background: darkMode 
        ? "linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235))"
        : "rgb(59, 130, 246)",
      color: "white",
      "&:hover": {
        background: darkMode 
          ? "linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216))"
          : "rgb(37, 99, 235)",
      },
    },
    statsCard: {
      background: darkMode 
        ? "linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235))"
        : "linear-gradient(135deg, rgb(96, 165, 250), rgb(59, 130, 246))",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      color: "white",
      boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
    },
    avatar: {
      border: `4px solid ${darkMode ? "rgb(55, 65, 81)" : "white"}`,
      boxShadow: `0 8px 24px ${darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"}`,
      borderRadius: "1rem",
      overflow: "hidden",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "scale(1.02)",
      },
    },
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserProfile();
  
      // Convert backend date format to input date format
      if (data.date_of_birth) {
        data.date_of_birth = new Date(data.date_of_birth)
          .toISOString()
          .split("T")[0];
      }
  
      setProfileData({
        ...data,
        rating: data.rating || 0,
        total_rides: data.total_rides || 0,
      });
    } catch (error) {
      setError("Failed to load profile");
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };
  
  const validateProfile = () => {
    const errors = [];
  
    if (!profileData.full_name?.trim()) {
      errors.push("Full name is required");
    }
  
    if (
      profileData.driving_license &&
      !/^[A-Z0-9-]{5,15}$/.test(profileData.driving_license)
    ) {
      errors.push("Invalid driving license format");
    }
  
    if (errors.length > 0) {
      toast.error(errors[0]);
      return false;
    }
  
    return true;
  };
  
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateProfile()) return;
  
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
  
      // Only append changed fields, excluding phone_number
      Object.keys(profileData).forEach((key) => {
        if (profileData[key] !== null && key !== "phone_number") {
          if (key === "image" && profileData[key] instanceof File) {
            formData.append("image", profileData[key]);
          } else if (key !== "image") {
            formData.append(key, String(profileData[key]));
          }
        }
      });
  
      const updatedProfile = await updateProfile(formData);
      setProfileData((prev) => ({
        ...prev,
        ...updatedProfile,
      }));
  
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const [pollingInterval, setPollingInterval] = useState(null);
  
  // Add useEffect for polling
  useEffect(() => {
    // Initial fetch
    fetchProfile();
  
    // Set up polling if status is PENDING
    if (profileData.verification_status === "PENDING") {
      const interval = setInterval(fetchProfile, 30000); // Poll every 30 seconds
      setPollingInterval(interval);
    }
  
    // Cleanup
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [profileData.verification_status]);
  
  // Update the Chip component's style
  const getStatusStyle = (status) => {
    switch (status) {
      case "VERIFIED":
        return {
          bgcolor: "success.light",
          "& .MuiChip-label": {
            color: "success.dark",
            fontWeight: "medium",
          },
        };
      case "REJECTED":
        return {
          bgcolor: "error.light",
          "& .MuiChip-label": {
            color: "error.dark",
            fontWeight: "medium",
          },
        };
      default:
        return {
          bgcolor: "warning.light",
          "& .MuiChip-label": {
            color: "warning.dark",
            fontWeight: "medium",
          },
        };
    }
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error("Image size should be less than 5MB");
        return;
      }
  
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
  
      setProfileData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };
  
  if (loading && !profileData.full_name) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  

  // ... Rest of your existing functions (fetchProfile, validateProfile, handleSubmit, etc.)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.container}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Paper sx={styles.paper}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                {/* Profile Header */}
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography variant="h4" sx={{ color: darkMode ? "white" : "primary.main" }}>
                        My Profile
                      </Typography>
                      <Chip
                        icon={
                          profileData.verification_status === "VERIFIED" ? (
                            <CheckCircleIcon />
                          ) : (
                            <WarningIcon />
                          )
                        }
                        label={profileData.verification_status}
                        sx={getStatusStyle(profileData.verification_status)}
                      />
                    </Box>
                    <Button
                      variant={darkMode ? "contained" : "outlined"}
                      startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                      onClick={() => isEditing ? handleSubmit() : setIsEditing(true)}
                      disabled={loading}
                      sx={styles.button}
                    >
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </Button>
                  </Box>
                  <Divider sx={{ my: 2, borderColor: darkMode ? "rgb(75, 85, 99)" : "rgb(229, 231, 235)" }} />
                </Grid>

                {/* Profile Image Section */}
                <Grid item xs={12} md={4}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar
                      src={profileData.image instanceof File ? URL.createObjectURL(profileData.image) : profileData.image}
                      sx={{
                        width: 200,
                        height: 200,
                        mb: 2,
                        ...styles.avatar
                      }}
                    />
                    {isEditing && (
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<PhotoCameraIcon />}
                        disabled={loading}
                        sx={styles.button}
                      >
                        Change Photo
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </Button>
                    )}
                  </Box>
                </Grid>

                {/* Profile Details */}
                <Grid item xs={12} md={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={profileData.full_name}
                        onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                        disabled={!isEditing || loading}
                        required
                        sx={styles.input}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={profileData.phone_number}
                        disabled={true}
                        helperText="Phone number cannot be changed"
                        sx={styles.input}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bio"
                        multiline
                        rows={3}
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        disabled={!isEditing || loading}
                        sx={styles.input}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Gender"
                        value={profileData.gender}
                        onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                        disabled={!isEditing || loading}
                        SelectProps={{ native: true }}
                        sx={styles.input}
                      >
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Date of Birth"
                        type="date"
                        value={profileData.date_of_birth || ""}
                        onChange={(e) => setProfileData({...profileData, date_of_birth: e.target.value})}
                        disabled={!isEditing || loading}
                        InputLabelProps={{ shrink: true }}
                        sx={styles.input}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        disabled={!isEditing || loading}
                        sx={styles.input}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Driving License"
                        value={profileData.driving_license}
                        onChange={(e) => setProfileData({...profileData, driving_license: e.target.value})}
                        disabled={!isEditing || loading}
                        helperText="Format: XXXXX-XXXXX-XXXXX"
                        sx={styles.input}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Stats Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 4, borderColor: darkMode ? "rgb(75, 85, 99)" : "rgb(229, 231, 235)" }} />
                  <Typography variant="h6" sx={{ color: darkMode ? "white" : "text.primary", mb: 3 }}>
                    Stats
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                      <Box sx={styles.statsCard}>
                        <Typography variant="h4" fontWeight="bold">
                          {profileData.total_rides}
                        </Typography>
                        <Typography>Total Rides</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={styles.statsCard}>
                        <Typography variant="h4" fontWeight="bold">
                          {profileData.rating.toFixed(1)}
                        </Typography>
                        <Typography>Rating</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </motion.div>
  );
}
export default Profile;