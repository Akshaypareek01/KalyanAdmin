import { Box, Card, CardContent, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { Base_Url2 } from '../../../Config/BaseUrl';
import axios from 'axios';

export const SingelDigit = () => {
  const id ="1";
  const [Digits,setDigits]=useState([]);
  const generateNumberArray = (start, end) => {
    const numberArray = [];
    for (let i = start; i <= end; i++) {
      numberArray.push(i.toString());
    }
    return numberArray;
  };

  const numbers = generateNumberArray(0, 9);
  const fetchSingelDigit =async()=>{
    try {
     
      const response = await axios.get(
        `${Base_Url2}number/num_gt_id/${id}`,
      
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

  useEffect(()=>{
    fetchSingelDigit();
  },[])
  return (
    <Box>
      <Card>
        <CardContent>
          <Box>
            <Typography variant='h3'>Singel Digit</Typography>
          </Box>

           <Box display="flex" flexWrap="wrap" marginTop="30px" justifyContent="space-around" alignItems="center">
           {
            Digits.map((el,index)=>{
              return (
                <Box key={index} sx={{width:"50px",height:"50px",backgroundColor:"#D7BBF5",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"10px"}}>
                <Typography variant='h4' color="black">{el.g_number}</Typography>
               </Box>
                 )
            })
           }
              
           
           
           </Box>
          
        </CardContent>
      </Card>
    </Box>
  )
}
