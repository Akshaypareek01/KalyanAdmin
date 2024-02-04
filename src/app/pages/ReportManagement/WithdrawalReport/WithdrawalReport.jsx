


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
  {name:"User Name"},
  {name:"Mobile"},
  {name:"Payment On"},
  {name:"Amount"},
  {name:"Method"},
  {name:"Staus"},

  
]

const Item = styled(Box)(() => ({
 
  textAlign: 'center',
  color:"black",
}));
export const WithdrawalReport = () => {
  const Token = sessionStorage.getItem('token') || null
  const rows=[
    {ID:"1",Date:"2 Aug 2023",User_Name:"Anshul",Mobile:"091234568",Transaction_Id:"23122",
    Amount:"500",Method:"Googel pay",
    Staus:<Button size='small' color='success' variant="contained" >Approve</Button>,
    Active:<Button size='small' color='success' variant="contained" >Approved</Button>},
 ]
 const [age, setAge] = React.useState('');

 const handleChange = (event) => {
   setAge(event.target.value);
 };
 const [searchInput, setSearchInput] = React.useState('');
 const [withdrwalData,setWithdrwalData] = React.useState('');
 const [filteredRows, setFilteredRows] = React.useState([]);
 const [dateValue,setDataValue] = React.useState("");
 const navigate = useNavigate();
 const handelViewClick=(id)=>{
   
  console.log("🚀 ~ file: Chargers.jsx:22 ~ handelClick ~ e:",id)
   navigate(`/user/view/${id}`);

}
 const handleSearch = () => {
  const filteredData = withdrwalData.filter((row) =>
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
  setFilteredRows(withdrwalData);
};

const fetchUserWithdrwalReport =async()=>{
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}cart/wd_all`,
    
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request response Withrwal Report Data:", data);
      if(data.post && data !== undefined){
         const StatusDataArray=data.post.filter((el)=>{
              return el.status_wd === "1"
         })
          const formattedData = StatusDataArray.map((item) => ({
         "ID":item.wd_id,
         "Date":item.date,
         "User_Name":<Typography style={{color:"blue"}} onClick={()=>handelViewClick(item.user_id)}>{item.user_name}</Typography> ,
         "User Mobile":item.user_number,
         "Payment Number":item.number,
         "Amount":item.amount,
         "Method":item.name,
         "Staus":<Button variant="contained" color="success">Approved</Button>,
      
        //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
     }));

   
    
     setWithdrwalData(formattedData);
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
const handleDateChange = (date) => {
  setDataValue(date.toDate())
};

const handelSearchFilter =()=>{
  
  const filteredData = withdrwalData.filter((item) => {
   
   
    const itemResultDate = item.Date;
    const formValuesResultDate =dateValue;
    
    // Parse the itemResultDate and format it as "DD-MM-YYYY"
    const itemDateParts = itemResultDate.split(' ')[0].split('-');
    const formattedItemDate = `${itemDateParts[2]}-${itemDateParts[1]}-${itemDateParts[0]}`;
    
    // Parse the formValuesResultDate and format it as "DD-MM-YYYY"
    const formValuesDate = new Date(formValuesResultDate);
    const formattedFormValuesDate = `${formValuesDate.getFullYear()}-${formValuesDate.getDate().toString().padStart(2, '0')}-${(formValuesDate.getMonth() + 1).toString().padStart(2, '0')}`;
    
    // Now, you can compare the two formatted dates
    const matchesDate = formattedItemDate === formattedFormValuesDate;
  
    // console.log(matchesId, matchesDate, matchesSession)
    return  matchesDate
  });
  setFilteredRows(filteredData)
  console.log(filteredData);

}
const handelMainSearchReset=()=>{
  setDataValue("");
  setFilteredRows(withdrwalData);
}
React.useEffect(()=>{
  fetchUserWithdrwalReport();
},[])
  return (
    <div>

    <Card sx={{marginBottom:"30px"}}>
        <CardContent>
        <Box>
      <Box>
        <Typography variant='h6'>Withdrawal Report</Typography>
      </Box>
      <Box sx={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
  
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    
      <Grid item xs={2} sm={2} md={2} >
        <Item>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
      
      <DatePicker label="Result Date" onChange={handleDateChange} />
   
    </LocalizationProvider>
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
        <Typography variant='h6'>WITHDRAW LIST</Typography>
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
