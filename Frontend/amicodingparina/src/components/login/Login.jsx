import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Button, Card, CardContent, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { authDetails, loading } from '../../redux/actionCreators';


const Login = () => {

  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(0)

  useEffect(()=> {
    const validationErrors = validate(formState);
    if(isSubmitted !== 0 && message === null){
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      }
    }
  }, [formState]);

  const [errors, setErrors] = useState({});

  // console.log("Errors: ", errors);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    const validationErrors = validate(formState);
    if (Object.keys(validationErrors).length > 0 && validationErrors.password !== null) {
      setErrors(validationErrors);
      setIsSubmitted(1);
    } 
    else {
      dispatch(loading(true))
      axios.post("http://127.0.0.1:8000/api/auth/user/login/", formState, {
         headers: {
          "Content-Type": "application/json"
         }
      })
      .then(response=> {
        // console.log("Login Response: ",response)
        if(response.status === 200){
          // setMessage(response.data.msg);
          setFormState({
            email: "",
            password: "",
          })
          dispatch(loading(false))

          dispatch(authDetails(response.data.token.access))
        }
      })
      .catch(err=> console.log(err))
    }
    event.preventDefault();
  };

  const validate = (formData) => {
    let errors1 = {};

    if (!formData.email) {
      errors1.email = "Please provide email address";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      errors1.email = "Invalid email address";
    }

    else if (!formData.password) {
      errors1.password = "Please provide password";
    } else if (formData.password.length < 8) {
      errors1.password = "Password must be at least 8 character";
    } else {
      errors1.password = null;
    }
    return errors1;
  };


  
  const msg = (
    <Button variant="outlined" fullWidth sx={{ marginBottom: "10px", fontSize: "17px" }}>
        <Typography textAlign={"center"} variant='p'>{message}</Typography>
    </Button>
  )

  // const errMsg = (
  //   <Button variant="outlined" color="error" fullWidth sx={{ marginBottom: "10px", fontSize: "17px" }}>
  //       <Typography textAlign={"center"} variant='p'>{message}</Typography>
  //   </Button>
  // )
  


  if(state.isAuthenticated){
    return <Navigate to={'/dashboard'} replace />
    // navigate('/dashboard')
  } else {
    return (
      <Box sx={{ marginTop: "100px" }}>
  
        <Box sx={{ maxWidth: 450, margin: "0 auto" }}>
            {message && msg}
        </Box>
  
        <Card sx={{ maxWidth: 450, margin: "0 auto" }}>
            <CardContent>
                <Typography textAlign={"center"} variant='h4'>Login</Typography>
                <Typography textAlign={"center"} gutterBottom marginBottom={3} variant='body2' component="p">Provide necessary information</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid xs={12} item>
                            <TextField 
                              onChange={handleInputChange} 
                              name="email" value={formState.email} 
                              type={"email"} label="Email Address" 
                              placeholder='Enter email address' 
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
                            <Button type='submit' variant='contained' fullWidth>Login</Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
      </Box>
    );
  }
};

export default Login