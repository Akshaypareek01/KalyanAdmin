/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'

import {useIntl} from 'react-intl'
// import PieChart from 'react-pie-graph-chart';
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  MixedWidget2,
  ChartsWidget3,
  ChartsWidget6
} from '../../../_metronic/partials/widgets'
import { ChartsWidget170 } from './ChartsWidget170'
import { AllChargersMap } from './AllChargersMap'
import { PieWidgetDashboard } from './PieWidgetDashboard'
import { BidDetailCard } from './BidDetailCard'
import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, styled } from '@mui/material'
import { Base_Url2 } from '../../Config/BaseUrl'
import axios from 'axios'

const Item = styled(Box)(() => ({
 
  textAlign: 'center',
  color:"black",
}));

const DashboardWrapper = () => {
  const Token = sessionStorage.getItem('token') || null
  const intl = useIntl()
  const initalData =[
    {
      Ank:0,
    TotalBid:0,
    TotalAmount:0,
   
     Color:"crimson"
    },
    {
      Ank:1,
    TotalBid:0,
    TotalAmount:0,
    
     Color:"#DD58D6"
    },
    {
      Ank:2,
    TotalBid:0,
    TotalAmount:0,
    
     Color:"#FFC436"
    },
    {
      Ank:3,
    TotalBid:0,
    TotalAmount:0,
    
     Color:"#5C5470"
    },
    {
      Ank:4,
    TotalBid:0,
    TotalAmount:0,
     bgColor:"blue",
     Color:"#33BBC5"
    },
    {
      Ank:5,
    TotalBid:0,
    TotalAmount:0,
     
     Color:"#3F1D38"
    },
    {
      Ank:6,
    TotalBid:0,
    TotalAmount:0,
  
     Color:"#F94C10"
    },
    {
      Ank:7,
    TotalBid:0,
    TotalAmount:0,
     
     Color:"#F11A7B"
    },
    {
      Ank:8,
    TotalBid:0,
    TotalAmount:0,
   
     Color:"#0C134F"
    },
    {
      Ank:9,
    TotalBid:0,
    TotalAmount:0,
    
     Color:"#068FFF"
    }


]
const initialFormValues={
 
  gameID: '',
  session: '',
}

const [GameData,setGameData] =useState([]);

const [formValues, setFormValues] = useState(initialFormValues);
const [formValues2, setFormValues2] = useState(initialFormValues);
const [UsersData,setUsersData] = useState([]);
const [ApprovedUserData,setApprovedUsersData] = useState([]);
const [UnpprovedUserData,setUnpprovedUserData] = useState([]);
const [TotalRevenue,setTotalRevenue] = useState("0");
 const [update,setUpdate] = useState(0);
const [TodayRevenue,setTodayRevenue]=useState(0)
const [todayBids,setTodayBids] = useState([])
const [filterBid,setFilterBid] = useState([])
const [totalAmoount,setTotalAmoount] = useState(0)
const [Alltansections,setAlltansections] = useState([])
const [FilterBidDataToday,setFilterBidDataToday] = useState(initalData);
const [totalWithrwalRequestAmount,setTotalWithrwalRequestAmount] = useState("0");
const [totalBidAmount,setTotalBidAmount] = useState("0");
const [totalAddAmount,setTotalAddAmount] = useState("0");
const [totalBonusAmount,setTotalbonusAmount] = useState("0");
const [TotalFundAddByAdmin,setTotalFundAddByAdmin] = useState("0");
const fetchGameData =async()=>{
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}users/get_service`,
    
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    
      if(data.post && data !== undefined){
       
        console.log("POST request response games in bid:", data);
   
     
        setGameData(data.post);
       
           
      }
      
    return data;
    // Handle success
  } catch (error) {
    console.error("Error sending POST request:", error);
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}
const fetchTodayBidData =async()=>{
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}bid_today`,
    
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    
      if(data.post && data !== undefined){
       
        console.log("POST request response Today Bid =====>:", data);
   
        const TotalAmount = data.post.reduce((acc, dataItem) => {
          return acc + parseFloat(dataItem.total_amount);
        }, 0);
        setTodayBids(data.post);
        setTodayRevenue(TotalAmount)
       
           
      }
      
    return data;
    // Handle success
  } catch (error) {
    console.error("Error sending POST request:", error);
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}
const fetchUserData =async()=>{
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}user_m`,
    
      {
        headers:{
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    console.log("POST request response users:", data);
      if(data.game && data !== undefined){
        
        const approvedUser=  data.game.filter((el)=>{
          return el.status === "1"
        })

        const UnapprovedUser=  data.game.filter((el)=>{
          return el.status !== "1"
        })

   
     
     setUsersData(data.game);
     setApprovedUsersData(approvedUser)
     setUnpprovedUserData(UnapprovedUser)
           
      }
      
    return data;
    // Handle success
  } catch (error) {
    console.error("Error sending POST request:", error);
    // showToast("error", "Game Data Not Found Login Again ", "");
    
    // Handle error
  }
}

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormValues((prevValues) => ({
    ...prevValues,
    [name]: value,
  }));
};
const handleChange2 = (event) => {
  const { name, value } = event.target;
  setFormValues2((prevValues) => ({
    ...prevValues,
    [name]: value,
  }));
};

const filterBidsByGameAndSession=() => {
  const filteredBids = todayBids.filter((bid) => {
    return bid.g_id === formValues.gameID && bid.session === formValues.session;
  });
  
  setFilterBid(filteredBids);
  calculateTotalBidAndAmount(filteredBids)
  
  console.log(filteredBids);
}
function sumTotalAmountByGameId() {
  const filteredBids = todayBids.filter((bid) => bid.g_id === formValues2.gameID);
  
  const totalAmountSum = filteredBids.reduce((accumulator, bid) => {
    return accumulator + parseInt(bid.total_amount, 10);
  }, 0);
  setTotalAmoount(totalAmountSum)
  return totalAmountSum;
}

const resetMarketBid=()=>{
  setTotalAmoount(0)
  setFormValues2(initialFormValues)
}

const resetMarketBid2=()=>{
  setFormValues(initialFormValues);
  setFilterBid([])
  setFilterBidDataToday(initalData)
} 

const calculateTotalBidAndAmount = (data) => {
  const updatedData = initalData.map((item) => {
    const { Ank } = item;
    const filteredData = data.filter((dataItem) => {
      // console.log("Digits open ",dataItem.Open_Digits ,"Digit Close",dataItem.Close_Digits, "Ank",Ank.toString())
      return (
        dataItem.Open_Digits === Ank.toString() ||
        dataItem.Close_Digits === Ank.toString()
      );
    });

    const TotalBid = filteredData.length;
    const TotalAmount = filteredData.reduce((acc, dataItem) => {
      return acc + parseFloat(dataItem.total_amount);
    }, 0);

    return { ...item, TotalBid, TotalAmount };
  });
   console.log("Filter Data  aki pareek======>",updatedData)
  setFilterBidDataToday(updatedData);
};

const fetchAllTransData =async()=>{
  try {
    // setIsLoading(true);
    const response = await axios.get(
      `${Base_Url2}cart/tran`,
    
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${Token}`, // Set the content type to form data
        },
      }
    );
    const data = response.data;
    
      if(data.client && data !== undefined){
       
        console.log("POST request response Trans Alll  =====>:", data);
       const BonusTransection = data.client.filter((el)=>{
        return el.t_for === "bonus"
       })

       const WithrwalTransection = data.client.filter((el)=>{
        return el.t_for === "W"
       })
       const AddMoneyTransection = data.client.filter((el)=>{
        return el.t_for === "Add"
       })

       const OnBidTransection = data.client.filter((el)=>{
        return el.t_for === "bid"
       })

       const OnAddByAdminTransection = data.client.filter((el)=>{
        return el.t_for === "Fund Add By Admin"
       })


        const TotalAmount = data.client.reduce((acc, dataItem) => {
          return acc + parseFloat(dataItem.amount);
        }, 0);

        const TotalAmountBonus = BonusTransection.reduce((acc, dataItem) => {
          return acc + parseFloat(dataItem.amount);
        }, 0);
        const TotalAmountWithrwal = WithrwalTransection.reduce((acc, dataItem) => {
          return acc + parseFloat(dataItem.amount);
        }, 0);
        const TotalAmountAddMoney = AddMoneyTransection.reduce((acc, dataItem) => {
          return acc + parseFloat(dataItem.amount);
        }, 0);
        const TotalAmountOnBid = OnBidTransection.reduce((acc, dataItem) => {
          return acc + parseFloat(dataItem.amount);
        }, 0);
        const TotalAmountAddByAdmin = OnAddByAdminTransection.reduce((acc, dataItem) => {
          return acc + parseFloat(dataItem.amount);
        }, 0);

        setAlltansections(data.client);
        setTotalRevenue(TotalAmount)
        setTotalWithrwalRequestAmount(TotalAmountWithrwal)
        setTotalBidAmount(TotalAmountOnBid)
        setTotalAddAmount(TotalAmountAddMoney)
        setTotalbonusAmount(TotalAmountBonus)
        setTotalFundAddByAdmin(TotalAmountAddByAdmin)
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
  
  fetchGameData();
  fetchUserData();
  fetchTodayBidData();
  fetchAllTransData()
},[])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <>

