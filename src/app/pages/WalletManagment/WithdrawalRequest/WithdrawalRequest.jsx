

import * as React from 'react';

import { Box, Button, Card, CardContent, TextField, Typography,InputAdornment, SwipeableDrawer } from '@mui/material';
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

import StarIcon from '@mui/icons-material/Star';
import WineBarIcon from '@mui/icons-material/WineBar';
import { GenralTabel } from '../../../TabelComponents/GenralTable';
import axios from 'axios';
import { Base_Url2 } from '../../../Config/BaseUrl';


const column=[
  {name:"ID"},
  {name:"Date"},
  {name:"User Name"},
  {name:"Mobile"},
  {name:"Transaction Id"},
  {name:"Amount"},
  {name:"Method"},
  {name:"Staus"},
  {name:"Active"}
  
]

const Item = styled(Box)(() => ({
 
  textAlign: 'center',
  color:"black",
}));

export const WithdrawalRequest = () => {
  const Token = sessionStorage.getItem('token') || null
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const rows=[
    {ID:"1",Date:"2 Aug 2023",User_Name:"Anshul",Mobile:"091234568",Transaction_Id:"23122",Amount:"500",Receipt:<Button size='small'  variant="contained" >Receipt</Button>,Method:<Button size='small'  variant="outlined" >Googel pay</Button>,Staus:<Button size='small' color='success' variant="contained" >Approve</Button>,Active:<Button size='small' color='success' variant="contained" >Approved</Button>},
 ]
 const [age, setAge] = React.useState('');

 const handleChange = (event) => {
   setAge(event.target.value);
 };

 const [state, setState] = React.useState({
  top: false,
  left: false,
  bottom: false,
  right: false,
});
const [searchInput, setSearchInput] = React.useState('');
const [withdrwalData,setWithdrwalData] = React.useState('');
const [filteredRows, setFilteredRows] = React.useState(null);
const [update,setUpdate] = React.useState(0);
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

 const list = (anchor) => (
  <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 , padding:"10px"}}
    role="presentation"
    
  >

      <Box marginTop="30px">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> Select </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </Box>

      <Box display="flex" justifyContent="space-around" alignItems="center" marginTop="40px">
        <Button   variant="contained">Close</Button>
        <Button  variant="contained">Save Changes</Button>
      </Box>
  </Box>
);



const fetchUserWithdrwalRequest =async()=>{
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
    console.log("POST request response Withrwal Reues Data:", data);
      if(data.post && data !== undefined){
       
          const formattedData = data.post.map((item) => ({
         "ID":item.wd_id,
         "Date":item.date,
         "User_Name":<Typography style={{color:"blue"}} onClick={()=>handelViewClick(item.user_id)}>{item.user_name}</Typography>,
         "Mobile":item.number,
         "Transaction_Id":2000 + item.pm_id+101+item.wd_id,
         "Amount":item.amount,
         "Method":item.name,
         "Staus":item.status_wd === "1" ? (
          <Button variant="contained" color="success">
            Approved
          </Button>
        ) : item.status_wd === "0" ? (
          <Button variant="contained" color="secondary">
            Pending
          </Button>
        ) : item.status_wd === "2" ? (
          <Button variant="contained" color="error">
            Rejected
          </Button>
        ) : null,
         "Active":item.status_wd === "0" ?<Typography>
          <Button variant="contained" onClick={()=>handelStausChange(item.wd_id,"1")} color="info">
         Approve
       </Button>

       <Button variant="contained" onClick={()=>handelStausChange(item.wd_id,"2")}  style={{marginLeft:10}} color="error">
         Reject
       </Button>
       </Typography> : <Button variant="outlined" color="warning">
         View
       </Button>,
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
const handelStausChange=async(id,value)=>{
  const formData1= new FormData();
  try {
    
    formData1.append("status_wd",value)
   
    // setIsLoading(true);
    const response = await axios.post(
      
      `${Base_Url2}cart/wd_approve/${id}`,
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

React.useEffect(()=>{
  fetchUserWithdrwalRequest()
},[update])

  return (
    <div>

  {/* <Card sx={{marginBottom:"30px"}}>
      <CardContent>
      <Box>
    <Box>
      <Typography variant='h6'>WINNING PREDICTION</Typography>
    </Box>
    <Box sx={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>

    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  
    <Grid item xs={2} sm={2} md={2} >
      <Item>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
    
    <DatePicker label="Result Date" />
 
  </LocalizationProvider>
      </Item>
    </Grid>

    <Grid item xs={2} sm={3} md={3} >
      <Item>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> Game Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
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
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}></MenuItem>
          <MenuItem value={20}>Open Market</MenuItem>
          <MenuItem value={30}>Close Market</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </Item>
    </Grid>

    <Grid item xs={2} sm={2} md={2} >
      <Item>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Open Panna</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}></MenuItem>
          <MenuItem value={20}>Open</MenuItem>
          <MenuItem value={30}>Close</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </Item>
    </Grid>

    <Grid item xs={2} sm={2} md={2} >
      <Item>
      
        <Box sx={{ minWidth: 120,padding:"7px" }}>
        <Button size='large' style={{width:"120px"}}  variant="contained">CHECK</Button>
        </Box>
      
      </Item>
    </Grid>
 
</Grid>
    

    

    


    </Box>
  </Box>
      </CardContent>
    </Card> */}

<Card>
        <CardContent>
        <Box>
      <Box>
        <Typography variant='h6'>WITHDRAW FUND REQUEST LIST</Typography>
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
  
  {
    filteredRows !== null && <GenralTabel column={column}   rows={filteredRows}/>
  }
      

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
