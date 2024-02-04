
import * as React from 'react';

import { Box, Button, Card, CardContent, TextField, Typography,InputAdornment, SwipeableDrawer } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useNavigate } from 'react-router-dom';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import StarIcon from '@mui/icons-material/Star';
import WineBarIcon from '@mui/icons-material/WineBar';
import axios from 'axios';
import { Base_Url2 } from '../../../Config/BaseUrl';

const column=[
  {name:"ID"},
  {name:"User Name"},
  {name:"Bid Point"},
  {name:"Winning Points"},
  {name:"Bid Tax Id"},
  {name:"Action"},
  
  
]

const Item = styled(Box)(() => ({
 
  textAlign: 'center',
  color:"black",
}));

export const AddFund = () => {

  const Token = sessionStorage.getItem('token') || null
  const [UsersData,setUsersData] = React.useState(null);
  const initalData={
    UserId: '', // Initial value for User
    amount: '',
  }
  const [formValues, setFormValues] = React.useState(initalData);
  const [update,setUpdate] = React.useState(0);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
 
 const fetchUserData =async()=>{
 
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}user_m`,
    
      {
        headers:{
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request response users:", data);
      if(data.game && data !== undefined){

     setUsersData(data.game);
   
      }
      
    return data;
    // Handle success
  } catch (error) {
    console.error("Error sending POST request:", error);
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}

const handelAddFundToUser=async()=>{
  const formData1= new FormData();
  try {
    
    formData1.append("total_am",formValues.amount)
   
    // setIsLoading(true);
    const response = await axios.post(
      
      `${Base_Url2}wallet/update_by_user/${formValues.UserId}`,
      formData1
    ,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request response:", data);
    
    setUpdate((prev)=>prev+1)
    setFormValues(initalData)
    alert("Amount Added successfully In User Wallet")
        // setIsLoading(false);
        // console.log(data.post)
           
  
      
    return data;
    // Handle success
  } catch (error) {
    console.error("Error sending POST request:", error);
    
  }
}

const handelAddFund=()=>{
  console.log(formValues)
  handelAddFundToUser()
}

React.useEffect(()=>{
  fetchUserData();
},[update])
 


  return (
    <div>

  <Card sx={{marginBottom:"30px"}}>
      <CardContent>
      <Box>
    <Box>
      <Typography variant='h6'>Add Balance In User Wallet</Typography>
    </Box>
    <Box sx={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>

    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  
    

    <Grid item xs={12} sm={12} md={12} >
      <Item>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="UserId"
          value={formValues.UserId}
          onChange={handleChange}
        
        >
          {
             UsersData !== null && UsersData.map((el,index)=>{
                   return (
                    <MenuItem key={index} value={el.user_id}>{el.name}({el.number})</MenuItem>
                   )
             })
          }
        
        </Select>
      </FormControl>
    </Box>
      </Item>
    </Grid>

    <Grid item xs={12} sm={12} md={12} >
      <Item>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        
        <TextField
        placeholder='Enter Amount'
        name="amount"
        value={formValues.amount}
        onChange={handleChange}
        />
      </FormControl>
    </Box>
      </Item>
    </Grid>

    

    <Grid item xs={12} sm={12} md={12} >
      <Item>
      
        <Box sx={{ minWidth: 120,padding:"7px" }}>
        <Button size='large' style={{width:"120px"}} onClick={handelAddFund}  variant="contained">Add Fund</Button>
        </Box>
      
      </Item>
    </Grid>
 
</Grid>
    

    

    


    </Box>
  </Box>
      </CardContent>
    </Card>

    
  </div>
  )
}
