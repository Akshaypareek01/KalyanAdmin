import * as React from 'react';

import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
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
import axios from 'axios';
import { Base_Url2 } from '../../../Config/BaseUrl';
import { GenralTabel } from '../../../TabelComponents/GenralTable';

const column=[
  {name:"ID"},
  {name:"Game Name"},
  {name:"Result Date"},
  {name:"Result Declare Date"},
  {name:"Result"}
  
]

const Item = styled(Box)(() => ({
 
  textAlign: 'center',
  color:"black",
}));

export const ResultHistory = () => {
  const Token = sessionStorage.getItem('token') || null
  const navigate = useNavigate();
  const getCurrentDate = () => {
    const currentDate = new Date();
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return currentDate.toLocaleDateString(undefined, options);
  };
  const getCurrentDate2 = () => {
    const currentDate = new Date();
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
  
    // Split the formattedDate and rearrange it to "MM-DD-YYYY" format
    const parts = formattedDate.split('/');
    const formattedDateString = `${parts[0]}-${parts[1]}-${parts[2]}`;
  
    return formattedDateString;
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
 
  const [resultFromValues,setResultFromValues] = React.useState()
  const [visabel,setVisabel] = React.useState(false);
  const [Digits,setDigits]=React.useState([]);
  const [update,setUpdate]=React.useState(0);
 const handleSearch = () => {
  const filteredData = rawData.filter((row) =>
    Object.values(row)
      .filter((value) => typeof value === 'string') // Filter only string values
      .some((value) =>
        value.toLowerCase().includes(searchInput.toLowerCase())
      )
  );
  setFilteredRows(filteredData);
};

const fetchGameData =async()=>{
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}sgame`,
    
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    
      if(data.game && data !== undefined){
       
        console.log("POST request response games in bid:", data);
   
     
        setGameData(data.game);
       
           
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
    console.error("Error sending POST request:", error);
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}

const fetchResultData =async()=>{
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}sresult_admin`,
    
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
          const formattedData = data.game.map((item) => ({
         "sno":item.re_id,
         "GameName":item.g_title ,
         "ResultDate":item.result_date,
         "Result_Declare_Date":item.open_date,
         "Result":<Typography>{item.open_num}-{item.start}</Typography>,
         
        //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
     }));

   
     
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

const AddResultData =async()=>{
  const formdata= new FormData();
  formdata.append("Panna",fieldData.Panna)
  formdata.append("g_id",formValues.gameID)
  formdata.append("date",formValues.resultDate)
  try {
    // setIsLoading(true);
    const response = await axios.post(
      `${Base_Url2}sresult/result_add`,
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
  setFilteredRows(rawData);
};

const handelSearchFilter =()=>{
  console.log("Search values game result",formValues)
  if(formValues.gameID !== ""){
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
  AddResultData()
}



React.useEffect(()=>{
  fetchResultData();
  fetchGameData();

},[update])
  return (
    <div>

  

   



    <Card>
      <CardContent>
      <Box>
    <Box>
      <Typography variant='h6'>Game Result History</Typography>
    </Box>
   
  </Box>
      </CardContent>
    </Card>
  
      <GenralTabel column={column}   rows={filteredRows}/>
  </div>
  )
}
