import * as React from 'react';

import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useNavigate } from 'react-router-dom';
import { GenralTabel } from '../../TabelComponents/GenralTable';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Base_Url2 } from '../../Config/BaseUrl';
const column=[
  {name:"ID"},
  {name:"Game Name"},
  {name:"Result Date"},
  {name:"Open Declare Date"},
  {name:"Close Declare Date"},
  {name:"Open Pana"},
  {name:"Close Pana"}
  
]

const Item = styled(Box)(() => ({
 
  textAlign: 'center',
  color:"black",
}));

export const DeclareResult = () => {
  const Token = sessionStorage.getItem('token') || null
  const navigate = useNavigate();
  const getCurrentDate = () => {
    const currentDate = new Date();
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return currentDate.toLocaleDateString(undefined, options);
  };
  const rows=[
    {sno:"1",GameName:"MILAN MORNING",ResultDate:"7 Aug 2023",Open_Declare_Date:"7 Aug 2023,10:36 AM",Close_Declare_Date:"7 Aug 2023,10:36 AM",OpenPana:<Typography>379-9 <Button size='small' variant="contained" color="error" sx={{marginLeft:"10px"}}>Delete</Button></Typography>,
    ClosePana:<Typography>890-7 <Button size='small' variant="contained" color="error" sx={{marginLeft:"10px"}}>Delete</Button></Typography>},
 ]
 const [age, setAge] = React.useState('');

//  const handleChange = (event) => {
//    setAge(event.target.value);
//  };
 const [searchInput, setSearchInput] = React.useState('');
 const [filteredRows, setFilteredRows] = React.useState([]);
 const initalValues ={
  Panna:"",
  Session:"",
  g_id:"",
  Digit:""

 }
 const [rawData, setRawData] = React.useState([])
 const [fieldData,setFieldData] = React.useState(initalValues);
 const [BidData, setBidData] = React.useState(null);
  const [selectedGame, setselectedGame] = React.useState('');
  const [GameData,setGameData] = React.useState([]);
  const initialFormValues={
    resultDate: getCurrentDate(), // Set your initial date value
    gameID: '',
    session: '',
  }
  const [formValues, setFormValues] = React.useState(initialFormValues);
   const [SearchInputDate,setSearchInputDate] = React.useState("")
  const [resultFromValues,setResultFromValues] = React.useState()
  const [visabel,setVisabel] = React.useState(false);
  const [Digits,setDigits]=React.useState([]);
  const [update,setUpdate]=React.useState(0);
  const [StaringRawData,setStaringRawData]=React.useState([])


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

const handleDateChange = (date) => {
  setSearchInputDate(date.toDate()) // Extract JavaScript Date from Day.js

};
const handleDateChange1 = (date) => {
  setFormValues((prevValues) => ({
    ...prevValues,
    resultDate: date.toDate(), // Extract JavaScript Date from Day.js
  }));
};

const handelDelete=async(id,value,session)=>{
  const formdata= new FormData();
  formdata.append("Panna",session)
  formdata.append("value",value)
  try {
    // setIsLoading(true);
    const response = await axios.post(
      `${Base_Url2}result/result_delete_id/${id}`,
      formdata,
      {
        headers:{
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request aDD reult response:", data);
    setUpdate((prev)=>prev+1);
    return data;
    // Handle success
  } catch (error) {
    setUpdate((prev)=>prev+1);
    console.error("Error sending POST request:", error);
    
    
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}

const fetchResultData =async()=>{
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}result_admin`,
    
      {
        headers:{
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request result data response users:", data);
      if(data.game && data !== undefined){
       
          const formattedData = data.game.map((item,index) => ({
         "sno":index+1,
         "GameName":item.g_title ,
         "ResultDate":item.result_date,
         "Open_Declare_Date":item.open_date,
         "Close_Declare_Date":item.close_date,
         "OpenPana":<Typography>{item.open_num} - {item.start} <Button onClick={()=>handelDelete(item.re_id,item.open_num,"open")} size='small' variant="contained" color="error" sx={{marginLeft:"10px"}}>Delete</Button></Typography>,
         "ClosePana":<Typography>{item.close_num} - {item.end} <Button onClick={()=>handelDelete(item.re_id,item.close_num,"close")} size='small' variant="contained" color="error" sx={{marginLeft:"10px"}}>Delete</Button></Typography>,
         
        //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
     }));

   
     setStaringRawData(data.game)
     setRawData(formattedData);
        setFilteredRows(formattedData);
  
           
      }
      
    return data;
    // Handle success
  } catch (error) {
    console.error("Error sending POST request:", error);
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}

const AddResultData =async(Date)=>{
  const formdata= new FormData();
  formdata.append("Panna",fieldData.Panna)
  formdata.append("Session",formValues.session)
  formdata.append("g_id",formValues.gameID)
  formdata.append("date",Date)
  try {
    // setIsLoading(true);
    const response = await axios.post(
      `${Base_Url2}result/result_add`,
      formdata,
      {
        headers:{
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request aDD reult response:", data);
    setFormValues(initialFormValues);
    setFieldData(initalValues);
   
    setUpdate((prev)=>prev+1);
    setVisabel(false)
    return data;
    // Handle success
  } catch (error) {
    // setFormValues(initialFormValues);
    // setFieldData(initalValues);
   
    // setUpdate((prev)=>prev+1);
    // setVisabel(false)
    console.error("Error sending POST request:", error);
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}

const handleResetFilter = () => {
  setSearchInput('');
  setFilteredRows(rawData);
};

const handelSearchFilter =()=>{
  console.log("Search values game result",formValues)
  if(formValues.gameID !== "" && formValues.session!== ""){
    fetchPannaDigit();
  }
  
}

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormValues((prevValues) => ({
    ...prevValues,
    [name]: value,
  }));
};
const handelResultChange=(event)=>{
  const { name, value } = event.target;
  setFieldData((prevValues) => ({
    ...prevValues,
    [name]: value,
  }));
  const selectedDigit = Digits.find((digit) => digit.g_number === value);

  if (selectedDigit) {
    // Set the "single_ank" value from the selectedDigit object
    setFieldData((prevValues) => ({
      ...prevValues,
      [name]: value,
      Digit: selectedDigit.single_ank,
    }));

}
}
const fetchPannaDigit =async()=>{
  try {
   
    const response = await axios.get(
      `${Base_Url2}number/num_gt_id/${"3"}`,
    
      {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request response game digit :", data);
      if(data.client
        && data !== undefined){
        // console.log("POST request response if", data);
        setDigits(data.client);
        setVisabel(true);
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

const resultSubmit=()=>{
  const formValuesResultDate =formValues.resultDate;
  const formValuesDate = new Date(formValuesResultDate);
  const formattedFormValuesDate = `${(formValuesDate.getMonth() + 1).toString().padStart(2, '0')}/${formValuesDate.getDate().toString().padStart(2, '0')}/${formValuesDate.getFullYear()}`;
  
  // Now, you can compare the two formatted dates
  console.log("FormatedDate",formattedFormValuesDate);
  AddResultData(formattedFormValuesDate)
}

const handleSearch = () => {
  const formValuesResultDate =SearchInputDate;
  const formValuesDate = new Date(formValuesResultDate);
  const formattedFormValuesDate = `${(formValuesDate.getMonth() + 1).toString().padStart(2, '0')}-${formValuesDate.getDate().toString().padStart(2, '0')}-${formValuesDate.getFullYear()}`;

  console.log("FormatedDate",formattedFormValuesDate);

  const filteredData1 = rawData.filter((row) =>
    row.ResultDate === formattedFormValuesDate
  );
  setFilteredRows(filteredData1);
};

React.useEffect(()=>{
  fetchResultData();
  fetchGameData();

},[update])
  return (
    <div>

  <Card sx={{marginBottom:"30px"}}>
      <CardContent>
      <Box>
    <Box>
      <Typography variant='h6'>Select Game</Typography>
    </Box>
    <Box sx={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>

    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    
      <Grid item xs={2} sm={2} md={2} >
        <Item>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
      
      <DatePicker
       label="Result Date"
       onChange={handleDateChange1}
       
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
  {GameData.filter((el) => {
  const isTitleNotPresent = !StaringRawData.some((row) => row.g_title === el.g_title);

  if (isTitleNotPresent) {
    return true; // Include this element because its title is not present in StaringRawData
  }

  const isOpenAndCloseNumDeclaredInSomeRows = StaringRawData.some((row) => {
    if (row.g_title === el.g_title) {
      return row.open_num !== "***" && row.close_num !== "***";
    }
    return false; // Exclude this element if its title is found in StaringRawData
  });

  return !isOpenAndCloseNumDeclaredInSomeRows; // Include if the condition is not met for any row
}).map((el, index) => (
  <MenuItem key={index} value={el.g_id}>
    {el.g_title}
  </MenuItem>
))}
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
        
          <Box sx={{ minWidth: 120,padding:"7px" }}>
          <Button size='large' style={{width:"120px"}} onClick={handelSearchFilter}  variant="contained">Search</Button>
          </Box>
        
        </Item>
      </Grid>
   
  </Grid>
    

    

    


    </Box>
  </Box>
      </CardContent>
    </Card>

   {
    visabel && 
    <Card>
      <CardContent>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    
     

    <Grid item xs={2} sm={5} md={5} >
      <Item>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Panna</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="Panna"
          value={fieldData.Panna}
          onChange={handelResultChange}
        >
          {
             Digits.map((el,index)=>{
              return (
                     <MenuItem key={index} value={el.g_number}>{el.g_number}</MenuItem>
              )
              
            })
          }
        </Select>
      </FormControl>
    </Box>
      </Item>
    </Grid>
    
    <Grid item xs={2} sm={3} md={3} >
      <Item>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Digit</InputLabel> */}
          <TextField
           label="Digit"
           name="Digit"
           value ={fieldData.Digit}
          
          />

          
      </FormControl>
    </Box>
      </Item>
    </Grid>


   

    <Grid item xs={2} sm={2} md={2} >
      <Item>
      
        <Box sx={{ minWidth: 120,padding:"7px" }}>
        <Button size='large' style={{width:"120px"}} onClick={resultSubmit}  variant="contained">Submit</Button>
        </Box>
      
      </Item>
    </Grid>
 
</Grid>
      </CardContent>
    </Card>
   } 



    <Card>
      <CardContent>
      <Box>
    <Box>
      <Typography variant='h6'>Game Result History</Typography>
    </Box>
    <Box sx={{marginTop:"30px",display:"flex",alignItems:"center"}}>
    <LocalizationProvider dateAdapter={AdapterDayjs} >
    
    <DatePicker 
    label="Date"
     onChange={handleDateChange}
    />
 
  </LocalizationProvider>

      <Button  sx={{marginLeft:"20px"}} variant="contained" onClick={handleSearch}><SearchIcon sx={{marginRight:"10px"}} /> Search</Button>
      <Button sx={{marginLeft:"20px"}} variant="outlined" onClick={handleResetFilter}> <FilterAltIcon sx={{marginRight:"10px"}} />Reset Filter</Button>
    </Box>
  </Box>
      </CardContent>
    </Card>
  
      <GenralTabel column={column}   rows={filteredRows}/>
  </div>
  )
}
