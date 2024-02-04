

import * as React from 'react';

import { Box, Button, Card, CardContent, TextField, Typography,InputAdornment } from '@mui/material';
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
import { GenralTabel } from '../../../TabelComponents/GenralTable';
import axios from 'axios';
import { Base_Url2 } from '../../../Config/BaseUrl';

const column=[
  {name:"ID"},
  {name:"Date"},
  {name:"User"},
  {name:"Game Name"},
  {name:"Game Type"},
  {name:"Points"},
  
]

const Item = styled(Box)(() => ({
 
  textAlign: 'center',
  color:"black",
}));
export const BidRevert = () => {
  
  const rows=[
    {ID:"1",User_Name:"Anshul",Points:"091234568",Bid_Date:"7 Aug 2023"},
 ]
 const [age, setAge] = React.useState('');


 const Token = sessionStorage.getItem('token') || null
 const [searchInput, setSearchInput] = React.useState('');
 const [filteredRows, setFilteredRows] = React.useState(null);
 const [BidData, setBidData] = React.useState(null);
 const [selectedGame, setselectedGame] = React.useState('');
 const [GameData,setGameData] = React.useState([]);
 const [GameTypeData,setGameTypeData] = React.useState([]);
 const [rawBidData,setRawBidData] = React.useState(null)
 const [EditData, setEditData] = React.useState(null)
 const [Digits,setDigits]=React.useState([]);
 const [HalfDigits,setHalfDigits]=React.useState([]);
  const initalFormValues2={
    resultDate: new Date(),
    gameID: '',
    gameTypeID: '',
  }
 const [formValues, setFormValues] = React.useState(initalFormValues2);
 const [update,setUpdate] = React.useState(0);
 const navigate = useNavigate();

 const handleChange = (event) => {
  const { name, value } = event.target;
  setFormValues((prevValues) => ({
    ...prevValues,
    [name]: value,
  }));
};
 const handleSearch = () => {
  const filteredData = rows.filter((row) =>
    Object.values(row)
      .filter((value) => typeof value === 'string') // Filter only string values
      .some((value) =>
        value.toLowerCase().includes(searchInput.toLowerCase())
      )
  );
  setFilteredRows(filteredData);
};
const handelViewClick=(id)=>{
   
  console.log("🚀 ~ file: Chargers.jsx:22 ~ handelClick ~ e:",id)
   navigate(`/user/view/${id}`);

}

const fetchUserBidHistory =async()=>{
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}bid_admin`,
    
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request response Bid Data:", data);
      if(data.post && data !== undefined){
       
          const formattedData = data.post.map((item) => ({
         "ID":item.b_id,
         "Date":item.date,
         "User":<Typography style={{color:"blue"}} onClick={()=>handelViewClick(item.user_id)}>{item.user_name}</Typography> ,
         "Game_Name":item.g_title,
         "Game_Type":item.gt_name,
         "Points":item.total_amount,
         
        //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
     }));

   
     setRawBidData(data.post)
     setBidData(formattedData);
        setFilteredRows(formattedData)
        // setIsLoading(false);
        // console.log(data.post)
           
      }
      
    return data;
    // Handle success
  } catch (error) {
    console.error("Error sending POST request:", error);
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}

const fetchGameData =async()=>{
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}users/get_service`,
    
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    
      if(data.post && data !== undefined){
       
        console.log("POST request response games in bid:", data);
   
     
        setGameData(data.post);
       
           
      }
      
    return data;
    // Handle success
  } catch (error) {
    console.error("Error sending POST request:", error);
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}

const handleResetFilter = () => {
  setSearchInput('');
  setFilteredRows(rows);
};

const handleDateChange = (date) => {
  setFormValues((prevValues) => ({
    ...prevValues,
    resultDate: date.toDate(), // Extract JavaScript Date from Day.js
  }));
};

