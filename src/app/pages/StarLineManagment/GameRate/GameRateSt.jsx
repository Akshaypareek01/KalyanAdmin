
import * as React from 'react';

import { Box, Button, Card, CardContent, TextField, Typography,InputAdornment,SwipeableDrawer, Checkbox } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useNavigate } from 'react-router-dom';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { GenralTabel } from '../../../TabelComponents/GenralTable';
import EditIcon from '@mui/icons-material/Edit';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { Base_Url2 } from '../../../Config/BaseUrl';
import axios from 'axios';
const column=[
  {name:"ID"},
 
  {name:"Game Name"},
  {name:"Game Name Hindi"},
  {name:"Today Open"},
  {name:"Today Close"},
  {name:"Active"},
  {name:"Market Status"},
  {name:"Action"},
  
]

const Item = styled(Box)(() => ({
 
  textAlign: 'center',
  color:"black",
}));

export const GameRateSt = () => {
  const Token = sessionStorage.getItem('token') || null
  const initalData=[
    {name:"Singel Digit",point:"10",Amount:"95"},
    {name:"Jodi  Digit",point:"10",Amount:"950"},
    {name:"Single Panna",point:"10",Amount:"1400"},
    {name:"Double Panna",point:"10",Amount:"2800"},
    {name:"Tripple Panna",point:"10",Amount:"7000"},
    {name:"Half Sangam",point:"10",Amount:"10000"},
    {name:"Full Sangam",point:"10",Amount:"100000"},
   
  ]
  const [RateData,setRateData] = React.useState(null)
  const [update,setUpdate] = React.useState(0);
  // const [EditRateData,setEditRateData] = React.useState();
const fetchGameDataRate =async()=>{
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}user_rates`,
    
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request response Rate:", data);
      if(data.rate && data !== undefined){
       
        setRateData(data.rate[0])
           
      }
      
    return data;
    // Handle success
  } catch (error) {
    console.error("Error sending POST request:", error);
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setRateData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handelRateSubmit = async()=>{
  try {
    const formData1= new FormData();
    formData1.append("Double_Panna_Amount",RateData.Double_Panna_Amount)
    formData1.append("Double_Panna_Point",RateData.Double_Panna_Point)
    // formData1.append("Full_Sangam_Amount",RateData.Full_Sangam_Amount)
    // formData1.append("Full_Sangam_Point",RateData.Full_Sangam_Point)
    // formData1.append("Half_Sangam_Amount",RateData.Half_Sangam_Amount)
    // formData1.append("Half_Sangam_Point",RateData.Half_Sangam_Point)
    // formData1.append("Jodi_Digit_Amount",RateData.Jodi_Digit_Amount)
    // formData1.append("Jodi_Digit_Point",RateData.Jodi_Digit_Point)
    formData1.append("Single_Digit_Amount",RateData.Single_Digit_Amount)
    formData1.append("Single_Digit_Point",RateData.Single_Digit_Point)
    formData1.append("Single_Panna_Amount",RateData.Single_Panna_Amount)
    formData1.append("Single_Panna_Point",RateData.Single_Panna_Point)
    formData1.append("Tripple_Panna_Amount",RateData.Tripple_Panna_Amount)
    formData1.append("Tripple_Panna_Point",RateData.Tripple_Panna_Point)
    // setIsLoading(true);
    const response = await axios.post(
      
      `${Base_Url2}user_rates_u`,
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
     
     
        // setIsLoading(false);
        // console.log(data.post)
           
  
      
    return data;
    // Handle success
  } catch (error) {
    console.error("Error sending POST request:", error);
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}

const handelSave=()=>{
  console.log("Save",RateData);
  handelRateSubmit();
}
React.useEffect(()=>{
  fetchGameDataRate();
},[update])

  return (
    <div>

    <Card sx={{marginBottom:"30px"}}>
        <CardContent>
          <Box>
            <Typography variant="h5">Game Rates</Typography>
          </Box>
          <Box  sx={{marginTop:"20px"}}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
        {RateData !== null && Object.entries(RateData).map(([key, value], index)=>{
          if(key !== "gsr_id"){
            return (
              
              
              
                  
            
                  <Grid key={index} item xs={6} sm={6} md={6} >
                    <Item>
                      
                    <Box >
                    
                    <FormControl fullWidth>
                   
                    
                    <Box style={{textAlign:"left"}}>{key}</Box>
                      <TextField
                      name={key}
                      id={key}
                      type='text'
                      value={value}
                      onChange={handleInputChange}
                      />         
                    
                                  
                                 
                    </FormControl>
                  </Box>
                    
                    </Item>
                  </Grid>
            
                  
              
                 
               
                 
            )
          }
  
})}
  </Grid>
              </Box>

<Box marginTop="50px" display="flex" justifyContent="center" alignItems="center">
  <Button size='large' variant="contained" onClick={handelSave}>Save</Button>
</Box>
        </CardContent>
      </Card>
  
      
    
        
    </div>
  )
}
