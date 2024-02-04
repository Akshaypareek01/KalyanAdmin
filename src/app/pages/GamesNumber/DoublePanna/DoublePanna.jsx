

import { Box, Card, CardContent, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { Base_Url2 } from '../../../Config/BaseUrl';
import axios from 'axios';

export const DoublePanna = () => {
  const id ="4";
  const [Digits,setDigits]=useState([]);
  
  const generateNumberArray = (start, end) => {
    const numberArray = [];
    for (let i = start; i <= end; i++) {
      numberArray.push(i.toString());
    }
    return numberArray;
  };

  const numbers = generateNumberArray(0, 9);
  const fetchPannaDigit =async()=>{
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
    fetchPannaDigit();
  },[])
  return (
    <Box>
    <Card>
      <CardContent>
        <Box>
          <Typography variant='h3'>Double Panna Numbers</Typography>
        </Box>
        {
          numbers.map((el,index)=>{
            return (
              <Box key={index+el}>
              <Box>
                  <Box>
                  <Typography variant='h5' marginBottom="10px" fontWeight="bold" marginTop="20px">Singel Ank</Typography>
                  </Box>
                  
    
                  <Box  sx={{width:"60px",height:"60px",backgroundColor:"#FFBFBF",margin:"20px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"10px"}}>
                    <Typography variant='h4' color="black">{el}</Typography>
                   </Box>
                </Box>
               <Box display="flex" flexWrap="wrap" marginTop="30px" justifyContent="left" alignItems="center">
               {
                Digits.map((value,index)=>{
                 if(value.single_ank === el){
                  return (
                    <Box key={index} sx={{width:"60px",height:"60px",margin:"20px",backgroundColor:"#D7BBF5",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"10px"}}>
                    <Typography variant='h4' color="black">{value.g_number}</Typography>
                   </Box>
                     )
                 }
                 
                })
               }
                  
               
               
               </Box>
              </Box>
            )
          })
        }
       
         
        
      </CardContent>
    </Card>
  </Box>
  )
}
