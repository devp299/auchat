import { Button, Container, Paper, TextField, Typography, Stack, Avatar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import {CameraAlt as CameraAltIcon, ImageOutlined} from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import {useFileHandler, useInputValidation, useStrongPassword} from '6pp'
import { usernameValidator } from '../utils/validators';
import { bgGradient } from '../constants/color';


export default function Login() {
    const [isLogin,setIsLogin] = useState(true);

    const toggleLogin = () => setIsLogin((prev) => !prev)

    const name = useInputValidation("")
    const bio = useInputValidation("")
    const username = useInputValidation("",usernameValidator);
    const password = useStrongPassword();
    const avatar = useFileHandler("single");

    const handleLogin = (e) => {
        e.preventDefault();
    };
    const handleSignUp = (e) => {
        e.preventDefault();
    };
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
            isLogin ? (
                <>
            <Typography variant="h5">Login</Typography>
            <form style={{
                width: "100%",
                marginTop: "1rem",
                }}
                onSubmit={handleLogin}
            >
                <TextField required fullWidth label="Username" margin="dense" variant="outlined" value={username.value} onChange={username.changeHandler}/>
                <TextField required fullWidth label="Password" type="password" margin="dense" variant="outlined" value={password.value} onChange={password.changeHandler}/>

                <Button sx={{
                    marginTop: "0.7rem",
                }}variant="contained" color='primary' fullWidth type='submit'>
                    Login
                </Button>

                <Typography textAlign={"center"} m={"0.7rem"}>OR</Typography>
                <Button sx={{
                    marginTop: "-0.5rem"
                }}variant="text" fullWidth type='submit'
                onClick={toggleLogin}>Sign Up</Button>

            </form>
                </>
            ) : ( 
                <>
            <Typography variant="h5">Sign Up</Typography>
            <form style={{
                alignContent: "center",
                width: "100%",
                marginTop: "0.3rem",
                }}
                onSubmit={handleSignUp}
            >
                <Stack position={"relative"} width={"6rem"} margin={"auto"}>
                    <Avatar sx={{
                        width: "6rem",
                        height: "6rem",
                        objectFit: "contain",
                        }}
                        src={avatar.preview}
                    />
                    
                    <IconButton 
                        sx={{
                            height: "2rem",
                            width: "2rem",  
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                            color: "white",
                            bgcolor: "rgba(0,0,0,0.5)",
                            ":hover" : {
                                bgcolor: "rgba(0,0,0,0.7)"
                            }
                        }}
                        component="label"
                    >
                        <>
                            <CameraAltIcon />
                            <VisuallyHiddenInput type='file' onChange={avatar.changeHandler}/>
                        </>
                    </IconButton>
                </Stack>
                {
                    avatar.error && (
                        <Typography m={"0.3rem auto"} width={"fit-content"} display={"block"} color="error" variant="caption">
                            {avatar.error}
                        </Typography>
                    )
                    }
                <TextField required fullWidth label="Name" margin="dense" variant="outlined" value={name.value} onChange={name.changeHandler} />

                <TextField required fullWidth label="Bio" margin="dense" variant="outlined" value={bio.value} onChange={bio.changeHandler}/>
                <TextField required fullWidth label="Username" margin="dense" variant="outlined" value={username.value} onChange={username.changeHandler} />
                {
                    username.error && (
                        <Typography color="error" variant="caption">
                            {username.error}
                        </Typography>
                    )
                }
                <TextField required fullWidth label="Password" type="password" margin="dense" variant="outlined" value={password.value} onChange={password.changeHandler} />
                {
                    password.error && (
                        <Typography color="error" variant="caption">
                            {password.error}
                        </Typography>
                    )
                }
                <Button sx={{
                    marginTop: "0.7rem",
                }}variant="contained" color='primary' fullWidth type='submit'>
                    Sign Up
                </Button>

                <Typography textAlign={"center"} m={"0.7rem"}>OR</Typography>
                <Button sx={{
                    marginTop: "-0.5rem"
                }}variant="text" fullWidth type='submit' margin="dense"
                onClick={toggleLogin}>Login</Button>

            </form>
                </>
            )}
        </Paper>
  </Container>
  </div>
  )
}
