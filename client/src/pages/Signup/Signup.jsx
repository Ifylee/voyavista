// client/src/pages/Signup/Signup.jsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutation";
import Auth from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";
import "../../assets/styles/AuthForm.css";

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [addUser, { error }] = useMutation(ADD_USER);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    // Basic email validation
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
      navigate("/");
    } catch (e) {
      console.error(e);
      setErrorMessage("Error signing up. Please try again.");
    }
  };

  return (
    <Container className="auth-container">
      <br></br>
      <video autoPlay loop muted className="background-video">
        <source
          src="https://coding-videos-bucket.s3.us-east-2.amazonaws.com/login-background.mp4"
          type="video/mp4"
        />
      </video>
      <Box
        className="auth-form"
        component="form"
        onSubmit={handleFormSubmit}
        noValidate
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Signup
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="firstName"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lastName"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign Up
        </Button>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Link to="/login">Already have an account? Login</Link>
      </Box>
    </Container>
  );
};

export default Signup;
