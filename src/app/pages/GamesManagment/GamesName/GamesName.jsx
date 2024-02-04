
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

export const GamesName = () => {
  const Token = sessionStorage.getItem('token') || null
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const toggleDrawer2 = (anchor, open) => (event) => {
    setStateTime({ ...state, [anchor]: open });
  };


  
  const rows=[
    {ID:"1",Game_Name:"Milan Morning",Game_Name_Hindi:"Singel Digit",Today_Open:"10:00 Am",Today_Close:"2:00 Pm",
    Active:<Button size='small' variant="contained" color='success' >Yes</Button>,
    Market_Status:<Button size='small' variant="contained" color='success' >Today Open</Button>,
    Action:<Typography><EditIcon onClick={toggleDrawer('right', true)} style={{fontSize:"30px"}} /> <HorizontalRuleIcon/> <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} /></Typography>},
 ]
 const [age, setAge] = React.useState('');
 const [state, setState] = React.useState({
  top: false,
  left: false,
  bottom: false,
  right: false,
});
const [GameData,setGameData] = React.useState([]);

const [update,setUpdate] = React.useState(0);
const [stateTime, setStateTime] = React.useState({
  top: false,
  left: false,
  bottom: false,
  right: false,
});
 const handleChange = (event) => {
   setAge(event.target.value);
 };
 const [searchInput, setSearchInput] = React.useState('');
 const [filteredRows, setFilteredRows] = React.useState([]);
const initialValues ={
  gameName: '',
  gameNameHindi: '',
  shortOrder: '',
  openTime: '',
  closeTime: '',
}

