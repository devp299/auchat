import React, { Suspense, lazy, memo, useEffect, useState } from 'react';
import {Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Menu, Stack, TextField, Tooltip, Typography} from '@mui/material';
// import { orange } from '@mui/material/colors';
import { Edit as EditIcon, Menu as MenuIcon, KeyboardBackspace as KeyboardBackspaceIcon, Done as DoneIcon, Delete as DeleteIcon, Add as AddIcon} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom'; 
import { Link } from '../components/styles/StyledComponents';
import AvatarCard from '../components/shared/AvatarCard';
import { sampleChats, sampleUsers } from '../constants/sampleData';
import UserItem from '../components/shared/UserItem';
import { bgGradient } from '../constants/color';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { LayoutLoader } from '../components/layout/Loaders';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../redux/reducers/misc';

const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"))
const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"))

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isAddMember} = useSelector((state) => state.misc)

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true},
    { skip: !chatId}    
  );

  const [updateGroup,isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation)

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation)

  const [deleteGroup, isLoadingDeleteGroup ] = useAsyncMutation(useDeleteChatMutation)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit,setIsEdit] = useState(false);
  const [confirmDeleteDialog,setConfirmDeleteDialog] = useState(false);
  const [groupName,setGroupName] = useState("")
  const [groupNameUpdatedValue,setGroupNameUpdatedValue] = useState("")
  const [members,setMembers] = useState([]);
  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
];
  useErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.data;
    if(groupData){
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    }
  },[groupDetails.data]);
  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  
  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {chatId, name: groupNameUpdatedValue})
  };
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };
  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };
  const deleteHandler = () => {
    deleteGroup("Deleting Group...",chatId);
    closeConfirmDeleteHandler();
    navigate("/groups")
  };
  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId })
  };
  useEffect(() => {
    if(chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false)
    }
  },[chatId])
  const IconBtns = (
    <>
      <Box sx={{
        display: {
          xs: "block",
          sm: "none",
          position: "fixed",
          right: "1rem",
          top: "1rem"
        },
      }}>
      <IconButton onClick={handleMobile}>
        <MenuIcon />
      </IconButton>
      </Box>
      <Tooltip title="back" >
        <IconButton sx={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          bgcolor: "rgba(0,0,0,0.8)",
          color: "white",
          ":hover": {
            bgcolor: "rgba(0,0,0,0.7)",
          },
        }}
        onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

const GroupName = 
  <Stack 
    direction={"row"} 
    alignItems={"center"}
    justifyContent={"center"} 
    spacing={"1rem"} 
    padding={"3rem"}
  >
    {
      isEdit ? (
      <>
        <TextField value={groupNameUpdatedValue} onChange={e=>setGroupNameUpdatedValue(e.target.value)}/>
        <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
          <DoneIcon />
        </IconButton>
      </>) : (<>
        <Typography variant='h5'>{groupName}</Typography>
        <IconButton disabled={isLoadingGroupName} onClick={() => setIsEdit(true)}><EditIcon /></IconButton>
      </>)
    }
  </Stack>
  const ButtonGroup = (
      <Stack direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "0.4rem 2rem",
      }}
      >
        <Button size='large' color='error' startIcon={<DeleteIcon />} onClick={openConfirmDeleteHandler}>Delete Group</Button>
        <Button size='large' variant='contained'startIcon={<AddIcon />} onClick={openAddMemberHandler}>Add Member</Button>
      </Stack>
    );
  return myGroups.isLoading? ( <LayoutLoader /> ): (
  <Grid container height={"100vh"}>
    <Grid
      item
      sx={{
        display: {
          xs: "none",
          sm: "block",
        },
      }}
      sm={4}
    >
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId}/> 
    </Grid>
    <Grid item xs={12} sm={8} sx={{
      display: "flex",
      flexDirection: "column",
      position: "relative",
      padding: "0.3rem 5rem",
      alignItems: "center",
    }} >
      {IconBtns} 
      {
        groupName && <>
          
          {GroupName}
          <Typography
            margin={"1rem"}
            alignSelf={"flex-start"}
            variant='body1'
          >Members</Typography>
          <Stack
            maxWidth={"45rem"}
            width={"100%"}
            boxSizing={"border-box"}
            padding={{
              sm: "1rem",
              xs: "0",
              md: "1rem 4rem"
            }}
            spacing={"2rem"}
            height={"50vh"}
            overflow={"auto"}
          >
            { isLoadingRemoveMember? (<CircularProgress />) : (
              groupDetails?.data?.chat?.members?.map((i) => (
                <UserItem user={i} key={i._id} isAdded styling={{
                  boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                  padding: "1rem 1.5rem",
                  borderRadius: "1rem",
                }}
                handler={removeMemberHandler}
                /> 
              ))
            )}
          </Stack>
          
            {ButtonGroup}
        </>
      }
    </Grid>

{
  isAddMember && <Suspense fallback={<Backdrop open />}>
    <AddMemberDialog chatId={chatId}/>
  </Suspense>
}

{
  confirmDeleteDialog && (
  <Suspense fallback={<Backdrop open />}>
    <ConfirmDeleteDialog 
      open={confirmDeleteDialog} 
      handleClose={closeConfirmDeleteHandler}
      deleteHandler={deleteHandler}
    />

  </Suspense>
)}

    <Drawer sx={{
      display: {
        xs:"block",
        sm: "none"
      },
    }}
      open={isMobileMenuOpen} 
      onClose={handleMobileClose}
    >
     <GroupList w={"50vw"} myGroups={myGroups?.data?.groups} chatId={chatId}/> 
    </Drawer>
  </Grid>
  );
};

const GroupList = ({ w="100%", myGroups=[],chatId}) => (
  <Stack width={w}
    sx={{
      backgroundImage: bgGradient,
      height: "100%",
      overflow: "auto"
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id}/>
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No Groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId}) => {
  const { name, avatar, _id } = group;

  return (
    <Link 
      to={`?group=${_id}`} 
      onClick={(e) => {
        if(chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1.5rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar}/>
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
