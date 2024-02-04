import React from 'react'
import PageHeader from '../Components/PageHeader'
import ComapnyPaymentHeader from '../Components/ComapnyPaymentHeader'
import { KTCard } from '../../../../../_metronic/helpers'
import { GenralTabel } from '../../../../TabelComponents/GenralTable'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Button } from '@mui/material'
const CompanyPayments = () => {

  const column=[
    {name:"Payment Id"},
   
    {name:"Company"},
    {name:"Paid Amount"},
    {name:"Status"},
    {name:"Date"},
    {name:"Payment Method"},
    {name:" "},
    
  ]
  const rows=[
{PaymentId:"pay_kxel12Bc476grG3",Company:"SIT Test Fleet",PaidAmount:"10000",Status:"Captured",Date:"Thu 29 dec 2022 18:11:24 GMT","Payment Method":"netbanking"},
{PaymentId:"pay_kxel12Bc476grG3",Company:"SIT Test Fleet",PaidAmount:"10000",Status:"Captured",Date:"Thu 29 dec 2022 18:11:24 GMT","Payment Method":"netbanking"},
{PaymentId:"pay_kxel12Bc476grG3",Company:"SIT Test Fleet",PaidAmount:"10000",Status:"Captured",Date:"Thu 29 dec 2022 18:11:24 GMT","Payment Method":"netbanking"},
{PaymentId:"pay_kxel12Bc476grG3",Company:"SIT Test Fleet",PaidAmount:"10000",Status:"Captured",Date:"Thu 29 dec 2022 18:11:24 GMT","Payment Method":"netbanking"},
{PaymentId:"pay_kxel12Bc476grG3",Company:"SIT Test Fleet",PaidAmount:"10000",Status:"Captured",Date:"Thu 29 dec 2022 18:11:24 GMT","Payment Method":"netbanking"},
{PaymentId:"pay_kxel12Bc476grG3",Company:"SIT Test Fleet",PaidAmount:"10000",Status:"Captured",Date:"Thu 29 dec 2022 18:11:24 GMT","Payment Method":"netbanking"},
{PaymentId:"pay_kxel12Bc476grG3",Company:"SIT Test Fleet",PaidAmount:"10000",Status:"Captured",Date:"Thu 29 dec 2022 18:11:24 GMT","Payment Method":"netbanking"},
{PaymentId:"pay_kxel12Bc476grG3",Company:"SIT Test Fleet",PaidAmount:"10000",Status:"Captured",Date:"Thu 29 dec 2022 18:11:24 GMT","Payment Method":"netbanking"},
{PaymentId:"pay_kxel12Bc476grG3",Company:"SIT Test Fleet",PaidAmount:"10000",Status:"Captured",Date:"Thu 29 dec 2022 18:11:24 GMT","Payment Method":"netbanking"},

]
  return (
    <div>
    <ComapnyPaymentHeader/>
    <KTCard>
      <GenralTabel rows={rows} column={column}/>
      </KTCard>
    </div>
  )
}

export default CompanyPayments