const EditValues={
close_t:"",
g_id:"",
g_name_hindi: "",
g_title: "",
maket_status:"",
open_t:"",
status:"",
}
 const [formData, setFormData] = React.useState(initialValues);
 const [EditGameData,setEditGameData] = React.useState(EditValues);
 const [editDrawer,setEditDrawer] = React.useState(false);
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
    console.log("POST request response:", data);
      if(data.post && data !== undefined){
       
          const formattedData = data.post.map((item) => ({
         "ID":item.g_id,
         "Game_Name":item.g_title ,
         "Game_Name_Hindi":item.g_name_hindi,
         "Today_Open":item.open_t,
         "Today_Close":item.close_t,
         "Active":item.status === "1" ? <Button size='small' onClick={()=>handelStausChange(item.g_id,"0")} variant="contained" color='success' >Yes</Button> : <Button size='small' onClick={()=>handelStausChange(item.g_id,"1")} variant="contained" color='error' >No</Button>,
         "Market_Status":item.maket_status === "1" ? <Button size='small' onClick={()=>handelMarketStausChange(item.g_id,"0")} variant="contained" color='success' >Today Open</Button> : <Button size='small' variant="contained" onClick={()=>handelMarketStausChange(item.g_id,"1")} color='error' >Today Close</Button>,
         "Action":<Typography><EditIcon onClick={()=>handelEditOpen(item.g_id)} style={{fontSize:"30px"}} /></Typography>,
        //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
     }));

   
     
        setGameData(formattedData);
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

const GetGameByID=async(id)=>{
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}users/g_id/${id}`,
    
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request response Edit Data:", data);
      if(data.client && data !== undefined){
        setEditGameData(data.client);
       
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

const handelEditOpen =(id)=>{
  setState({ ...state, right: true });
  console.log("Edit Id",id)
  GetGameByID(id)
  

}

const handelEditClose =()=>{
  setState({ ...state, right: false });
  setEditGameData(initialValues)
}

const handelGameSubmit = async()=>{
  try {
    const formData1= new FormData();
    formData1.append("g_title",formData.gameName)
    formData1.append("g_name_hindi",formData.gameNameHindi)
    formData1.append("open_t",formData.openTime)
    formData1.append("close_t",formData.closeTime)
    formData1.append("status","1")
    formData1.append("maket_status","1")
    // setIsLoading(true);
    const response = await axios.post(
      
      `${Base_Url2}users/service_add`,
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
     
    setFormData(initialValues);
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

const GameUpdate=async(id)=>{
  try {
    const formData1= new FormData();
    formData1.append("g_title",EditGameData.g_title)
    formData1.append("g_name_hindi",EditGameData.g_name_hindi)
    formData1.append("open_t",EditGameData.open_t)
    formData1.append("close_t",EditGameData.close_t)
    formData1.append("status",EditGameData.status)
    formData1.append("maket_status",EditGameData.maket_status)
    // setIsLoading(true);
    const response = await axios.post(
      
      `${Base_Url2}users/g_update/${id}`,
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
     
    setEditGameData(EditValues);
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

const handelStausChange=async(id,value)=>{
  const formData1= new FormData();
  try {
    
    formData1.append("status",value)
   
    // setIsLoading(true);
    const response = await axios.post(
      
      `${Base_Url2}users/g_published/${id}`,
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

const handelMarketStausChange=async(id,value)=>{
  const formData1= new FormData();
  try {
    
    formData1.append("maket_status",value)
   
    // setIsLoading(true);
    const response = await axios.post(
      
      `${Base_Url2}users/g_market/${id}`,
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

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handleInputChangeEdit=(e)=>{
  const { name, value } = e.target;
  setEditGameData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
}


 const handleSearch = () => {
  const filteredData = GameData.filter((row) =>
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
  setFilteredRows(rows);
};

const handelGameUpdate =async(id)=>{
  console.log("id update",id)
  GameUpdate(id);
  handelEditClose()
}

const list = (anchor) => (
  <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 , padding:"10px"}}
    role="presentation"
    
  >
  
  <Box sx={{ minWidth: 120 ,marginTop:"40px"}}>
        
        <FormControl fullWidth>
       
        
        <Box style={{textAlign:"left"}}>Game Name</Box>
          <TextField
          id='g_title'
          name='g_title'
          type='text'
          value={EditGameData.g_title}
          onChange={handleInputChangeEdit}
          />         
        
                      
                     
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120,marginTop:"40px" }}>
        
        <FormControl fullWidth>
       
        
        <Box style={{textAlign:"left"}}>Game Name In Hindi</Box>
          <TextField
           id='g_name_hindi'
           name='g_name_hindi'
          type='text'
          value={EditGameData.g_name_hindi}
          onChange={handleInputChangeEdit}
          />         
        
                      
                     
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120 ,marginTop:"40px"}}>
        
      <FormControl fullWidth>
       
        
       <Box style={{textAlign:"left"}}>Open Time</Box>
         <TextField
         id='open_t'
         name='open_t'
         type='text'
        
         value={EditGameData.open_t}
           onChange={handleInputChangeEdit}
         />         
       
                     
                    
       </FormControl>
      </Box>

      <Box sx={{ minWidth: 120 ,marginTop:"40px"}}>
        
      <FormControl fullWidth>
       
        
       <Box style={{textAlign:"left"}}>Close Time</Box>
         <TextField
         id='close_t'
         name='close_t'
         type='text'
         placeholder='Close Time'
         value={EditGameData.close_t}
           onChange={handleInputChangeEdit}
         />         
       
                     
                    
       </FormControl>
      </Box>

      <Box sx={{display:"flex",justifyContent:"center",marginTop:"40px" }}>
        
        <Button variant="contained" onClick={()=>handelGameUpdate(EditGameData.g_id)}>Update</Button>
      </Box>
      
  </Box>
);

const WeekData=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const listTime = (anchor) => (
  <Box
    sx={{ width:"500px",padding:"10px"}}
    role="presentation"
    
  >
  <Box marginTop="30px">

{WeekData.map((el,index)=>{
  return (
    <Box key={index} sx={{marginTop:"20px"}}>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
    
    <Grid item xs={12} sm={4} md={4} >
          <Item>
            
          <Box sx={{display:"flex",justifyContent:"left",alignItems:"center"}}>
          
          <Checkbox/>
         
          
          <Box style={{textAlign:"center"}}>{el}</Box>
                    
          
                        
                       
          
        </Box>
          
          </Item>
        </Grid>
    
        
  
        <Grid item xs={12} sm={4} md={4} >
          <Item>
            
          <Box >
          
          <FormControl fullWidth>
         
          
          <Box style={{textAlign:"left"}}>Open Time</Box>
            <TextField
            type='time'
            placeholder='Open Time'
            />         
          
                        
                       
          </FormControl>
        </Box>
          
          </Item>
        </Grid>
  
        <Grid item xs={12} sm={4} md={4} >
          <Item>
            
          <Box >
          
          <FormControl fullWidth>
         
          
          <Box style={{textAlign:"left"}}>Close Time</Box>
            <TextField
            type='time'
            placeholder='Close Time'
            />         
          
                        
                       
          </FormControl>
        </Box>
          
          </Item>
        </Grid>
    
       
     
         </Grid>
    </Box>
  )
})}

         <Box style={{marginTop:"60px",display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>

          <Button variant="outlined"  onClick={toggleDrawer2('right', false)}>Close</Button>

          <Button variant="contained">Save Changes</Button>
         </Box>


         
  </Box>
  
  
      
  </Box>
);

const inputsL = {
  maxWidth: "100%",
  background: "#f4f5f7",
  border: "1px solid #f4f5f7 ",
  padding: "10px 5px",
};

const handelSubmit =()=>{
  console.log("formData Submit",formData)
  handelGameSubmit();
}

React.useEffect(()=>{
  fetchGameData();
},[update])
  return (
    <div>

    <Card sx={{marginBottom:"30px"}}>
        <CardContent>
        <Box>
      <Box>
        <Typography variant='h6'>ADD GAME</Typography>
      </Box>
      <Box sx={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
  
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
    
     
  
      <Grid item xs={12} sm={12} md={4} >
        <Item>
        <Box >
        <FormControl fullWidth>
        <TextField
               id='gameName'
               name='gameName'
              label='Game Name'
              placeholder='Game Name'
              sx={{ width: '500px' }}
              variant='outlined'
              value={formData.gameName}
            onChange={handleInputChange}
              
            />
        </FormControl>
      </Box>
        </Item>
      </Grid>
  
      <Grid item xs={12} sm={12} md={4} >
        <Item>
        <Box >
        <FormControl fullWidth>
        <TextField
              id='gameNameHindi'
              name='gameNameHindi'
              label='Game Name In Hindi'
              placeholder='Game Name In Hindi'
              sx={{ width: '500px' }}
              variant='outlined'
              value={formData.gameNameHindi}
            onChange={handleInputChange}
              
            />
        </FormControl>
      </Box>
        </Item>
      </Grid>

      <Grid item xs={12} sm={12} md={4} >
        <Item>
        <Box >
        <FormControl fullWidth>
        <TextField
              id='shortOrder'
              name='shortOrder'
              label='Short Order'
              placeholder='Short Order'
              sx={{ width: '500px' }}
              variant='outlined'
              value={formData.shortOrder}
            onChange={handleInputChange}
              
            />
        </FormControl>
      </Box>
        </Item>
      </Grid>

      <Grid item xs={12} sm={12} md={4} >
        <Item>
          
        <Box sx={{ minWidth: 120 }}>
        
        <FormControl fullWidth>
       
        
        <Box style={{textAlign:"left"}}>Open Time</Box>
          <TextField
          id='openTime'
          name='openTime'
          type='time'
          placeholder='Open Time'
          value={formData.openTime}
            onChange={handleInputChange}
          />         
        
                      
                     
        </FormControl>
      </Box>
        
        </Item>
      </Grid>

      <Grid item xs={12} sm={12} md={4} >
        <Item>
          
        <Box sx={{ minWidth: 120 }}>
        
        <FormControl fullWidth>
       
        
        <Box style={{textAlign:"left"}}>Close Time</Box>
          <TextField
          id='closeTime'
          name='closeTime'
          type='time'
          placeholder='Close Time'
          value={formData.closeTime}
            onChange={handleInputChange}
          />         
        
                      
                     
        </FormControl>
      </Box>
        
        </Item>
      </Grid>
  
      <Grid item xs={12} sm={12} md={4} >
        <Item>
        
          <Box sx={{ minWidth: 120,padding:"7px",marginTop:"20px" }}>
          <Button size='large' style={{width:"120px"}} onClick={handelSubmit}  variant="contained">Submit</Button>
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
        <Typography variant='h6'>GAME NAME LIST</Typography>
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

        <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={handelEditClose}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer>


          <SwipeableDrawer
            anchor={'right'}
            open={stateTime['right']}
            onClose={toggleDrawer2('right', false)}
            onOpen={toggleDrawer2('right', true)}
          >
            {listTime('right')}
          </SwipeableDrawer>
    </div>
  )
}
