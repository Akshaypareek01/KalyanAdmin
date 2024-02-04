
import React from 'react'
import { KTCard } from '../../../../_metronic/helpers'

import { GenralTabel } from '../../../TabelComponents/GenralTable'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { WalletModel } from './Modal/WalletModal';
import UserModal from "./ClientComponents/UserModal";
import UserModal2 from './ClientComponents/UserModal2';
const column=[
  {name: "CPOs"},
  {name: "State"},
  {name: "Category"},
  {name: "Total Admins"},
  {name: "Total Chargers"},
  {name: "Available Credits"},
  {name: "Company Wallet"},
  {name: "Add Amount"},
  {name: "Update"},
]



const rows=[
  {"Brand Name":"Townhall","State":"Rajasthan","Category":"Regional","Total Admins":"3","Chargers":"22"," Credits":"-90","Company Wallet":<WalletModel/>,"Add amount":<MonetizationOnIcon/>,"Update":<UserModal2/>},
  {"Brand Name":"Ev-abc","State":"Karnataka","Category":"National","Total Admins":"2","Chargers":"32"," Credits":"80","Company Wallet":<WalletModel/>,"Add amount":<MonetizationOnIcon/>,"Update":<UserModal2/>},
  {"Brand Name":"Abc-2-Ev","State":"Kerala","Category":"Regional","Total Admins":"1","Chargers":"11"," Credits":"790","Company Wallet":<WalletModel/>,"Add amount":<MonetizationOnIcon/>,"Update":<UserModal2/>},
  {"Brand Name":"M-EV-4","State":"Maharashtra","Category":"National","Total Admins":"3","Chargers":"44"," Credits":"8090","Company Wallet":<WalletModel/>,"Add amount":<MonetizationOnIcon/>,"Update":<UserModal2/>},
  {"Brand Name":"Avd","State":"Odisha","Category":"National","Total Admins":"3","Chargers":"23"," Credits":"490","Company Wallet":<WalletModel/>,"Add amount":<MonetizationOnIcon/>,"Update":<UserModal2/>},
  {"Brand Name":"Jccf","State":"Chandigarh","Category":"Regional","Total Admins":"4","Chargers":"22"," Credits":"6590","Company Wallet":<WalletModel/>,"Add amount":<MonetizationOnIcon/>,"Update":<UserModal2/>},
  {"Brand Name":"KiiF","State":"Gujarat","Category":"National","Total Admins":"3","Chargers":"10"," Credits":"670","Company Wallet":<WalletModel/>,"Add amount":<MonetizationOnIcon/>,"Update":<UserModal2/>},
  {"Brand Name":"Ghhj","State":"Goa","Category":"Regional","Total Admins":"5","Chargers":"61"," Credits":"3290","Company Wallet":<WalletModel/>,"Add amount":<MonetizationOnIcon/>,"Update":<UserModal2/>},
  {"Brand Name":"LkLk","State":"Haryana","Category":"Regional","Total Admins":"3","Chargers":"13"," Credits":"6790","Company Wallet":<WalletModel/>,"Add amount":<MonetizationOnIcon/>,"Update":<UserModal2/>},
  {"Brand Name":"Ev-abc","State":"Punjab","Category":"National","Total Admins":"1","Chargers":"77"," Credits":"1190","Company Wallet":<WalletModel/>,"Add amount":<MonetizationOnIcon/>,"Update":<UserModal2/>},
]









const CPOs = () => {
  return (
    <div>
         <KTCard>
    
       
      <GenralTabel rows={rows} column={column}/>
      </KTCard>
    </div>
  )

}
export default CPOs;
