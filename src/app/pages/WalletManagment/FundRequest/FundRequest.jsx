



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

const column=[
  {name:"ID"},
  {name:"Date"},
  {name:"User Name"},
 
  {name:"Transaction Id"},
  {name:"Amount"},
  {name:"Receipt"},

  {name:"Staus"},
  {name:"Active"}
  
]

const Item = styled(Box)(() => ({
 
  textAlign: 'center',
  color:"black",
}));

export const FundRequest = () => {

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const rows=[
    {ID:"1",Date:"2 Aug 2023",User_Name:"Anshul",Transaction_Id:"23122",Amount:"500",Receipt:<Button size='small'  variant="contained" >Receipt</Button>,Staus:<Button size='small' color='success' variant="contained" >Approve</Button>,Active:<Button size='small' color='success' variant="contained" >Approved</Button>},
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
 const [filteredRows, setFilteredRows] = React.useState(rows);

 const handleSearch = () => {
  const filteredData = rows.filter((row) =>
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
        <Typography variant='h6'>ADD FUND REQUEST LIST</Typography>
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
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer>
  </div>
  )
}
