
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
  
]

const Item = styled(Box)(() => ({
 
  textAlign: 'center',
  color:"black",
}));
export const BidWinReport = () => {
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  
 const [age, setAge] = React.useState('');
 const [state, setState] = React.useState({
  top: false,
  left: false,
  bottom: false,
  right: false,
});
 const Token = sessionStorage.getItem('token') || null
 const [searchInput, setSearchInput] = React.useState('');
 const [filteredRows, setFilteredRows] = React.useState([]);
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
 const [WinningAmount,setWinningAmount] = React.useState(0);
 const [totalBidAmount,setTotalBidAmount] = React.useState(0);
 const [profitAmount,setProfitAmount] = React.useState(0);
 const navigate = useNavigate();

 const handleChange = (event) => {
  const { name, value } = event.target;
  setFormValues((prevValues) => ({
    ...prevValues,
    [name]: value,
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

const handelViewClick=(id)=>{
   
  console.log("🚀 ~ file: Chargers.jsx:22 ~ handelClick ~ e:",id)
   navigate(`/user/view/${id}`);

}

const SubmitData =async(Date)=>{
  const formData = new FormData();
  formData.append("date", Date);
  formData.append("g_id",formValues.gameID)
  try {
    // setIsLoading(true);
    const response = await axios.post(
      `${Base_Url2}bid_win`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request response Bid Win Data:", data);
    if(data.post && data !== undefined){
        const MainData=data.post.post
      const formattedData = MainData.map((item) => ({
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
    //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
 }));
 const totalBidAmount = MainData.reduce((accumulator, currentObject) => {
  const amountAsNumber = parseFloat(currentObject.total_amount);
  return accumulator + amountAsNumber;
}, 0);

const totalWinAmount = MainData.reduce((accumulator, currentObject) => {
  const amountAsNumber = parseFloat(currentObject.win_amount !== "" ? currentObject.win_amount : 0 );
  return accumulator + amountAsNumber;
}, 0);
const profitAmount = totalBidAmount - totalWinAmount;

 setRawBidData(MainData)
 setBidData(formattedData);
    setFilteredRows(formattedData)
    setTotalBidAmount(totalBidAmount)
    setWinningAmount(totalWinAmount)
    setProfitAmount(profitAmount)
    // setIsLoading(false);
    // console.log(data.post)
       
  }
      
    return data;
    // Handle success
  } catch (error) {
    console.error("Error sending POST request:", error);
    setFilteredRows([]);
    setTotalBidAmount(0)
    setWinningAmount(0)
    setProfitAmount(0)
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

const handelSearchFilter =()=>{
  console.log("Search values",formValues)
  const formValuesResultDate =formValues.resultDate;
    
  // Parse the itemResultDate and format it as "DD-MM-YYYY"
  // const itemDateParts = itemResultDate.split(' ')[0].split('-');
  // const formattedItemDate = `${itemDateParts[2]}-${itemDateParts[1]}-${itemDateParts[0]}`;
  
  // Parse the formValuesResultDate and format it as "DD-MM-YYYY"
  const formValuesDate = new Date(formValuesResultDate);
  const formattedFormValuesDate = `${(formValuesDate.getMonth() + 1).toString().padStart(2, '0')}-${formValuesDate.getDate().toString().padStart(2, '0')}-${formValuesDate.getFullYear()}`;
  
  // Now, you can compare the two formatted dates
  console.log("FormatedDate",formattedFormValuesDate);
  SubmitData(formattedFormValuesDate)


}
const handelMainSearchReset=()=>{
  setFormValues(initalFormValues2);
  setWinningAmount(0);
  setTotalBidAmount(0);
  setProfitAmount(0);
  setFilteredRows([])


}

React.useEffect(()=>{
  fetchGameData()
},[update])


const list = (anchor) => (
  <Box
    sx={{ width:"100%" , padding:"10px"}}
    role="presentation"
    
  >

     <GenralTabel column={column}   rows={filteredRows}/>
  </Box>
);
  return (
    <div>

<Card sx={{marginBottom:"30px"}}>
        <CardContent>
        <Box>
      <Box>
        <Typography variant='h6'>Bid Win Report</Typography>
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
                       <MenuItem key={index} value={el.g_id}>{el.g_title}</MenuItem>
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
          <Button size='large'  onClick={handelSearchFilter}  variant="contained">Submit</Button>

          <Button size='large' sx={{marginLeft:"20px"}} variant="contained" onClick={handelMainSearchReset}> <FilterAltIcon sx={{marginRight:"10px"}} />Reset</Button>
          </Box>
           
        </Item>
      </Grid>
   
  </Grid>
      
  
      
  
      
  
  
      </Box>
    </Box>
        </CardContent>
      </Card>
  
      <Card >
        <CardContent>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    
    <Grid item xs={6} sm={6} md={6} >
      <Item>
       
         <Box display="flex" justifyContent="space-around" alignItems="center" border="1px dashed crimson" padding="10px" marginTop="60px">
           <Box>
            <Typography variant='h6'>Total Bid Amount </Typography>
           </Box>

           <Box>
            <Typography variant='h6'> ₹ {totalBidAmount}</Typography>
           </Box>
           
 
           <Box>
            <Button size='small' variant="contained" onClick={toggleDrawer('top', true)}>View</Button>
           </Box>
         </Box>

         <Box display="flex" justifyContent="space-around" alignItems="center" border="1px dashed green" padding="10px" marginTop="30px" >
           <Box>
            <Typography variant='h6'>Total Win Amount </Typography>
           </Box>

           <Box>
            <Typography variant='h6'>₹ {WinningAmount}</Typography>
           </Box>

           <Box>
            <Button size='small' style={{visibility:"hidden"}} variant="contained" onClick={toggleDrawer('top', true)}>View</Button>
           </Box>
         </Box>

         {
          profitAmount >= totalBidAmount ?
          <Box display="flex" justifyContent="center" alignItems="center" backgroundColor="green"  padding="10px" marginTop="30px" marginBottom="60px">
          <Box>
           <Typography color="#FFF" variant='h6'>Total Profit Amount : </Typography>
          </Box>

          <Box>
           <Typography color="#FFF" variant='h6'> ₹ {profitAmount }</Typography>
          </Box>

          
        </Box>
        :
        <Box display="flex" justifyContent="center" alignItems="center" backgroundColor="crimson"  padding="10px" marginTop="30px" marginBottom="60px">
           <Box>
            <Typography color="#FFF" variant='h6'>Total Loss Amount : </Typography>
           </Box>

           <Box>
            <Typography color="#FFF" variant='h6'>  ₹ {`(${profitAmount })`}</Typography>
           </Box>

           
         </Box>
         }
         
      </Item>
    </Grid>

    

    

    
 
</Grid>
        </CardContent>
      </Card>
    
        

        <SwipeableDrawer
            anchor={'top'}
            open={state['top']}
            onClose={toggleDrawer('top', false)}
            onOpen={toggleDrawer('top', true)}
          >
            {list('right')}
          </SwipeableDrawer>
    </div>
  )
}
