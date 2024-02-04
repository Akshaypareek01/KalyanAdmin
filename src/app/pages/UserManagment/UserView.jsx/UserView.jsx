import { Box, Button, Card, FormLabel, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { GenralTabel } from '../../../TabelComponents/GenralTable';
import { Base_Url2 } from '../../../Config/BaseUrl';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function a11yProps2(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const AddFundColumn=[
  {name:"ID"},
  {name:"Amount"},
  {name:"Transaction_Note"},
  {name:"Date"},
  {name:"Receipt"},
  {name:"Transaction ID"},
]

const WithdrawFundColumn=[
  {name:"ID"},
  {name:"Amount"},
  {name:"Date"},
  {name:"Transaction Id"},
 
  {name:"Method"},
  
  
]

const BidHistoryColumn=[
  {name:"ID"},
  {name:"Game Name"},
  {name:"Game Type"},
  {name:"Session"},
  {name:"Open Digits"},
  {name:"Close Digits"},
  {name:"Jodi"},
  {name:"Open Panna"},
  {name:"Close Panna"},
  {name:"Points"},
  {name:"Date"},
]

const AllTransactionColumn=[
  {name:"ID"},
  {name:"Amount"},
  {name:"Transaction Note"},
  {name:"Date"},
  {name:"Tx Req.No."},
]

const CreditTransactionColumn=[
  {name:"ID"},
  {name:"Amount"},
  {name:"Transaction Note"},
  {name:"Date"},
  {name:"Tx Req.No."},
]

const DebitTransactionColumn=[
  {name:"ID"},
  {name:"Amount"},
  {name:"Transaction Note"},
  {name:"Date"},
  {name:"Tx Req.No."},
]
export const UserView = () => {
  const {id}= useParams()
  const Token = sessionStorage.getItem('token') || null
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);
  const [AddFundRows,setAddFundRows] = React.useState([]);
  const [WithdrawFundRows,setWithdrawFundRows] = React.useState([]);
  const [BidHistoryRows,setBidHistoryRows] = React.useState([]);
  const [AddFundopen, setAddFundOpen] = React.useState(false);
  const [ResetpassOpen, setResetpassOpen] = React.useState(false);
  const [WithdrwalFundopen, setWithdrwalFundOpen] = React.useState(false);
  const [CreditTransaction,setCreditTransaction] = React.useState([]);
  const [DebitTransaction,setDebitTransaction] = React.useState([]);
  const [WithrwalTransaction,setWithrwalTransaction] = React.useState([]);
  const [userTransactionHistory,setuserTransactionHistory] =React.useState([])
  const [userData,setuserData] = React.useState(null);
  const [bidData,setBidData] = React.useState(null); 
  const [update,setUpdate] = React.useState(0);
  const [AddFundAmount, setAddFundAmount] = React.useState("");
  const [newPass, setNewPass] = React.useState("");
  const [WithdrwalFundAmount, setWithdrwalFundAmount] = React.useState("");
  const[userMethod,setUserMethhod]= React.useState(null);
  const [lastSeenData,setLastSeenData]= React.useState("");
  const handleAddFundClickOpen = () => {
    setAddFundOpen(true);
  };

  const handleResetpassOpen = () => {
    setResetpassOpen(true);
  };

  const handleResetpassClose = () => {
    setResetpassOpen(false);
    setNewPass("")
  };

  const handleAddFundClose = () => {
    setAddFundOpen(false);
  };

  const handelAddFund=()=>{

    handleAddFundClose()
    handelAddFundToUser()
  }
  const handelResetUserPAss=async()=>{
    const formData1= new FormData();
    try {
      
      formData1.append("newpin",newPass)
     
      // setIsLoading(true);
      const response = await axios.post(
        
        `${Base_Url2}auth/auser_pin_update/${id}`,
        formData1
      ,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" :`Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;
      console.log("POST request response:", data);
      
      setUpdate((prev)=>prev+1)
      setNewPass("")
      alert("User Password Updated successfully")
          // setIsLoading(false);
          // console.log(data.post)
             
    
        
      return data;
      // Handle success
    } catch (error) {
      console.error("Error sending POST request:", error);
      alert("Failed To  Updated User Password")
    }
  }


  const handelRestPassowrd=()=>{

    handleResetpassClose()
    handelResetUserPAss()
  }


  

  const handleWithdrwalFundClickOpen = () => {
    setWithdrwalFundOpen(true);
  };

  const handleWithdrwalFundClose = () => {
    setWithdrwalFundOpen(false);
  };

  const handelWithdrwalFund=()=>{

    handleWithdrwalFundClose()
    WithdrwalRequest()
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  const fetchUserData =async()=>{
    try {
      // setIsLoading(true);
      const response = await axios.get(
        `${Base_Url2}user_all/${id}`,
      
        {
          headers:{
            "Content-Type": "multipart/form-data",
            "Authorization" :`Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;
      console.log("POST request user data response users:", data);
        if(data.client && data !== undefined){

          const UserData= data.client.post[0]
          const BidData= data.client.bid
          setuserData(UserData)

          const formattedBidData = BidData.map((item,index) => ({
            "ID":item.b_id,
         
          
           "Game_Name":item.g_title,
           "Game_Type":item.gt_name,
           "Session":item.session,
           "Open_Digits":item.Open_Digits,
           "Close_Digits":item.Close_Digits,
           "Jodi":item.Jodi,
           "Open_Panna":item.Open_Panna,
           "Close_Panna":item.Close_Panna,
           "Points":item.total_amount,
           "Date":item.date,
           
            
           //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
        }));

        setBidHistoryRows(formattedBidData)
      //       const formattedData = data.game.map((item) => ({
      //      "sno":item.user_id,
      //      "Date":item.date ,
      //      "name":item.name,
      //      "mobile":item.number,
      //      "balance":item.Balance,
      //      "Batting":item.Batting === "1" ? <Button onClick={()=>handelBattingStausChange(item.user_id,"0")} variant="contained" color="success">YES</Button> : <Button  onClick={()=>handelBattingStausChange(item.user_id,"1")} variant="contained" color="error">No</Button>,
      //      "transfer":<Button variant="outlined" color="error">No</Button>,
      //      "active":item.status === "1" ? <Button variant="contained" onClick={()=>handelStausChange(item.user_id,"0")} color="success">Active</Button> : <Button onClick={()=>handelStausChange(item.user_id,"1")} variant="contained" color="error">In Active</Button> ,
      //      "view":<VisibilityIcon onClick={()=>{handelViewClick(2)}}/>
      //     //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
      //  }));
  
     
       
      //  setUsersData(formattedData);
      //     setFilteredRows(formattedData);
    
             
        }
        
      return data;
      // Handle success
    } catch (error) {
      console.error("Error sending POST request:", error);
      // showToast("error", "Game Data Not Found Login Again ", "");
      
      // Handle error
    }
  }

  const fetchUserDataLastSeen =async()=>{
    try {
      // setIsLoading(true);
      const response = await axios.get(
        `${Base_Url2}last_status/${id}`,
      
        {
          headers:{
            "Content-Type": "multipart/form-data",
            "Authorization" :`Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;
      console.log("POST request user data response users LAst Seen ===>:", data);
        if(data.post && data !== undefined){

          setLastSeenData(data.post.date)

      
    
             
        }
        
      return data;
      // Handle success
    } catch (error) {
      console.error("Error sending POST request:", error);
      // showToast("error", "Game Data Not Found Login Again ", "");
      
      // Handle error
    }
  }

  const fetchTransctionHistory=async()=>{
    try {
      const response = await axios.get(
        `${Base_Url2}cart/wt_id/${userData.wallet.wallet_id}`,
      
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" :`Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;
      console.log("POST request response trasction:", data);
        if(data.client && data !== undefined){
          const formattedData = data.client.map((item,index) => ({
            "Id":index+1,
            "Amount":item.amount ,
            "Transaction_Note":<Typography>{item.t_for === "bid" ? "Bid On Game" : item.t_for === "W" ? "Withdrwal Request By User" : item.t_for === "Add" ? "Amount Add By User" : item.t_for  }</Typography>,
            "Date":item.date,
            "Tx_Req.No.":item.transaction_id,
            
           //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
        }));


        const formattedDataCreditArray = data.client.filter((item,index) => {

          return (item.type === "1")
          
         
          
          
         //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
      });

      const WithdrwalRequestArray = data.client.filter((item,index) => {

        return (item.t_for === "W")
    });

    const AddFundRequestArray = data.client.filter((item,index) => {

      return (item.t_for === "Add")
  });

  const formattedDataWithdrwal = formattedDataCreditArray.map((item,index) => {

    
      return ({
        "Id":index+1,
        "Amount":item.amount ,
        "Transaction_Note":<Typography>{item.t_for === "bid" ? "Bid On Game" : item.t_for === "W" ? "Withdrwal Request By User" : item.t_for === "Add" ? "Amount Add By User" : item.t_for  }</Typography>,
        "Date":item.date,
        "Tx_Req.No.":item.transaction_id,
      })
    
   
    
    
   //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
});

const formattedDataAddFund = formattedDataCreditArray.map((item,index) => {

    
  return ({
    "Id":index+1,
    "Amount":item.amount ,
    "Transaction_Note":<Typography>{item.t_for === "bid" ? "Bid On Game" : item.t_for === "W" ? "Withdrwal Request By User" : item.t_for === "Add" ? "Amount Add By User" : item.t_for  }</Typography>,
    "Date":item.date,
    "Receipt":<Button>Receipt</Button>,
    "Tx_Req.No.":item.transaction_id,
  })




//  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
});


      const formattedDataCredit = formattedDataCreditArray.map((item,index) => {

        if(item.type === "1"){
          return ({
            "Id":index+1,
            "Amount":item.amount ,
            "Transaction_Note":<Typography>{item.t_for === "bid" ? "Bid On Game" : item.t_for === "W" ? "Withdrwal Request By User" : item.t_for === "Add" ? "Amount Add By User" : item.t_for  }</Typography>,
            "Date":item.date,
            "Tx_Req.No.":item.transaction_id,
          })
        }
       
        
        
       //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
    });

    const formattedDataDebitArray = data.client.filter((item,index) => {

      return (item.type === "0")
      
     
      
      
     //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
  });
      const formattedDataDebit = formattedDataDebitArray.map((item,index) => {

        if(item.type === "0"){
          return {
            "Id":index+1,
            "Amount":item.amount ,
            "Transaction_Note":<Typography>{item.t_for === "bid" ? "Bid On Game" : item.t_for === "W" ? "Withdrwal Request By User" : item.t_for === "Add" ? "Amount Add By User" : item.t_for  }</Typography>,
            "Date":item.date,
            "Tx_Req.No.":item.transaction_id,
          }
        }
       
        
        
       //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
    });

    const formattedDataWithdrwalArray = data.client.filter((item,index) => {

      return (item.t_for === "W")
      
     
      
      
     //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
  });

    const withdrwalHistory = formattedDataWithdrwalArray.map((item,index) => {

      
        return {
          "Id":index+1,
          "Amount":item.amount ,
          "Transaction_Note":<Typography>{item.t_for === "bid" ? "Bid On Game" : item.t_for === "W" ? "Withdrwal Request By User" : item.t_for === "Add" ? "Amount Add By User" : item.t_for  }</Typography>,
          "Date":item.date,
          "Tx_Req.No.":item.transaction_id,
        }
      
     
      
      
     //  <PauseCircleIcon onClick={toggleDrawer2('right', true)} style={{fontSize:"30px"}} />
  });

    console.log("Credit Data======>",formattedDataCredit)

    setWithdrawFundRows([])
    setAddFundRows(formattedDataAddFund)
    setCreditTransaction(formattedDataCredit)
    setDebitTransaction(formattedDataDebit)
        setuserTransactionHistory(formattedData)
        setWithrwalTransaction(withdrwalHistory)
          // console.log(data.post)
             
        }
        
      return data.client;
      // Handle success
    } catch (error) {
      console.error("Error sending POST request:", error);
      
      
      // Handle error
    }
  }

  const handelAddFundToUser=async()=>{
    const formData1= new FormData();
    try {
      
      formData1.append("total_am",AddFundAmount)
     
      // setIsLoading(true);
      const response = await axios.post(
        
        `${Base_Url2}wallet/update_by_user/${id}`,
        formData1
      ,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" :`Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;
      console.log("POST request response:", data);
      
      setUpdate((prev)=>prev+1)
      setAddFundAmount("")
      alert("Amount Added successfully In User Wallet")
          // setIsLoading(false);
          // console.log(data.post)
             
    
        
      return data;
      // Handle success
    } catch (error) {
      console.error("Error sending POST request:", error);
      alert("Amount Added Failed In User Wallet")
    }
  }

  const WithdrwalRequest =async()=>{
    try {
    const formData2= new FormData();
    formData2.append('total_am',WithdrwalFundAmount)
    formData2.append("t_type",0)
    formData2.append("pm_id","")
      const response = await axios.post(
        `${Base_Url2}cart/w_update/${userData.wallet.wallet_id}`,
        formData2,
        {
          headers:{
            "Content-Type": "multipart/form-data",
            "Authorization" :`Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;
      console.log("Data",data);
      setWithdrwalFundAmount("")
      setUpdate((prev)=>prev+1)
      alert("Withdrwa Amoount successfully from User Wallet")
     
      // Handle success
    } catch (error) {
      console.error(" Try Again:", error);
      alert("Withdrwa Amoount Failed from User Wallet")
      
      // Handle error
    }
  }

  const fetchMethod=async()=>{
    try {
      const response = await axios.get(
        `${Base_Url2}method/user_id/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" :`Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;
      console.log("POST request response userMethods ==> :", data);
        if(data.client && data !== undefined){
          // console.log("POST request r            esponse if", data);
          const formattedData = {};

          data.client.forEach((item) => {
            const { name, ...otherDetails } = item;
            formattedData[name] = { ...otherDetails };
          });
          
          console.log("formated Data=====>",formattedData);

        setUserMethhod(formattedData)
          // console.log(data.post)
             
        }
        
      return data;
      // Handle success
    } catch (error) {
      console.error("Error sending POST request:", error);
      // showToast("error", "User Wallet Not Found", "");
      
      // Handle error
    }
  }


  useEffect(()=>{

    console.log("User Id======>",id)
    fetchUserData()
    fetchMethod()
    fetchUserDataLastSeen()
  },[update])

useEffect(()=>{
  if(userData !== null){
    fetchTransctionHistory().then((res)=>{

    })
  }
},[userData,update])


  return (
    <div>
      {
        userData !== null  && <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    
        <Grid item xs={2} sm={4} md={4} >
          
            <Card>
              <Box padding={3}>
                <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
                <Typography fontSize={16} >{userData.name}</Typography>
                 <Button variant="outlined"  color='success'>Active</Button>
                </Box>
                <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
                <Typography fontSize={14}  >{userData.number}</Typography>
                
                </Box>
    
                {/* <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
                <Typography fontSize={14} fontWeight="bold">Security Pin -1234</Typography>
                 <Button variant='contained' >Change</Button>
                </Box> */}
    
                <Box borderTop="0.5px solid grey" marginTop={"20px"}>
    
                  <Box marginTop={1}>
                    <Typography fontSize={16}  marginTop={2}>Available Balance</Typography>
                    <Typography fontSize={16}  marginTop={2}>{userData.wallet.total_amount}</Typography>
    
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                      <Button variant='contained'  color='success' onClick={handleAddFundClickOpen}>Add Funds</Button>
                      <Button variant='contained'  color='warning' onClick={handleResetpassOpen}>Reset Password</Button>
                      <Button variant='contained' color='error' onClick={handleWithdrwalFundClickOpen} >Withdrwal</Button>
                    </Box>
                  </Box>
    
                </Box>
                
              </Box>
            </Card>
    
           
         
        
        </Grid>
    
        <Grid item xs={2} sm={8} md={8} >
        
            <Card>
            <Box padding={3}>
              <Typography fontSize={19} >Personal Info</Typography>
              <Box>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={2} sm={5} md={5} >
                <Box>
                  
                  <Box style={{display:"flex",alignItems:"center",marginTop:40}}>
                    <Typography fontSize={17} >Full Name :</Typography>
                    <Typography fontSize={15} >{userData.name}</Typography>
                 
                  </Box>
    
                  <Box style={{display:"flex",alignItems:"center",marginTop:40}}>
                    <Typography fontSize={17} >Mobile :</Typography>
                    <Typography fontSize={15} >+91 {userData.number}</Typography>
                 
                  </Box>
    
    
                  <Box style={{display:"flex",alignItems:"center",marginTop:42}}>
                    <Typography fontSize={17} >Creation Date :</Typography>
                    <Typography fontSize={15} >{userData.date}</Typography>
                 
                  </Box>
                  
                </Box>
                </Grid>
    
                <Grid item xs={2} sm={5} md={5} >
                <Box marginBottom={4}>
                  
                  <Box style={{display:"flex",alignItems:"center",marginTop:40,textAlign:"left"}}>
                    <Typography fontSize={17} >Email :</Typography>
                    <Typography fontSize={15} ></Typography>
                 
                  </Box>
    
                  {/* <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:40}}>
                    <Typography fontSize={17} fontWeight="bold">Password :</Typography>
                    <Typography fontSize={15} >1234</Typography>
                 
                  </Box> */}
    
    
                  <Box style={{display:"flex",alignItems:"center",marginTop:42}}>
                    <Typography fontSize={17} >Last Seen :</Typography>
                    <Typography fontSize={15} >{lastSeenData}</Typography>
                 
                  </Box>
                  
                </Box>
                </Grid>
                </Grid>
              </Box>
              </Box>
            </Card>
    
           
       
        
        </Grid>
    
        <Box sx={{ width: '100%',marginTop:5 }}>
      <Typography fontSize={20} fontWeight="bold" marginLeft={2}>User History</Typography>
        <Box sx={{ width: '100%',marginTop:1 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Payment Information" {...a11yProps(0)} />
              <Tab label="Add Fund Request List" {...a11yProps(1)} />
              <Tab label="Withdrwal Fund Request List" {...a11yProps(2)} />
              <Tab label="Bid History" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            
           <Box display="flex" justifyContent="space-between" alignItems="center">
            
           <Box  width="30%">
            <Box display="flex"  alignItems="center" marginTop="20px">
              <Typography fontSize="18px">Bank Number : </Typography>
              <Typography fontSize="18px" >{userMethod !== null && userMethod.account&& userMethod.account.b_name !== "" ? userMethod.account.b_name : "N/A" }</Typography>
            </Box>
    
            <Box display="flex" alignItems="center" marginTop="20px">
              <Typography fontSize="18px">Account Holder Name : </Typography>
              <Typography fontSize="18px">{userMethod !== null && userMethod.account&&  userMethod.account.ac_h_name !== "" ? userMethod.account.ac_h_name : "N/A" }</Typography>
            </Box>
    
            <Box display="flex"  alignItems="center" marginTop="20px">
              <Typography fontSize="18px">PhonePe No.  : </Typography>
              <Typography fontSize="18px">{userMethod !== null && userMethod["Phone Pay"] && userMethod["Phone Pay"].number !== "" ? userMethod["Phone Pay"].number : "N/A" }</Typography>
            </Box>
    
           </Box>
    
    
           <Box  width="30%">
            <Box display="flex" alignItems="center" marginTop="20px">
              <Typography fontSize="18px">Branch Address  : </Typography>
              <Typography fontSize="18px">{userMethod !== null && userMethod.account&& userMethod.account.b_add !== "" ? userMethod.account.b_add : "N/A" }</Typography>
            </Box>
    
            <Box display="flex"  alignItems="center" marginTop="20px">
              <Typography fontSize="18px">A/c Number  : </Typography>
              <Typography fontSize="18px">{userMethod !== null && userMethod.account&& userMethod.account.number !== "" ? userMethod.account.number : "N/A" }</Typography>
            </Box>
    
            <Box display="flex"  alignItems="center" marginTop="20px">
              <Typography fontSize="18px">Google Pay No. : </Typography>
              <Typography fontSize="18px">{userMethod !== null && userMethod["Googel Pay"] && userMethod["Googel Pay"].number !== "" ? userMethod["Googel Pay"].number : "N/A" }</Typography>
            </Box>
    
           </Box>
    
            <Box  width="30%">
            <Box display="flex"  alignItems="center" marginTop="20px">
              <Typography fontSize="18px">IFSC Code  : </Typography>
              <Typography fontSize="18px">{userMethod !== null &&userMethod.account&& userMethod.account.ifsc !== "" ? userMethod.account.ifsc : "N/A" }</Typography>
            </Box>
    
            <Box display="flex"  alignItems="center" marginTop="20px">
              <Typography fontSize="18px">Paytm No.  : </Typography>
              <Typography fontSize="18px">{userMethod !== null && userMethod["Paytm"] && userMethod["Paytm"].number !== "" ? userMethod["Paytm"].number : "N/A" }</Typography>
            </Box>
            
            <Box visibility="hidden">
            <Box  display="flex"   alignItems="center" marginTop="20px">
              <Typography fontSize="18px">Paytm No.  : </Typography>
              <Typography fontSize="18px">N/A</Typography>
            </Box>
            </Box>
           
    
           
           
    
           </Box>
    
           </Box>
          </CustomTabPanel>
    
          <CustomTabPanel value={value} index={1}>
            <Box>
              <GenralTabel column={AddFundColumn}  rows={AddFundRows}/>
            </Box>
          </CustomTabPanel>
    
          <CustomTabPanel value={value} index={2}>
          <Box>
              <GenralTabel column={WithdrawFundColumn}  rows={WithrwalTransaction}/>
            </Box>
          </CustomTabPanel>
    
          <CustomTabPanel value={value} index={3}>
          <Box>
              <GenralTabel column={BidHistoryColumn}  rows={BidHistoryRows}/>
            </Box>
          </CustomTabPanel>
        </Box>
       </Box>
      <Box sx={{ width: '100%',marginTop:5 }}>
      <Typography fontSize={20} fontWeight="bold" marginLeft={2}>Wallet Transaction History</Typography>
    
      <Box sx={{ width: '100%',marginTop:1 }}>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value2} onChange={handleChange2} aria-label="basic tabs example">
              <Tab label="All Transaction" {...a11yProps2(0)} />
              <Tab label="Credit Transaction" {...a11yProps2(1)} />
              <Tab label="Debit Transaction" {...a11yProps2(2)} />
             
            </Tabs>
          </Box>
          
    
          <CustomTabPanel value={value2} index={0}>
            <Box>
              <GenralTabel column={AllTransactionColumn}  rows={userTransactionHistory}/>
            </Box>
          </CustomTabPanel>
    
          <CustomTabPanel value={value2} index={1}>
          <Box>
              <GenralTabel column={CreditTransactionColumn}  rows={CreditTransaction}/>
            </Box>
          </CustomTabPanel>
    
          <CustomTabPanel value={value2} index={2}>
          <Box>
              <GenralTabel column={DebitTransactionColumn}  rows={DebitTransaction}/>
            </Box>
          </CustomTabPanel>
        </Box>
      </Box>
       
       
     
    </Grid>
      }
       <Dialog
        open={AddFundopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAddFundClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add Fund To User Wallet"}</DialogTitle>
        <DialogContent >
        <Box sx={{ width:"100%",borderWidth:1 }}>
      
      
        <TextField
        style={{minWidth:"400px"}}
        placeholder='Enter Amount'
        name="amount"
        value={AddFundAmount}
        onChange={(e)=> setAddFundAmount(e.target.value)}
        />
     
    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddFundClose}>Close</Button>
          <Button onClick={handelAddFund}>Add Amount</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={WithdrwalFundopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleWithdrwalFundClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Withdraw Amount From User Wallet"}</DialogTitle>
        <DialogContent >
        <Box sx={{ width:"100%",borderWidth:1 }}>
      
      
        <TextField
        style={{minWidth:"400px"}}
        placeholder='Enter Amount'
        name="amount"
        value={WithdrwalFundAmount}
        onChange={(e)=> setWithdrwalFundAmount(e.target.value)}
        />

{/* <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Method</InputLabel>
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
    </Box> */}
     
    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWithdrwalFundClose}>Close</Button>
          <Button onClick={handelWithdrwalFund}>Withdraw</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={ResetpassOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleResetpassClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Reset Password"}</DialogTitle>
        <DialogContent >
        <Box sx={{ width:"100%",borderWidth:1 }}>
      
      
        <TextField
        style={{minWidth:"400px"}}
        placeholder='Enter Pin'
        name="Pass"
        value={newPass}
        onChange={(e)=> setNewPass(e.target.value)}
        inputProps={{ maxLength: 4 }}
        />


     
    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetpassClose}>Close</Button>
          <Button onClick={handelRestPassowrd}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
