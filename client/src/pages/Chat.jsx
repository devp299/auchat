import React, { Fragment, useRef } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material';
import { grayColor } from '../constants/color';
import { Send as SendIcon, AttachFile as AttachFileIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import { orange } from '../constants/color';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const user = {
  _id: "lshddkfhpr",
  name: "Dev Patel"
}

const Chat = () => {

  const containerRef = useRef(null);

  return (
  <Fragment>
  <Stack 
    ref={containerRef}
    boxSizing={"border-box"}
    padding={"1rem"}
    spacing={"1rem"}
    bgcolor={grayColor}
    height={"90%"}
    sx={{
      overflowX: "hidden",
      overflowY: "auto",
    }}
  >
{
  sampleMessage.map((i) => (
    <MessageComponent key={i._id} message={i} user={user}/>
  ))
}
  </Stack>
  <form 
    style={{
      height: "10%",
    }}
  >
    <Stack direction={"row"} height={"100%"} padding={"0.55rem"}
    alignItems={"center"} position={"relative"}
    >

      <IconButton sx={{
        position: "absolute",
        left: "1.2rem",
        rotate: "30deg",
      }}
      >
        <AttachFileIcon />
      </IconButton>

      <InputBox placeholder='Type Message Here...'/>
      
      <IconButton type='submit' 
        sx={{
          rotate: "-30deg",
          bgcolor: orange,
          color: "white",
          marginLeft:"1rem",
          padding: "0.5rem",
          "&:hover" : {
            bgcolor: "error.dark",
          }
        }}
      >
        <SendIcon />
      </IconButton>

    </Stack>

  </form>
  <FileMenu />
  </Fragment>
  );
};
export default AppLayout()(Chat);
