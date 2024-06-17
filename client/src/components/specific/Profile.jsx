import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalenderIcon} from '@mui/icons-material'
import moment from "moment";

const Profile = () => {
  return (
    <Stack spacing={"1rem"} direction={"column"} alignItems={"center"}>
        <Avatar 
          sx={{
            width: 120,
            height: 120,
            objectFit: "contain",
            marginBottom: "0.5rem",
            border: "5px solid white",
          }}
        />
        <ProfileCard heading={"Bio"} text={"sadas dasdasd anssdasdsd sad"}/>
        <ProfileCard heading={"Username"} text={"medevadhi"} Icon={<UserNameIcon />}/>
        <ProfileCard heading={"Name"} text={"Dev Patel"} Icon={<FaceIcon />}/>
        <ProfileCard heading={"Joined"} text={moment(Date.now()).fromNow()} Icon={<CalenderIcon />}/>
    </Stack>
  )
}

const ProfileCard = ({ text, Icon, heading}) => 
    <Stack 
      direction={"row"} 
      alignItems={"center"} 
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
      >
        {Icon && Icon}

        <Stack>
          <Typography variant='body1'>{text}</Typography>
          <Typography color={"gray"} variant='caption'>{heading}</Typography>
        </Stack>
      </Stack>

export default Profile