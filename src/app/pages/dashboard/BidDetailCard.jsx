import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React, { useState } from 'react'

export const BidDetailCard = (props) => {
    const {Ank,TotalBid,TotalAmount,Color} = props
   
  return (
  
   <Card >
    
    <CardContent>
        <Box style={{display:"flex",justifyContent:"center",alignItem:"center",borderBottom:`1px solid ${Color}`,height:"40px"}}>
            <Typography style={{fontWeight:"500",fontSize:20,fontFamily:"sans-serif",color:Color}}>Totlal Bid {TotalBid}</Typography>
        </Box>

        <Box  height="90px"  style={{display:"flex",justifyContent:"center",alignItem:"center"}}>
            <Box  display={"flex"} alignItems={"center"} >
            <Box textAlign={"center"}>
            <Typography style={{fontWeight:"500",fontSize:26,fontFamily:"sans-serif"}}>{TotalAmount}</Typography>
            <Typography style={{fontWeight:"500",fontSize:16,fontFamily:"sans-serif",letterSpacing:3}}>Total Bid Amount</Typography>
            </Box>
            
            </Box>
            
        </Box>

<Box style={{display:"flex",justifyContent:"center",alignItem:"center",height:"40px" ,backgroundColor:Color}}>
   
<Box  display={"flex"} alignItems={"center"} >
            <Box textAlign={"center"}>
            <Typography style={{fontWeight:"500",fontSize:18,fontFamily:"sans-serif",color:"#fff"}}>Ank {Ank}</Typography>
      
            </Box>
            
            </Box>
   
    
</Box>

     
    </CardContent>
   </Card>
  
  )
}
