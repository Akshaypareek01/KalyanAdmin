import { Box, Button, Card, CardContent, Grid, InputLabel, MenuItem, Select, TextField, Typography, styled } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Base_Url2 } from "../../../Config/BaseUrl";
const Item = styled(Box)(() => ({
  textAlign: "center",
  color: "black",
}));
export const MainSettings = () => {
  const Token = sessionStorage.getItem('token') || null

  const initialRawValues={
    "bs_id": "",
    "whatsapp": "",
    "telegram": "",
    "min_wd": "",
    "min_add": "",
    "upi_id": "",
    "trans_id": "",
    "m_name": "",
    "merchant_code": "",
    "ac_holder_name": "",
    "ac_number": "",
    "ifse_code": "",
    "app_link": "",
    "share_msg": "",
    "am_share_msg": "",
    "am_show": "",
    "max_add": "",
    "max_wd": "",
    "min_tran": "",
    "max_tran": "",
    "min_bid": "",
    "max_bid": "",
    "well_bonus": "",
    "wd_open": "",
    "wd_close": "",
    "global_batting": "",
    "email":""

}

const [rawData, setRawData] = useState(initialRawValues)
const [update,setUpdate] = useState(0)

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRawData({
      ...rawData,
      [name]: value,
    });
  };



  const handleFormSubmit = (event) => {
   
    console.log("Form Data:", rawData);
    SubmitData()
  };

  const SubmitData =async()=>{
    const formData= new FormData()
    for (const key in rawData) {
      formData.append(key, rawData[key]);
    }
    try {
      // setIsLoading(true);
      const response = await axios.post(
        `${Base_Url2}basic/update/1`,
        formData,
        {
          headers:{
            "Content-Type": "multipart/form-data",
            "Authorization" :`Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;
      
      setUpdate((pre)=>pre+1)
        
      return data;
     
    } catch (error) {
      console.error("Error sending POST request:", error);
      // showToast("error", "Game Data Not Found Login Again ", "");
      
      // Handle error
    }
  }


  const fetchData =async()=>{
    try {
      // setIsLoading(true);
      const response = await axios.get(
        `${Base_Url2}basic`,
      
        {
          headers:{
            "Content-Type": "multipart/form-data",
            "Authorization" :`Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;
      
        if(data.post && data !== undefined){
          
          const data1=data.post[0]
          console.log("POST request result data response users:", data1);
       setRawData(data1);
      //     setFilteredRows(formattedData);      
        }
        
      return data;
     
    } catch (error) {
      console.error("Error sending POST request:", error);
      // showToast("error", "Game Data Not Found Login Again ", "");
      
      // Handle error
    }
  }

  useEffect(()=>{
    fetchData()
  },[update])


  return (

    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >

<Grid item xs={12} sm={12} md={6}>
        <Item>
          <Card>
            <CardContent>
              <Box>
                <Typography variant="h5">Add Bank Details</Typography>
              </Box>
              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} 
              label="Account Holder Name"
              name="ac_holder_name"
              value={rawData.ac_holder_name}
              onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} 
              label="Account Number"
              name="ac_number"
              value={rawData.ac_number}
              onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}}
              label="IFSC Code"
              name="ifse_code"
              value={rawData.ifse_code}
              onChange={handleInputChange}
              
              />
              </Box>
            
            

            </CardContent>
          </Card>
        </Item>
      </Grid>



      <Grid item xs={12} sm={12} md={6}>
        <Item>
          <Card>
            <CardContent>
              <Box>
                <Typography variant="h5">Add App Link</Typography>
              </Box>
              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="App Link"
              name="app_link"
              value={rawData.app_link}
              onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Share Message"
              name="share_msg"
              value={rawData.share_msg}
              onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20,visibility:"hidden"}}>
              <TextField style={{width:"100%"}} label="IFSC Code" />
              </Box>
              

              


            </CardContent>
          </Card>
        </Item>
      </Grid>


      <Grid item xs={12} sm={12} md={6}>
        <Item>
          <Card>
            <CardContent>
              <Box>
                <Typography variant="h5">Add UPI ID</Typography>
              </Box>
              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="UPI ID"
               name="upi_id"
               value={rawData.upi_id}
               onChange={handleInputChange}
              />
              </Box>
              <Box style={{marginTop:20,visibility:"hidden"}}>
              <TextField style={{width:"100%"}} label="IFSC Code" />
              </Box>
              <Box style={{marginTop:20,visibility:"hidden"}}>
              <TextField style={{width:"100%"}} label="IFSC Code" />
              </Box>

              

            </CardContent>
          </Card>
        </Item>
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <Item>
          <Card>
            <CardContent>
              <Box>
                <Typography variant="h5">App Maintainence</Typography>
              </Box>
              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Share Message"
              
              name="am_share_msg"
               value={rawData.am_share_msg}
               onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20 }}>
              {/* <TextField style={{width:"100%"}} label="Show Msg (ON/OFF)" 
               name="am_show"
               value={rawData.am_show}
               onChange={handleInputChange}
              /> */}
              <Box textAlign="left">
              <InputLabel id="demo-simple-select-label">Show Message</InputLabel>
              </Box>
             
              <Select
              style={{width:"100%"}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="am_show"
               value={rawData.am_show}
               onChange={handleInputChange}
          >
            
                       <MenuItem  value={"0"}>NO</MenuItem>
                       <MenuItem  value={"1"}>YES</MenuItem>
            
          </Select>
              </Box>
              <Box style={{marginTop:5,visibility:"hidden"}}>
              <TextField style={{width:"100%"}} label="IFSC Code" />
              </Box>
              


            </CardContent>
          </Card>
        </Item>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Item>
          <Card>
            <CardContent>
              <Box>
                <Typography variant="h5">Contacts</Typography>
              </Box>
              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Whatsapp"
              
              name="whatsapp"
               value={rawData.whatsapp}
               onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Telegram" 
               name="telegram"
               value={rawData.telegram}
               onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Email" 
               name="email"
               value={rawData.email}
               onChange={handleInputChange}
              />
              </Box>
              
              


            </CardContent>
          </Card>
        </Item>
      </Grid>



      <Grid item xs={12} sm={12} md={12}>
        <Item>
          <Card>
            <CardContent>
              <Box>
                <Typography variant="h5">Add Value's</Typography>
              </Box>
              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Minimum Deposite"
              
              name="min_add"
               value={rawData.min_add}
               onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Maximum Deposite" 
              name="max_add"
              value={rawData.max_add}
              onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Minimum Withdrawal" 
              
              name="min_wd"
              value={rawData.min_wd}
              onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Maximum Withdrawal"
               name="max_wd"
               value={rawData.max_wd}
               onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Minimum Transfer"
              name="min_tran"
              value={rawData.min_tran}
              onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Maximum Transfer"
              name="max_tran"
              value={rawData.max_tran}
              onChange={handleInputChange}
              
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Minimum Bid Amount" 
               name="min_bid"
               value={rawData.min_bid}
               onChange={handleInputChange}
              
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Maximum Bid Amount"
              
              name="max_bid"
              value={rawData.max_bid}
              onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Welcome Bonus"
              name="well_bonus"
              value={rawData.well_bonus}
              onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Withdraw Open Time" 
               name="wd_open"
               value={rawData.wd_open}
               onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <TextField style={{width:"100%"}} label="Withdraw Close Time" 
              
              name="wd_close"
              value={rawData.wd_close}
              onChange={handleInputChange}
              />
              </Box>

              <Box style={{marginTop:20}}>
              <Box textAlign="left">
              <InputLabel id="demo-simple-select-label">Global Batting</InputLabel>
              </Box>
               <Select
              style={{width:"100%"}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="global_batting"
                value={rawData.global_batting}
                onChange={handleInputChange}
          >
            
                       <MenuItem  value={"0"}>NO</MenuItem>
                       <MenuItem  value={"1"}>YES</MenuItem>
            
          </Select>
              </Box>
              

              

            </CardContent>
          </Card>
        </Item>
      </Grid>
     
      <Grid item xs={12} sm={12} md={12}>
        <Item>
          <Card>
            <CardContent>
              

              <Box style={{marginTop:20}}>
              <Button size="large" variant="contained" onClick={handleFormSubmit}>Save</Button>
              </Box>
              

              

            </CardContent>
          </Card>
        </Item>
      </Grid>
           
    </Grid>
  );
};
