import { Dialog,Button, DialogTitle, Stack, TextField, Typography, Skeleton } from '@mui/material'
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';
import { useDispatch, useSelector } from 'react-redux';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { setIsNewGroup } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';

const NewGroup = () => {

  const { isNewGroup } = useSelector((state) => state.misc)
  const dispatch = useDispatch()
  const {isError,isLoading,error,data} = useAvailableFriendsQuery()
  const [newGroup, isLoadingNewGroup ] = useAsyncMutation(useNewGroupMutation)
  const groupName = useInputValidation("")
  
  const [selectedMembers,setSelectedMembers] = useState([]);

  const errors = [{
    isError,
    error,
  }]
  useErrors(errors)

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => (prev.includes(id)? prev.filter((currElement) => currElement !== id ) : [...prev,id]))
    console.log()
  }
  
  const submitHandler = () => {
    if(!groupName.value) return toast.error("Group name is required")
    if(selectedMembers.length < 2){
      return toast.error("Please select atleast 2 Members");
    }
    newGroup("Creating New Group...",{ name: groupName.value, members: selectedMembers })
    // Creating group
    closeHandler();
  }

  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  }
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "1.6rem" }} width={"25rem"} spacing={"0.5rem"}>
        <DialogTitle textAlign="center" variant='h5'>New Group</DialogTitle>
        <TextField size={"medium"} label={"Group Name"} value={groupName.value} onChange={groupName.changeHandler}/>
        <Typography variant='body1'>Members</Typography>
        <Stack>
          { isLoading ? (<Skeleton />) :(
            data?.friends?.map((i) => (
              <UserItem 
                user={i} 
                key={i._id}
                handler={selectMemberHandler} 
                isAdded={selectedMembers.includes(i._id)}
              />
            )))
          }
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant='text' color='error' size='small' onClick={closeHandler}>Cancel</Button>
          <Button variant='contained' onClick={submitHandler} disabled={isLoadingNewGroup}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup
