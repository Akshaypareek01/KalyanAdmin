import React from 'react'
import { KTCard } from '../../../../../_metronic/helpers'
import { styled } from '@mui/system';
import { Box, Button, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';

import SessionFilter from './SessionFilter';
import PageHeader from './PageHeader';
import BoltIcon from '@mui/icons-material/Bolt';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ReplayIcon from '@mui/icons-material/Replay';

const MyBox = styled('Button')({
    width:'100%',
    color: 'black',
    backgroundColor: '#eeeeee',
    padding: 8,
    borderRadius:"15px",
    border:"none"
  });


const SessionHeader = () => {
  return (
    <KTCard>
      <PageHeader/>
        <Box    justifyContent={"space-between"} p={"10px"} display='flex' sx={{display:{xs:"block",sm:"flex",md:"flex",lg:"flex",xl:"flex"}, alignItems:"center"}} >

            <Box display={'flex'}   justifyContent={"space-evenly"} alignItems={"center"} sx={{width:{xs:"100%",md:"45%",lg:"45%",xl:"30%"}}}>
           
            <Box sx={{display:"flex"}}>
            
<MyBox>
<BoltIcon/> 4897103 Units Consumed
</MyBox>



</Box>


<Box sx={{display:"flex"}}>

<MyBox>
<CurrencyRupeeIcon/> 23760285 Total Revenue
</MyBox>
</Box>

            
            </Box>
            
            {/* ===================================================================== */}
            

            <Box display={'flex'}   justifyContent={"space-evenly"} alignItems={"center"} sx={{width:{xs:"100%",md:"45%",lg:"45%",xl:"45%"}}}>

            <Box sx={{display:"flex", width:"50%",alignItems:"center",justifyContent:"space-between"}}>
            {/* <TextField fullWidth label="Search" /> */}
            <ReplayIcon fontSize='large' sx={{color:"crimson"}}/>
            <TextField
          label="Search"
          id="outlined-start-adornment"
          size='small'
          sx={{ m: 1, width: '80%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
          }}
        />
            </Box>


            <Box sx={{display:"flex", alignItems:"center",width:"40%",justifyContent:"space-evenly"}}>

                <SessionFilter/>
               
            
            
                <IconButton aria-label="Download" color="primary">
                <CloudDownloadIcon  fontSize='large'/> 
                 </IconButton>
           
                 <Box sx={{ marginLeft:"10px", display:'flex', alignItems:"center"}}>
            {/* <Typography sx={{color:"gray",marginTop:"5px",display:{xs:"none",sm:"none",md:"none",lg:"none",xl:"block"}}}variant="subtitle1" component="h6">Add Ev Owner</Typography> */}
            {/* <IconButton  ></IconButton> */}
           
            </Box>
            </Box>

            
            
            </Box>




           
        </Box>
        </KTCard>
    
  )
}

export default SessionHeader
