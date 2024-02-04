import * as React from 'react';
import { GenralTabel } from '../../TabelComponents/GenralTable';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base_Url2 } from '../../Config/BaseUrl';
const column=[
   {name:"Sno"},
   {name:"Date"},
   {name:"Name"},
   {name:"Mobile No."},
   {name:"Balance"},
   {name:"Batting"},
   {name:"Transfer"},
   {name:"Active"},
   {name:"View"},
   
]


export const UserManagment = () => {
  const Token = sessionStorage.getItem('token') || null
  const navigate = useNavigate();
  const handelViewClick=(id)=>{
   
      console.log("🚀 ~ file: Chargers.jsx:22 ~ handelClick ~ e:",id)
       navigate(`/user/view/${id}`);
   
  }

  const rows=[
    {sno:"1",Date:"26/12/2023",name:"Anshul",email:"anshul09@gmail.com",mobile:"9876123412",balance:"40",
    Batting:<Button variant="contained" color="success">YES</Button>,
    transfer:<Button variant="outlined" color="error">No</Button>,
    active:<Button variant="contained" color="success">YES</Button>,
    view:<VisibilityIcon onClick={()=>{handelViewClick(2)}}/>},
    {sno:"2",Date:"26/12/2023",name:"Bhavya",email:"Bhavya@gmail.com",mobile:"95673412",balance:"40",Batting:<Button variant="contained" color="success">YES</Button>,transfer:<Button variant="outlined" color="error">No</Button>,active:<Button variant="contained" color="success">YES</Button>,view:<VisibilityIcon onClick={()=>{handelViewClick(2)}}/>},
    {sno:"3",Date:"26/12/2023",name:"Sinu",email:"Sinu@gmail.com",mobile:"9866123412",balance:"40",Batting:<Button variant="contained" color="success">YES</Button>,transfer:<Button variant="outlined" color="error">No</Button>,active:<Button variant="contained" color="success">YES</Button>,view:<VisibilityIcon onClick={()=>{handelViewClick(2)}}/>},
    {sno:"4",Date:"26/12/2023",name:"Anshul1",email:"Anshul109@gmail.com",mobile:"9876856412",balance:"40",Batting:<Button variant="contained" color="success">YES</Button>,transfer:<Button variant="outlined" color="error">No</Button>,active:<Button variant="contained" color="success">YES</Button>,view:<VisibilityIcon onClick={()=>{handelViewClick(2)}}/>},
    {sno:"5",Date:"26/12/2023",name:"Aman",email:"Aman09@gmail.com",mobile:"9823453412",balance:"40",Batting:<Button variant="contained" color="success">YES</Button>,transfer:<Button variant="outlined" color="error">No</Button>,active:<Button variant="contained" color="success">YES</Button>,view:<VisibilityIcon onClick={()=>{handelViewClick(2)}}/>},
 ]

 const [searchInput, setSearchInput] = React.useState('');
 const [filteredRows, setFilteredRows] = React.useState(null);
 const [UsersData,setUsersData] = React.useState([]);
 const [update,setUpdate] = React.useState(0);

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
       
          const formattedData = data.game.map((item) => ({
         "sno":item.user_id,
         "Date":item.date ,
         "name":item.name,
         "mobile":item.number,
         "balance":item.Balance,
         "Batting":item.Batting === "1" ? <Button onClick={()=>handelBattingStausChange(item.user_id,"0")} variant="contained" color="success">YES</Button> : <Button  onClick={()=>handelBattingStausChange(item.user_id,"1")} variant="contained" color="error">No</Button>,
         "transfer":<Button variant="outlined" color="error">No</Button>,
         "active":item.status === "1" ? <Button variant="contained" onClick={()=>handelStausChange(item.user_id,"0")} color="success">Active</Button> : <Button onClick={()=>handelStausChange(item.user_id,"1")} variant="contained" color="error">In Active</Button> ,
         "view":<VisibilityIcon onClick={()=>{handelViewClick(item.user_id)}}/>
        //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
     }));

   
     
     setUsersData(formattedData);
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

const handelStausChange=async(id,value)=>{
  const formData1= new FormData();
  try {
    
    formData1.append("status",value)
   
    // setIsLoading(true);
    const response = await axios.post(
      
      `${Base_Url2}user_m_activity/${id}`,
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
    
  }
}

const handelBattingStausChange=async(id,value)=>{
  const formData1= new FormData();
  try {
    
    formData1.append("status",value)
   
    // setIsLoading(true);
    const response = await axios.post(
      
      `${Base_Url2}user_m_Batting/${id}`,
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
    
  }
}

 const handleSearch = () => {
  const filteredData = UsersData.filter((row) =>
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
  setFilteredRows(UsersData);
};

React.useEffect(()=>{
  fetchUserData()
},[update])
  return (
    <div>
      <Card>
        <CardContent>
        <Box>
      <Box>
        <Typography variant='h6'>User Search Filter</Typography>
      </Box>
      <Box sx={{marginTop:"30px",display:"flex",alignItems:"center"}}>
      <TextField
              id='filled-textarea'
              label='Search'
              placeholder='Search By Name, Email, Number'
              sx={{ width: '500px' }}
              variant='outlined'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

        <Button  sx={{marginLeft:"20px"}} variant="contained" onClick={handleSearch}><SearchIcon sx={{marginRight:"10px"}} /> Search</Button>
        <Button sx={{marginLeft:"20px"}} variant="outlined" onClick={handleResetFilter}> <FilterAltIcon sx={{marginRight:"10px"}} />Reset Filter</Button>
      </Box>
    </Box>
        </CardContent>
      </Card>

      {
        filteredRows !== null &&  <GenralTabel column={column}   rows={filteredRows}/>
      }
    
        
    </div>
  )
}