const handelSearchFilter =()=>{
  console.log("Search values",formValues)
  const filteredData = BidData.filter((item) => {
    const matchesId = item.Game_Name.includes(formValues.gameID);
    const itemResultDate = item.Date;
    const formValuesResultDate =formValues.resultDate;
    
    // Parse the itemResultDate and format it as "DD-MM-YYYY"
    const itemDateParts = itemResultDate.split(' ')[0].split('-');
    const formattedItemDate = `${itemDateParts[2]}-${itemDateParts[1]}-${itemDateParts[0]}`;
    
    // Parse the formValuesResultDate and format it as "DD-MM-YYYY"
    const formValuesDate = new Date(formValuesResultDate);
    const formattedFormValuesDate = `${formValuesDate.getFullYear()}-${formValuesDate.getDate().toString().padStart(2, '0')}-${(formValuesDate.getMonth() + 1).toString().padStart(2, '0')}`;
    
    // Now, you can compare the two formatted dates
    const matchesDate = formattedItemDate === formattedFormValuesDate;
    // console.log(formattedItemDate, formattedFormValuesDate)
    
    // console.log(matchesId, matchesDate, matchesSession)
    return matchesId && matchesDate;
  });
  setFilteredRows(filteredData)


}
const handelMainSearchReset=()=>{
  setFormValues(initalFormValues2);
  setFilteredRows(BidData);
}
const RevertUserBids=async(id)=>{
  try {
    // setIsLoading(true);
    const response = await axios.post(
      `${Base_Url2}revert/${id}`,
    
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request response Bid Revert Data:", data);
   
      
    return data;
    // Handle success
  } catch (error) {
    console.error("Error sending POST request:", error);
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}

const handleRevertBid=()=>{
  console.log("Revert List ",filteredRows)
  filteredRows.map((el)=>{
    return RevertUserBids(el.ID)
  })
  setUpdate((prev)=>prev+1)
}

React.useEffect(()=>{
  fetchGameData()
  fetchUserBidHistory()
},[update])
  return (
    <div>

<Card sx={{marginBottom:"30px"}}>
        <CardContent>
        <Box>
      <Box>
        <Typography variant='h6'>Bid Revert</Typography>
      </Box>
      <Box sx={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
  
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    
      <Grid item xs={2} sm={2} md={2} >
        <Item>
          {/* <TextField
            label="Result Date"
            value={formValues.resultDate}
             onChange={(date) =>
          setFormValues((prevValues) => ({ ...prevValues, resultDate: date }))
        }
          >

          </TextField> */}
        <LocalizationProvider dateAdapter={AdapterDayjs} >
      
      <DatePicker
       label="Result Date"
       onChange={handleDateChange}
       
       />
   
    </LocalizationProvider>
        </Item>
      </Grid>
  
      <Grid item xs={2} sm={5} md={5} >
        <Item>
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Game Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="gameID"
            value={formValues.gameID}
            onChange={handleChange}
          >
            {
               GameData.map((el,index)=>{
                return (
                       <MenuItem key={index} value={el.g_title}>{el.g_title}</MenuItem>
                )
                
              })
            }
          </Select>
        </FormControl>
      </Box>
        </Item>
      </Grid>
  
      
  
      <Grid item xs={2} sm={2} md={2} >
        <Item>
        
          <Box sx={{padding:"7px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <Button size='large'  onClick={handelSearchFilter}  variant="contained">Search</Button>

          <Button size='large' sx={{marginLeft:"20px"}} variant="contained" onClick={handelMainSearchReset}> <FilterAltIcon sx={{marginRight:"10px"}} />Reset</Button>
          </Box>
           
        </Item>
      </Grid>
   
  </Grid>
      
  
      
  
      
  
  
      </Box>
    </Box>
        </CardContent>
      </Card>
  
      <Card>
        <CardContent>
        <Box>
      <Box>
        <Typography variant='h6'>BID REVERT LIST</Typography>
      </Box>
      <Box sx={{marginTop:"30px",display:"flex",alignItems:"center"}}>
    
  
        <Button  sx={{marginLeft:"20px"}} variant="contained" onClick={handleRevertBid}>Revert</Button>
      </Box>
    </Box>
        </CardContent>
      </Card>
    
      {filteredRows !== null && <GenralTabel column={column}   rows={filteredRows}/> }
    </div>
  )
}

