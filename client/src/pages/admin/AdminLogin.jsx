import { Button, Container, Paper, TextField, Typography, Stack, Avatar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import {CameraAlt as CameraAltIcon, ImageOutlined} from '@mui/icons-material'

import {useFileHandler, useInputValidation, useStrongPassword} from '6pp'
import { bgGradient } from '../../constants/color'
import { VisuallyHiddenInput } from '../../components/styles/StyledComponents'
import { Navigate } from 'react-router-dom'


const isAdmin = true;
const AdminLogin = () => {

  const secretKey = useInputValidation("");

  const submitHandler = (e) =>  {
      e.preventDefault();
  console.log("submit");
  } 
  if(isAdmin) return <Navigate to="/admin/dashboard" /> 
  return (
    <div style={
        {
            backgroundImage: bgGradient,
            overflowY: "scroll"
            
        }
    }>
    <Container component={"main"} maxWidth={'xs'} sx={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}>
    <Paper 
        elevation={3} 
        sx={{ 
            padding: 4, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center"
       }}
    >
        {
            <>
            <Typography variant="h5">Admin Login</Typography>
            <form style={{
                width: "100%",
                marginTop: "1rem",
                }}
                onSubmit={submitHandler}
            >
                <TextField required fullWidth label="Secret Key" type="password" margin="dense" variant="outlined" value={secretKey.value} onChange={secretKey.changeHandler}/>

                <Button sx={{
                    marginTop: "0.7rem",
                }}variant="contained" color='primary' fullWidth type='submit'>
                    Login
                </Button>

            </form>
            </>
            }
        </Paper>
  </Container>
  </div>
  )
}

export default AdminLogin