{/* begin::Row */}
<div className='row g-5 g-xl-10'>
  {/* begin::Col */}
  <div className='col-md-12 col-lg-12 col-xl-12 col-xxl-6 mb-md-5 ' >
   
    <MixedWidget2
        className='card-xl-stretch mb-xl-8 '
        chartColor='info'
        chartHeight='100px'
        strokeColor='#4e12c4'
        totalUsers={`${UsersData.length}`}
        approveUser={`${ApprovedUserData.length}`}
        unapproveUser={`${UnpprovedUserData.length}`}
        totalGame={`${GameData.length}`}
        Revenue={`${TodayRevenue}`}
      />
      
    
  </div>
  {/* end::Col */}

  {/* begin::Col */}
  

 
  <div className='col-md-12 col-lg-12 col-xl-12 col-xxl-6 ' >
    <div className="row">
    <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-12 mb-md-5  '>
    
    <CardsWidget17 
    className=' '
   Revenue={`${TotalRevenue}`}
   totalWithrwalRequestAmount={`${totalWithrwalRequestAmount}`}
   totalBidAmount={`${totalBidAmount}`}
   totalAddAmount={`${totalAddAmount}`}
   Alltansections={`${Alltansections.length}`}
   totalBonusAmount={`${totalBonusAmount}`}
   TotalFundAddByAdmin={`${TotalFundAddByAdmin}`}
    />
    </div>

    <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-12 mb-md-5  ' >
     <ChartsWidget170 className=' '/>
    </div>
    </div>    
  </div>

  <div className='col-md-12 col-lg-12 col-xl-12 col-xxl-6 ' style={{marginTop:"20px"}} >
    <div className="row" style={{textAlign:"center"}}>
     
    <div className='col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-md-5  '>
    <Card sx={{marginBottom:"30px"}}>
        <CardContent>
        <Box>
      <Box>
        <Typography style={{fontSize:18,fontWeight:500,letterSpacing:1}}>Market Bid Details</Typography>
      </Box>
      <Box sx={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
  
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
    
     
  
      <Grid item xs={12} sm={12} md={6} >
        <Item>
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Game Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="gameID"
            value={formValues2.gameID}
            onChange={handleChange2}
          >
            {
               GameData.map((el,index)=>{
                return (
                       <MenuItem key={index} value={el.g_id}>{el.g_title}</MenuItem>
                )
                
              })
            }
          </Select>
        </FormControl>
      </Box>
        </Item>
      </Grid>

      <Grid item xs={12} sm={12} md={6} >
        <Item>
        <Box sx={{ minWidth: 120,border:"1px solid grey",height:50 }}>
          <Typography style={{fontSize:16,fontWeight:500,letterSpacing:1}}>Market Amount</Typography>
          
         <Typography style={{fontSize:15,fontWeight:500}}>₹ {totalAmoount}</Typography>
      </Box>
        </Item>
      </Grid>
  
     
  
      <Grid item xs={12} sm={6} md={6} >
        <Item>
        
          <Box sx={{ minWidth: 120,padding:"7px" }}>
          <Button size='large' style={{width:"120px"}}  onClick={sumTotalAmountByGameId}  variant="contained">GET</Button>
          </Box>
        
        </Item>
      </Grid>

      <Grid item xs={12} sm={6} md={6} >
        <Item>
        
          <Box sx={{ minWidth: 120,padding:"7px" }}>
          <Button size='large' style={{width:"120px"}}  onClick={resetMarketBid}  variant="contained">Reset</Button>
          </Box>
        
        </Item>
      </Grid>
   
       </Grid>
      
  
      
  
      
  
  
      </Box>
    </Box>
        </CardContent>
      </Card>
    </div>
    </div>    
  </div>

<div className='col-md-12 col-lg-12 col-xl-12 col-xxl-6 ' style={{marginTop:"20px"}} >
    <div className="row" style={{textAlign:"center"}}>
     
    <div className='col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-md-5  '>
    <Card sx={{marginBottom:"30px"}}>
        <CardContent>
        <Box>
      <Box>
        <Typography style={{fontSize:18,fontWeight:500,letterSpacing:1}}>Total Bids On Single Ank Of Date 09 Sep, 2023</Typography>
      </Box>
      <Box sx={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
  
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
    
     
  
      <Grid item xs={12} sm={12} md={6} >
        <Item>
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Game Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="gameID"
            value={formValues.gameID}
            onChange={handleChange}
          >
            {
               GameData.map((el,index)=>{
                return (
                       <MenuItem key={index} value={el.g_id}>{el.g_title}</MenuItem>
                )
                
              })
            }
          </Select>
        </FormControl>
      </Box>
        </Item>
      </Grid>
  
      <Grid item xs={12} sm={12} md={6} >
        <Item>
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Market Time</InputLabel>
          <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             name="session"
             value={formValues.session}
             onChange={handleChange}
            
          >
            
            <MenuItem value={"open"}>Open</MenuItem>
            <MenuItem value={"close"}>Close</MenuItem>
          </Select>
        </FormControl>
      </Box>
        </Item>
      </Grid>
  
      <Grid item xs={12} sm={6} md={6} >
        <Item>
        
          <Box sx={{ minWidth: 120,padding:"7px" }}>
          <Button size='large' style={{width:"120px"}} onClick={filterBidsByGameAndSession}   variant="contained">GET</Button>
          </Box>
        
        </Item>
      </Grid>

      <Grid item xs={12} sm={6} md={6} >
        <Item>
        
          <Box sx={{ minWidth: 120,padding:"7px" }}>
          <Button size='large' style={{width:"120px"}}  onClick={resetMarketBid2}  variant="contained">Reset</Button>
          </Box>
        
        </Item>
      </Grid>
   
       </Grid>
      
  
      
  
      
  
  
      </Box>
    </Box>
        </CardContent>
      </Card>
    </div>
    </div>    
  </div>

</div>
{/* end::Row */}




<div className='row gy-5 g-xl-8' style={{marginTop:"20px"}}>
<div className='row g-5 g-xl-10'>
  {
    FilterBidDataToday.map((el)=>{
        return (
          <div className='col-md-3'>
          <BidDetailCard
          Ank={el.Ank}
         TotalBid={el.TotalBid}
         TotalAmount={el.TotalAmount}
        
         Color={el.Color}
     
     />
         </div>
        )
    })
  }
     
  </div>

</div>







</>
    </>
  )
}

export {DashboardWrapper}
