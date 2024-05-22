import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Box, Button, Card, CardContent, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { loading } from '../../redux/actionCreators';


const Registration = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(0);

  useEffect(()=> {
    const validationErrors = validate(formState);
    if(isSubmitted !== 0 && message === null){
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      }
    }
  }, [formState]);

  const [errors, setErrors] = useState({});


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    const validationErrors = validate(formState);
    // console.log(validationErrors)
    if (Object.keys(validationErrors).length > 0 && validationErrors.password2 !== null) {
      setErrors(validationErrors);
      setIsSubmitted(1);
    } 
    else {
      dispatch(loading(true))
      axios.post("http://127.0.0.1:8000/api/auth/user/registration/", formState, {
         headers: {
          "Content-Type": "application/json"
         }
      })
      .then(response=> {
        console.log("Response: ",response)
        if(response.status === 201){
          dispatch(loading(false))
          setMessage(response.data.msg);
          setFormState({
            name: "",
            email: "",
            phone: "",
            password: "",
            password2: "",
          })
        }
      })
      .catch(err => console.log("Err: ",err))
    }
    event.preventDefault();
  };

  const validate = (formData) => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Please provide your name";
    } else if (formData.name.length <= 3) {
      errors.name = "Your name must contain 3 letters";
    }

    if (!formData.phone) {
      errors.phone = "Please provide your phone number";
    } else if (
      !/(^(\+88|88)?(01){1}[3456789]{1}(\d){8})$/.test(formData.phone)
    ) {
      errors.phone = "Invalid phone number";
    }

    if (!formData.email) {
      errors.email = "Please provide your email address";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Please provide password";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (!formData.password2) {
      errors.password2 = "Please provide confirm password";
    } else if (formData.password2 != formData.password) {
      errors.password2 = "Password doesn't match";
    } else {
      errors.password2 = null;
    }

    return errors;
  };


  const msg = (
    <Button variant="outlined" fullWidth sx={{ marginBottom: "10px", fontSize: "17px" }}>
        <Typography textAlign={"center"} variant='p'>{message}</Typography>
    </Button>
  )


  return (
    <Box sx={{ marginTop: "60px" }}>

      <Box sx={{ maxWidth: 450, margin: "0 auto" }}>
          {message && msg}
      </Box>

      <Card sx={{ maxWidth: 450, margin: "0 auto" }}>
          <CardContent>
          <Typography textAlign={"center"} variant='h4'>Register</Typography>
          <Typography textAlign={"center"} gutterBottom marginBottom={3} variant='body2' component="p">Register to apply for a job</Typography>
            <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid xs={12} item>
                            <TextField 
                              onChange={handleInputChange} 
                              name="name" value={formState.name} 
                              type={"text"} label="Your Name" 
                              placeholder='Enter your name' 
                              variant='outlined' 
                              fullWidth 
                              required 
                              error={errors.name && true} 
                              helperText={errors.name} 
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField 
                              onChange={handleInputChange} 
                              name="email" value={formState.email} 
                              type={"email"} label="Email" 
                              placeholder='Enter your email' 
                              variant='outlined' 
                              fullWidth 
                              required 
                              error={errors.email && true}
                              helperText={errors.email}
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField 
                              onChange={handleInputChange} 
                              name="phone" value={formState.phone} 
                              type={"text"} label="Phone Number" 
                              placeholder='Enter your phone number' 
                              variant='outlined' 
                              fullWidth 
                              required 
                              error={errors.phone && true} 
                              helperText={errors.phone} 
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField 
                              onChange={handleInputChange} 
                              name="password" value={formState.password} 
                              type={"password"} label="Password" 
                              placeholder='Enter password' 
                              variant='outlined' 
                              fullWidth 
                              required 
                              error={errors.password && true} 
                              helperText={errors.password} 
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField 
                              onChange={handleInputChange} 
                              name="password2" value={formState.password2} 
                              type={"password"} label="Confirm password" 
                              placeholder='Enter confirm password' 
                              variant='outlined' 
                              fullWidth 
                              required 
                              error={errors.password2 && true} 
                              helperText={errors.password2} 
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <Button type='submit' variant='contained' fullWidth>Register</Button>
                        </Grid>
                    </Grid>
            </form>
          </CardContent>
      </Card>
    </Box>
  )
}

export default Registration