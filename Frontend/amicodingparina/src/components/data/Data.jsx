import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Box, Button, Card, CardContent, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const Data = () => {
    const state = useSelector(state => state);

    const [dateValue, setDateValue] = useState({
        startTime: null,
        endTime: null,
    })

    const [data, setData] = useState(null);



    const handleSubmit = (event) => {
        axios.get(`http://127.0.0.1:8000/api/data/user/userdata/${dateValue.startTime}/${dateValue.endTime}/`, {
             headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${state.token}`
             }
          })
          .then(response => {
            console.log(response)
            if(response.status === 200){
                setData(response.data)
            }
          })
          .catch(err => console.log(err))
        event.preventDefault();
      };



  if(state.isAuthenticated){
    return (
        <Box sx={{ marginTop: "100px", width: "100%" }}>
            <Card sx={{ maxWidth: 450, margin: "0 auto" }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid xs={12} item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker 
                                    label="Enter start date and time" 
                                    name="startTime"
                                    fullWidth 
                                    required 
                                    value={dateValue.startTime}
                                    onChange={(e)=>setDateValue((prevState) => ({ ...prevState, "startTime": e.toISOString() }))}
                                />
    
                                <DateTimePicker 
                                    label="Enter end date and time" 
                                    name="endTime"
                                    fullWidth 
                                    required 
                                    value={dateValue.endTime}
                                    onChange={(e)=>setDateValue((prevState) => ({ ...prevState, "endTime": e.toISOString() }))}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        </Grid>
                        <Grid xs={12} item>
                            <Button type='submit' variant='contained' fullWidth>Get Data</Button>
                        </Grid>
                        
                    </Grid>
                    </form>
                </CardContent>
            </Card>
    
            <br /><br /><br />
    
            {
                data !== null && (
                    <Box>
                        <hr /><br /><br /><br />
                        <Card sx={{ maxWidth: 450, margin: "0 auto" }}>
                            <CardContent>
                                <Box>
                                    <h3>Status: { data.status }</h3>
                                    <h3>User Id: { `${data.user.id}` }</h3>
                                    {
                                        data.payload.map(value => {
                                            return (
                                                <ul>
                                                    <li>Timestamp: {value.timestamp}</li>
                                                    <li>Input Values: {value.input_values}</li>
                                                </ul>
                                            )
                                        })
                                    }
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                )
            }
            
        </Box>
    )
  } else {
    return <Navigate to={'/login'} replace />
  }
}

export default Data