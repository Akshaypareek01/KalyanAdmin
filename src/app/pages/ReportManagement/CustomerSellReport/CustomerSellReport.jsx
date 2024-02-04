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

const column=[
  {name:"Digits"},
  {name:"Points"},

  
]

const Item = styled(Box)(() => ({
 
  textAlign: 'center',
  color:"black",
}));
export const CustomerSellReport = () => {
  
  const rows=[
    {Digit:"1",Point:"20"},
 ]
 const [age, setAge] = React.useState('');

 const handleChange = (event) => {
   setAge(event.target.value);
 };
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
  return (
    <div>

<Card sx={{marginBottom:"30px"}}>
      <CardContent>
      <Box>
    <Box>
      <Typography variant='h6'>CUSTOMER SELL REPORT</Typography>
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
        <InputLabel id="demo-simple-select-label">Game Type</InputLabel>
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
      
        <Box sx={{ minWidth: 120,padding:"7px" }}>
        <Button size='large' style={{width:"120px"}}  variant="contained">CHECK</Button>
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
          <div>
          <div style={{height:"50px",border:"1px dashed red",display:"flex",alignItems:"center",justifyContent:"center"}}>
               <Typography variant='h5'>Singel Digit</Typography>
            </div>

            <div>
             <div style={{display:"flex",alignItems:"center"}}>
              <div style={{width:"10%",border:"1px solid red"}}>
                 <div style={{textAlign:"center",padding:"5px"}}>
                  <h6>Digit</h6>
                  </div>

                  <div style={{textAlign:"center",padding:"5px"}}>
                  <h6>Points</h6>
                  
                  </div>
                
              </div>
              <div style={{width:"80%",border:"1px solid red",height:"50px"}}>
                     <div></div>
              </div>
             </div>
            </div>
          </div>
            
        </CardContent>
      </Card>
    </div>
  )
}
