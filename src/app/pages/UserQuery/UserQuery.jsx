import React, { useEffect } from 'react'
import { GenralTabel } from '../../TabelComponents/GenralTable';
import { Base_Url2 } from '../../Config/BaseUrl';
import axios from 'axios';
import { Box, Button, Card, CardContent, TextField, Typography,InputAdornment, SwipeableDrawer } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const column=[
  {name:"ID"},
  {name:"Date"},
  {name:"Name"},
  {name:"Number"},
  {name:"Query"},
  
]
export const UserQuery = () => {
  const Token = sessionStorage.getItem('token') || null
  const row=[
    {Id:1,Date:"dflsjkd",UserNAme:"akshay",Complain:"dkgfasjda"}
  ]
  const [filteredRows, setFilteredRows] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState('');
  const [ComaplainData,setComaplainData] = React.useState('');
  const fetchUserWithdrwalRequest =async()=>{
    try {
      // setIsLoading(true);
      const response = await axios.get(
        `${Base_Url2}complaint`,
      
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" :`Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;
      console.log("POST request response complain Reues Data:", data);
        if(data.post && data !== undefined){
         
            const formattedData = data.post.map((item) => ({
           "ID":item.cm_id,
           "Date":item.date,
           "User_Name":item.user_name ,
           "User_Number":item.user_number,
           "Complain":item.msg,
           
       }));
  
     
      
       setComaplainData(formattedData);
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

  const handleSearch = () => {
    const filteredData = ComaplainData.filter((row) =>
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
    setFilteredRows(ComaplainData);
  };

  useEffect(()=>{
    fetchUserWithdrwalRequest()
  },[])
  return (
    <div>
      <Card>
        <CardContent>
        <Box>
      <Box>
        <Typography variant='h6'>USER QUERY LIST</Typography>
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
    </div>
  )
}
