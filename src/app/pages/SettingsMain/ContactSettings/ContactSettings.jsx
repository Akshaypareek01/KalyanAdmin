import React from 'react'
import { Box, Button, Card, CardContent, Grid, TextField, Typography, styled } from "@mui/material";
export const ContactSettings = () => {
  return (
    <Grid
    container
    spacing={{ xs: 2, md: 3 }}
    columns={{ xs: 4, sm: 8, md: 12 }}
  >
    <Grid item xs={2} sm={12} md={12}>
   
        <Card>
          <CardContent>
            <Box textAlign={"center"}>
              <Typography variant="h5">Contact Settings</Typography>
            </Box>
            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Mobile Number eg.9876543210" />
            </Box>

            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Mobile Number 2 (Optional)" />
            </Box>

            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="WhatsApp Number" />
            </Box>

            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Landline 1 (Optional) eg.0141-9999999" />
            </Box>

            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Landline 2 (Optional)" />
            </Box>

            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Email 1" />
            </Box>

            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Email 2 (Optional)" />
            </Box>

            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Facebook (Optional)" />
            </Box>

            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Twitter (Optional)" />
            </Box>

            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Youtube (Optional)" />
            </Box>

            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Google Plus (Optional)" />
            </Box>

            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Instagram (Optional)" />
            </Box>
            
            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Latitude" />
            </Box>
            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Longitude" />
            </Box>
            <Box style={{marginTop:20}}>
            <TextField style={{width:"100%"}} label="Address" />
            </Box>

            <Box style={{marginTop:20,display:"flex"}}>
            <Button size='large' variant="contained">Save</Button>
            </Box>

          </CardContent>
        </Card>
     
    </Grid>


  </Grid>
  )
}
