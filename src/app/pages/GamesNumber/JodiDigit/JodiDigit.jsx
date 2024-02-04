

import { Box, Card, CardContent, Typography } from '@mui/material'
import axios from 'axios';

import React, { useEffect, useState } from 'react'
import { Base_Url2 } from '../../../Config/BaseUrl';

export const JodiDigit = () => {
  const id ="2";
  const [JodiDigits,setJodiDigits]=useState([]);
  const fetchJodiDigit =async()=>{
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
          setJodiDigits(data.client);
          
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
    fetchJodiDigit();
  },[])
  return (
    <Box>
      <Card>
        <CardContent>
          <Box>
            <Typography variant='h3'>Jodi Digit</Typography>
          </Box>

           <Box display="flex" flexWrap="wrap" marginTop="30px" justifyContent="left" alignItems="center">
           {
            JodiDigits.map((el,index)=>{
              return (
                <Box key={index} sx={{width:"50px",height:"50px",margin:"30px",backgroundColor:"#D7BBF5",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"10px"}}>
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
