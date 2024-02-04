import * as React from 'react';

import { Box, Button, Card, CardContent, TextField, Typography,InputAdornment,SwipeableDrawer } from '@mui/material';
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
  {name:"Session"},
  {name:"Open Digits"},
  {name:"Close Digits"},
  {name:"Jodi"},
  {name:"Open Panna"},
  {name:"Close Panna"},
  {name:"Points"},
  {name:"Action"},
  
]

const Item = styled(Box)(() => ({
 
  textAlign: 'center',
  color:"black",
}));

export const UserBidHistory = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const rows=[
    {ID:"1",User:"Anshul",Game_Name:"Milan Morning",Game_Type:"Singel Digit",Session:"Open",Open_Digits:"1",Jodi:"2",Open_Panna:"2",
    Close_Panna:"1",Points:"2"
    ,Action:<Button size='small' variant="contained" onClick={toggleDrawer('right', true)} >Edit</Button>},
  ]
  
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
  const initalEditFormData={
    "Session":"",
           "Open_Digits":"",
           "Close_Digits":"",
           "Jodi":"",
           "Open_Panna":"",
           "Close_Panna":"",
  }
  const [EditFormData, setEditFormData] = React.useState(initalEditFormData)
  const initalFormValues2={
    resultDate: new Date(),
    gameID: '',
    gameTypeID: '',
  }
 const [formValues, setFormValues] = React.useState(initalFormValues2);
 const [update,setUpdate] = React.useState(0);
 const navigate = useNavigate();
 const handelViewClick=(id)=>{
   
  console.log("🚀 ~ file: Chargers.jsx:22 ~ handelClick ~ e:",id)
   navigate(`/user/view/${id}`);

}
const handleChangeEdit = (event, fieldName) => {

  const updatedFormData = { ...EditFormData, [fieldName]: event.target.value };
  setEditFormData(updatedFormData);
};
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
           "Session":item.session,
           "Open_Digits":item.Open_Digits,
           "Close_Digits":item.Close_Digits,
           "Jodi":item.Jodi,
           "Open_Panna":item.Open_Panna,
           "Close_Panna":item.Close_Panna,
           "Points":item.total_amount,
           "Action":<Button size='small' variant="contained" onClick={()=>handelEdit(item)} >Edit</Button>,
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

  const fetchSingelDigit =async(id2)=>{
    try {
     
      const response = await axios.get(
        `${Base_Url2}number/num_gt_id/${id2}`,
      
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" :`Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;
      console.log("POST request response game digit :", data);
        if(data.client
          && data !== undefined){
          // console.log("POST request response if", data);
          setDigits(data.client);
          
          // console.log(data.post)
             
        }
        
      return data;
      // Handle success
    } catch (error) {
      console.error("Error sending POST request:", error);

      
      // Handle error
    }
  }
  
  const fetchHalfSangamDigit =async()=>{
    try {
     
      const response = await axios.get(
        `${Base_Url2}numberh`,
      
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" :`Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;
      console.log("POST request response game halfdigit :", data);
        if(data.game && data !== undefined){
          // console.log("POST request response if", data);
          setHalfDigits(data.game);
          
          // console.log(data.post)
             
        }
        
      return data;
      // Handle success
    } catch (error) {
      console.error("Error sending POST request:", error);
   
      
      // Handle error
    }
  }

  const handelEdit=(item)=>{
    const formattedData ={
      "ID":item.b_id,
      "Date":item.date,
      "User":item.user_name ,
      "Game_Name":item.g_title,
      "Game_Type":item.gt_name,
      "Session":item.session,
      "Open_Digits":item.Open_Digits,
      "Close_Digits":item.Close_Digits,
      "Jodi":item.Jodi,
      "Open_Panna":item.Open_Panna,
      "Close_Panna":item.Close_Panna,
      "Points":item.total_amount,
  };
  setEditData(item)

  setEditFormData(formattedData)
    fetchSingelDigit(item.gt_id);
    fetchHalfSangamDigit();
    setState({ ...state, ["right"]: true });
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

  const fetchGameTypeData =async()=>{
    try {
      // setIsLoading(true);
      const response = await axios.get(
        `${Base_Url2}users/get_stype`,
      
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
     
       
          setGameTypeData(data.post);
         
             
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

  

 const handleSearch = () => {
  const filteredData = BidData.filter((row) =>
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
  setFilteredRows(BidData);
};

const SubmitEditDataApi =async(id)=>{
  const formdata= new FormData();
  formdata.append("Open_Digits",EditFormData.Open_Digits)
  formdata.append("Close_Digits",EditFormData.Close_Digits)
  formdata.append("Jodi",EditFormData.Jodi)
  formdata.append("Open_Panna",EditFormData.Open_Panna)
  formdata.append("Close_Panna",EditFormData.Close_Panna)
  try {
    // setIsLoading(true);
    const response = await axios.post(
      `${Base_Url2}bid/update_num/${id}`,
      formdata,
      {
        headers:{
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request Edit bid response:", data);
    setEditData(null)
    setEditFormData(initalEditFormData);
    setUpdate((prev)=>prev+1);
    handeldrwerClose()
    return data;
    // Handle success
  } catch (error) {
    console.error("Error sending POST request:", error);
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}
const handleEditSubmit = () => {
  // Handle the submission of changes here
  console.log("Submitted changes:", EditFormData); // Replace with your logic
  SubmitEditDataApi(EditFormData.ID)
};

const handeldrwerClose=()=>{
  setState({ ...state, ["right"]: false });
  setEditFormData(initalEditFormData)
}

const list = (anchor) => (
 

<Box
sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 , padding:"10px"}}
role="presentation"
>
{/* Input fields for editing data */}



{
  EditFormData.Open_Digits !== "" && 
      <FormControl fullWidth margin="normal">
        <InputLabel id="session-label" style={{fontSize:"20px"}}>Open Digits</InputLabel>
        <Select
          labelId="session-label"
          value={EditFormData.Open_Digits}
          onChange={(e) => handleChangeEdit(e, "Open_Digits")}
          sx={{marginTop:"20px"}}
        >
          {
            Digits.map((digit,index)=>{
              return <MenuItem key={index} value={digit.g_number}>{digit.g_number }</MenuItem>
            })
          }
       
        </Select>
      </FormControl>
}

{
  EditFormData.Close_Digits !== "" && <FormControl fullWidth margin="normal">
  <InputLabel id="session-label" style={{fontSize:"20px"}}>Close Digits</InputLabel>
  <Select
    labelId="session-label"
    value={EditFormData.Close_Digits}
    onChange={(e) => handleChangeEdit(e, "Close_Digits")}
    sx={{marginTop:"20px"}}
  >
    {
      Digits.map((digit,index)=>{
        return <MenuItem key={index} value={digit.g_number}>{digit.g_number }</MenuItem>
      })
    }
  </Select>
</FormControl>
}
      
{
  EditFormData.Jodi !== "" &&
      <FormControl fullWidth margin="normal">
        <InputLabel id="session-label" style={{fontSize:"20px"}}>Jodi</InputLabel>
        <Select
          labelId="session-label"
          value={EditFormData.Jodi}
          onChange={(e) => handleChangeEdit(e, "Jodi")}
          sx={{marginTop:"20px"}}
        >
          {
      Digits.map((digit,index)=>{
        return <MenuItem key={index} value={digit.g_number}>{digit.g_number }</MenuItem>
      })
    }
        </Select>
      </FormControl>
}

{
  EditFormData.Open_Panna !== "" &&
      <FormControl fullWidth margin="normal">
        <InputLabel id="session-label" style={{fontSize:"20px"}}>Open Panna</InputLabel>
        <Select
          labelId="session-label"
          value={EditFormData.Open_Panna}
          onChange={(e) => handleChangeEdit(e, "Open_Panna")}
          sx={{marginTop:"20px"}}
        >
         {
            HalfDigits.map((digit,index)=>{
              return <MenuItem key={index} value={digit.panna}>{ digit.panna}</MenuItem>
            })
          }
        </Select>
      </FormControl>
}

{
  EditFormData.Close_Panna !== "" && 
  <FormControl fullWidth margin="normal">
  <InputLabel id="session-label" style={{fontSize:"20px"}}>Close Panna</InputLabel>
  <Select
    labelId="session-label"
    value={EditFormData.Close_Panna}
    onChange={(e) => handleChangeEdit(e, "Close_Panna")}
    sx={{marginTop:"20px"}}
  >
   {
      HalfDigits.map((digit,index)=>{
        return <MenuItem key={index} value={digit.panna}>{ digit.panna}</MenuItem>
      })
    }
  </Select>
</FormControl>
}
      



{/* Save and Close buttons */}
<Box display="flex" justifyContent="space-around" alignItems="center" marginTop="40px">
  <Button variant="contained" onClick={handeldrwerClose}>Close</Button>
  <Button variant="contained" onClick={handleEditSubmit}>Save Changes</Button>
</Box>
</Box>
);
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
    const matchesType = item.Game_Type.includes(formValues.gameTypeID);
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
    return matchesId && matchesDate && matchesType;
  });
  setFilteredRows(filteredData)


}
const handelMainSearchReset=()=>{
  setFormValues(initalFormValues2);
  setFilteredRows(BidData);
}
React.useEffect(()=>{
  fetchGameData()
  fetchGameTypeData()
  fetchUserBidHistory()
},[update])
  return (
    <div>

    <Card sx={{marginBottom:"30px"}}>
        <CardContent>
        <Box>
      <Box>
        <Typography variant='h6'>Bid History Report</Typography>
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
          <InputLabel id="demo-simple-select-label">Game Type</InputLabel>
          <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             name="gameTypeID"
             value={formValues.gameTypeID}
             onChange={handleChange}
            
          >
          {
               GameTypeData.map((el,index)=>{
                return (
                       <MenuItem key={index} value={el.gt_name}>{el.gt_name}</MenuItem>
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
        <Typography variant='h6'>User Bid History</Typography>
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
    
        {filteredRows !== null && <GenralTabel column={column}   rows={filteredRows}/> }

        <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer>
    </div>
  )
}
