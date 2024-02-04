


import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Base_Url2 } from '../../../Config/BaseUrl';
import axios from 'axios';

export const FullSangam = () => {
 
  const id ="7";
  const [Digits,setDigits]=useState([]);
  
  const generateNumberArray = (start, end) => {
    const numberArray = [];
    for (let i = start; i <= end; i++) {
      numberArray.push(i.toString());
    }
    return numberArray;
  };

  const numbers = generateNumberArray(0, 9);

  const fetchHalfSangamDigit =async()=>{
    try {
     
      const response = await axios.get(
        `${Base_Url2}numberh`,
      
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization" :`Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;
      console.log("POST request response game halfdigit :", data);
        if(data.game && data !== undefined){
          // console.log("POST request response if", data);
          setDigits(data.game);
          
          // console.log(data.post)
             
        }
        
      return data;
      // Handle success
    } catch (error) {
      console.error("Error sending POST request:", error);
      
      
      // Handle error
    }
  }

  useEffect(()=>{
    fetchHalfSangamDigit();
  },[])
  return (
    <Box>
      <Card>
        <CardContent>
          <Box>
            <Typography variant='h3'>Full Sangam Numbers</Typography>
          </Box>

          <Box margin="20px">
            <Typography fontSize="18px" fontWeight="bold">Open Panna</Typography>
           </Box>
           <Box display="flex" flexWrap="wrap" marginTop="30px" justifyContent="left" alignItems="center">
           {
            Digits.map((el,index)=>{
              if(el.panna !== ""){
                return (
                  <Box key={index} sx={{width:"50px",height:"50px",margin:"30px",backgroundColor:"#D7BBF5",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"10px"}}>
                  <Typography variant='h4' color="black">{el.panna}</Typography>
                 </Box>
                   )
              }
             
            })
           }
              
           
           
           </Box>

           <Box margin="20px" borderTop="1px solid grey">
            <Typography fontSize="18px" fontWeight="bold" marginTop="20px">Close Panna</Typography>
           </Box>
           <Box display="flex" flexWrap="wrap" marginTop="30px" justifyContent="left" alignItems="center">
           {
            Digits.map((el,index)=>{
              if(el.panna !== ""){
                return (
                  <Box key={index} sx={{width:"50px",height:"50px",margin:"30px",backgroundColor:"#D7BBF5",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"10px"}}>
                  <Typography variant='h4' color="black">{el.panna}</Typography>
                 </Box>
                   )
              }
             
            })
           }
              
           
           
           </Box>
          
        </CardContent>
      </Card>
    </Box>
  )
}
