
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
  {name:"User"},
  {name:"Game Name"},
  {name:"Game Type"},
  {name:"Session"},
  {name:"Open Digits"},
  {name:"Close Digits"},
  {name:"Jodi"},
  {name:"Open Panna"},
  {name:"Close Panna"},
  {name:"Win Amount"},
  {name:"Tx Id"},
  {name:"Tx Date"},
  
]

const Item = styled(Box)(() => ({
 
  textAlign: 'center',
  color:"black",
}));
export const WinningReport = () => {
  const Token = sessionStorage.getItem('token') || null
 const [age, setAge] = React.useState('');
 const [GameData,setGameData] = React.useState([]);
 const [searchInput, setSearchInput] = React.useState('');
 const [WinningData,setWinningData] = React.useState('');
 const [filteredRows, setFilteredRows] = React.useState([]);
 const initalFormValues2={
  resultDate: new Date(),
  gameID: '',
  session: '',
}
const [formValues, setFormValues] = React.useState(initalFormValues2);
const navigate = useNavigate();
 const handleSearch = () => {
  const filteredData = WinningData.filter((row) =>
    Object.values(row)
      .filter((value) => typeof value === 'string') // Filter only string values
      .some((value) =>
        value.toLowerCase().includes(searchInput.toLowerCase())
      )
  );
  setFilteredRows(filteredData);
};

const handleResetFilter = () => {
  setSearchInput('');
  setFilteredRows(WinningData);
};
const handleDateChange = (date) => {
  setFormValues((prevValues) => ({
    ...prevValues,
    resultDate: date.toDate(), // Extract JavaScript Date from Day.js
  }));
};
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

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormValues((prevValues) => ({
    ...prevValues,
    [name]: value,
  }));
};
const handelViewClick=(id)=>{
   
  console.log("🚀 ~ file: Chargers.jsx:22 ~ handelClick ~ e:",id)
   navigate(`/user/view/${id}`);

}
const fetchUserWiningReport =async()=>{
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}win`,
    
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request response Withrwal Report Data:", data);
      if(data.game && data !== undefined){
         
          const formattedData = data.game.map((item) => ({
         "ID":item.win_id,
         "User_Name":<Typography style={{color:"blue"}} onClick={()=>handelViewClick(item.user_id)}>{item.user_name}</Typography> ,
         "Game_Name":item.g_title,
         "Game_Type":item.gt_name,
         "Session":item.session,
         "Open_Digits":item.Open_Digits,
         "Close_Digits":item.Close_Digits,
         "Jodi":item.Jodi,
         "Open_Panna":item.Open_Panna,
         "Close_Panna":item.Close_Panna,
         "Win Amount":item.win_amount,

         "Tx_Id":item.session,
         "Tx_Date":item.date
         
      
        //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
     }));

   
    
     setWinningData(formattedData);
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



const handelSearchFilter =()=>{
  console.log("Search values",formValues)
  const filteredData = WinningData.filter((item) => {
    const matchesId = item.Game_Name.includes(formValues.gameID);
   
    const itemResultDate = item.date;
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
    const matchesSession = item.Session === formValues.session;
    // console.log(matchesId, matchesDate, matchesSession)
    return matchesId && matchesDate && matchesSession;
  });
  setFilteredRows(filteredData)


}
const handelMainSearchReset=()=>{
  setFormValues(initalFormValues2);
  setFilteredRows(WinningData);
}
React.useEffect(()=>{
  fetchUserWiningReport()
  fetchGameData()
},[])
  return (
    <div>

<Card sx={{marginBottom:"30px"}}>
        <CardContent>
        <Box>
      <Box>
        <Typography variant='h6'>Winning History Report</Typography>
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
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Session</InputLabel>
          <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             name="session"
             value={formValues.session}
             onChange={handleChange}
            
          >
            
            <MenuItem value={"open"}>Open</MenuItem>
            <MenuItem value={"close"}>Close</MenuItem>
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
        <Typography variant='h6'>WINNING HISTORY REPORT LIST</Typography>
      </Box>
      <Box sx={{marginTop:"30px",display:"flex",alignItems:"center"}}>
      <Box>
        <Box sx={{display:"flex", width:"100%"}}>
            {/* <TextField fullWidth label="Search" /> */}
            
            <TextField
          label="Search"
          id="outlined-start-adornment"
          size='small'
          sx={{ m: 1, width: '100%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
          }}
          value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
        />
            </Box>
        </Box>
  
        <Button  sx={{marginLeft:"20px"}} variant="contained" onClick={handleSearch}> Search</Button>
        <Button sx={{marginLeft:"20px"}} variant="outlined" onClick={handleResetFilter}> <FilterAltIcon sx={{marginRight:"10px"}} />Reset Filter</Button>
      </Box>
    </Box>
        </CardContent>
      </Card>
    
        <GenralTabel column={column}   rows={filteredRows}/>
    </div>
  )
}
