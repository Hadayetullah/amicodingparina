import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const state = useSelector(state => state);
  const [message, setMessage] = useState(null);
  const [formState, setFormState] = useState({ array: "", search_value: "" });
  const [isSubmitted, setIsSubmitted] = useState(0);
  const [errors, setErrors] = useState({});

  const [successMsg, setSuccessMsg] = useState(null);


  useEffect(()=> {
    const validationErrors = validate(formState);
    if(isSubmitted !== 0 && message === null){
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      }
    }
  }, [formState !== "" || formState !== null]);



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(value !== ""){
      if(!isNaN(value[0].trim())){
        setFormState((prevState) => ({ ...prevState, [name]: value }));
      }
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  

  const handleSubmit = (event) => {
    const validationErrors = validate(formState);
    if (Object.keys(validationErrors).length > 0 && validationErrors.search_value !== null) {
      setErrors(validationErrors);
      setIsSubmitted(1);
    } else {
      if(state.isAuthenticated) {
        const formObj = {};
        const token = state.token;
        const userId = state.userId;
        formObj.user = userId;
        formObj.array_value = formState.array
        formObj.search_value = formState.search_value

        // console.log("State: ",state)

          axios.post(`http://127.0.0.1:8000/api/dashboard/user/input/`, formObj, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
          .then(response=> {
            console.log(response)
            if(response.status === 201){
              setSuccessMsg(response.data.result);
              setFormState({ array: "", search_value: "" })
            }
          })
          .catch(err=> console.log(err))
      } else {
        return <Navigate to={'/login'} replace />
      }
    }
    event.preventDefault();
  };

  const removeLeadingAndTrailingCommas = (inputValue) => {
    const withoutLeadingComma = inputValue.replace(/^,\s*/, ''); // Remove leading comma and spaces
    const withoutTrailingComma = withoutLeadingComma.replace(/,\s*$/, ''); // Remove trailing comma and spaces
    return withoutTrailingComma;
  
  }

  const isNumber = (value) => !isNaN(parseInt(value) && isFinite(value))

  const checkInputValue = (data) => {
    const values = removeLeadingAndTrailingCommas(data).split(',').map(value => value.replace(/\s/g, ''));
    // console.log(values.every(value => isNumber(value)))
    return values.every(value => isNumber(value))
  }

  const validate = (formData) => {
    let errors = {};

    if (!formData.array) {
      errors.array = "The field is empty!";
    } else if (!checkInputValue(formData.array)) {
        errors.array = "Invalid Input!";
    } else if(!formData.search_value) {
      errors.search_value = "The field is empty!";
    } else if(!isNumber(formData.search_value)) {
      errors.search_value = "Invalid Input!";
    } else {
      errors.search_value = null;
    }

    return errors;
  };


  
  const msg = (
    <Button variant="outlined" fullWidth sx={{ marginBottom: "10px", fontSize: "17px" }}>
        <Typography textAlign={"center"} variant='p'>{`${successMsg}`}</Typography>
    </Button>
  )

  
  if(state.isAuthenticated){
    return (
      <Box sx={{ marginTop: "100px", width: "100%" }}>
        
        <Box sx={{ maxWidth: 450, margin: "0 auto", height: 100 }}>
            {successMsg !== null && msg}
        </Box>
  
        <Card sx={{ maxWidth: 450, margin: "0 auto" }}>
            <CardContent>
                {/* <Typography textAlign={"center"} gutterBottom marginBottom={3} variant='h6' component="p">
                  Enter comma separated integer values
                </Typography> */}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid xs={12} item>
                            <TextField 
                              onChange={handleInputChange} 
                              name="array" value={formState.array} 
                              type={"text"} label="Input Values" 
                              placeholder='Enter comma separated integer values' 
                              variant='outlined' 
                              fullWidth 
                              required 
                              error={errors.array && true} 
                              helperText={errors.array} 
                            />
                            <br /><br />
                            <TextField 
                              onChange={handleInputChange} 
                              name="search_value" value={formState.search_value} 
                              type={"text"} label="Search Value" 
                              placeholder='Enter an integer value' 
                              variant='outlined' 
                              fullWidth 
                              required 
                              error={errors.search_value && true} 
                              helperText={errors.search_value} 
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <Button type='submit' variant='contained' fullWidth>Khoj</Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
      </Box>
    )
  } else {
    return <Navigate to={'/login'} replace />
  }
}

export default Dashboard