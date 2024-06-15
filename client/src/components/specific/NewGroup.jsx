import { Dialog,Button, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';

const NewGroup = () => {

  const groupName = useInputValidation("")
  const [members,setMembers] = useState(sampleUsers)
  const [selectedmembers,setSelectedMembers] = useState([]);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => [...prev,id])
    console.log()
  }
  const submitHandler = () => {

  }
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "1.6rem" }} width={"25rem"} spacing={"0.5rem"}>
        <DialogTitle textAlign="center" variant='h5'>New Group</DialogTitle>
        <TextField size={"medium"} label={"Group Name"} value={groupName.value} onChange={groupName.changeHandler}/>
        <Typography variant='body1'>Members</Typography>
        <Stack>
          {
            members.map((i) => (
              <UserItem 
                user={i} 
                key={i._id}
                handler={selectMemberHandler} 

              />
            ))
          }
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant='text' color='error' size='small'>Cancel</Button>
          <Button variant='contained' onClick={submitHandler}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup
