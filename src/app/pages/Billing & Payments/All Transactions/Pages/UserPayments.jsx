import React from 'react'
import PageHeader from '../Components/PageHeader'
import UserPaymentHeader from '../Components/UserPaymentHeader'
import { KTCard } from '../../../../../_metronic/helpers'
import { GenralTabel } from '../../../../TabelComponents/GenralTable'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Button } from '@mui/material'
const UserPayments = () => {


  const column=[
    {name:"Payment Id"},
    {name:"User Name"},
    {name:"Phone Number"},
    {name:"Email"},
    {name:"Company"},
    {name:"Paid Amount"},
    {name:"Status"},
    {name:"Date"},
    {name:"Payment Method"},
    {name:" "},
    
  ]
  const rows=[
{PaymentId:"pay_kxel12Bc476grG3",UserName:"ODIN",PhoneNumber:"+91-6789054321",Email:"testodin@gmail.com",Company:"Intercharge",PaidAmount:"10000",Status:"Captured",Date:"29 Mar 2023","Payment Method":"netbanking","":<Button sx={{backgroundColor:"crimson",color:"#fff","&:hover": { backgroundColor: "#E21818"}}}>Initiate Refund</Button>},
{PaymentId:"pay_kxel12Bc476grG3",UserName:"ODIN",PhoneNumber:"+91-6789054321",Email:"testodin@gmail.com",Company:"Intercharge",PaidAmount:"10000",Status:"Captured",Date:"29 Mar 2023","Payment Method":"netbanking","":<Button sx={{backgroundColor:"crimson",color:"#fff","&:hover": { backgroundColor: "#E21818"}}} >Initiate Refund</Button>},
{PaymentId:"pay_kxel12Bc476grG3",UserName:"ODIN",PhoneNumber:"+91-6789054321",Email:"testodin@gmail.com",Company:"Intercharge",PaidAmount:"10000",Status:"Captured",Date:"29 Mar 2023","Payment Method":"netbanking","":<Button sx={{backgroundColor:"crimson",color:"#fff","&:hover": { backgroundColor: "#E21818"}}}>Initiate Refund</Button>},
{PaymentId:"pay_kxel12Bc476grG3",UserName:"ODIN",PhoneNumber:"+91-6789054321",Email:"testodin@gmail.com",Company:"Intercharge",PaidAmount:"10000",Status:"Captured",Date:"29 Mar 2023","Payment Method":"netbanking","":<Button sx={{backgroundColor:"crimson",color:"#fff","&:hover": { backgroundColor: "#E21818"}}}>Initiate Refund</Button>},
{PaymentId:"pay_kxel12Bc476grG3",UserName:"ODIN",PhoneNumber:"+91-6789054321",Email:"testodin@gmail.com",Company:"Intercharge",PaidAmount:"10000",Status:"Captured",Date:"29 Mar 2023","Payment Method":"netbanking","":<Button sx={{backgroundColor:"crimson",color:"#fff","&:hover": { backgroundColor: "#E21818"}}}>Initiate Refund</Button>},
{PaymentId:"pay_kxel12Bc476grG3",UserName:"ODIN",PhoneNumber:"+91-6789054321",Email:"testodin@gmail.com",Company:"Intercharge",PaidAmount:"10000",Status:"Captured",Date:"29 Mar 2023","Payment Method":"netbanking","":<Button sx={{backgroundColor:"crimson",color:"#fff","&:hover": { backgroundColor: "#E21818"}}}>Initiate Refund</Button>},
{PaymentId:"pay_kxel12Bc476grG3",UserName:"ODIN",PhoneNumber:"+91-6789054321",Email:"testodin@gmail.com",Company:"Intercharge",PaidAmount:"10000",Status:"Captured",Date:"29 Mar 2023","Payment Method":"netbanking","":<Button sx={{backgroundColor:"crimson",color:"#fff","&:hover": { backgroundColor: "#E21818"}}}>Initiate Refund</Button>},
{PaymentId:"pay_kxel12Bc476grG3",UserName:"ODIN",PhoneNumber:"+91-6789054321",Email:"testodin@gmail.com",Company:"Intercharge",PaidAmount:"10000",Status:"Captured",Date:"29 Mar 2023","Payment Method":"netbanking","":<Button sx={{backgroundColor:"crimson",color:"#fff","&:hover": { backgroundColor: "#E21818"}}}>Initiate Refund</Button>},
{PaymentId:"pay_kxel12Bc476grG3",UserName:"ODIN",PhoneNumber:"+91-6789054321",Email:"testodin@gmail.com",Company:"Intercharge",PaidAmount:"10000",Status:"Captured",Date:"29 Mar 2023","Payment Method":"netbanking","":<Button sx={{backgroundColor:"crimson",color:"#fff","&:hover": { backgroundColor: "#E21818"}}}>Initiate Refund</Button>},
{PaymentId:"pay_kxel12Bc476grG3",UserName:"ODIN",PhoneNumber:"+91-6789054321",Email:"testodin@gmail.com",Company:"Intercharge",PaidAmount:"10000",Status:"Captured",Date:"29 Mar 2023","Payment Method":"netbanking","":<Button sx={{backgroundColor:"crimson",color:"#fff","&:hover": { backgroundColor: "#E21818"}}}>Initiate Refund</Button>},
]
  return (
    <div>
      <UserPaymentHeader/>
      <KTCard>
      <GenralTabel rows={rows} column={column}/>
      </KTCard>
    </div>
  )
}

export default UserPayments
