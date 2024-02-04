import React from 'react'
import PageHeader from './Components/PageHeader'
import SessionHeader from './Components/SessionHeader'
import { KTCard } from '../../../../_metronic/helpers'
import { GenralTabel } from '../../../TabelComponents/GenralTable'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EditBooking from './Components/EditBooking'
import { SessionDrawer } from './Components/SessionDrawer'


const AllTransactions = () => {


  const column=[
    {name:"Booking Id"},
    {name:"Charger Name"},
    {name:"Connector ID"},
    {name:"User Details"},
    {name:"Vehicle Details"},
    {name:"Company"},
    {name:"Charging Duration"},
    
    {name:"Price"},
    {name:"Units"},
    {name:"Actions"},
  ]
  const rows=[
{BookingId:<SessionDrawer user={"9823325"}/>,ChargerName:"BT EcoSpace Charger-1",ConnectorId:"2",UserDetails:"+33-6699",VehicleDetails:"Mahindra e-Verito",Company:"Lithium",ChargingDuration:"0:37:30",Price:"52.16",Units:"4.42",Action:<EditBooking/>},
{BookingId:<SessionDrawer user={"9823325"}/>,ChargerName:"BT EcoSpace Charger-1",ConnectorId:"2",UserDetails:"+33-6699",VehicleDetails:"Mahindra e-Verito",Company:"Lithium",ChargingDuration:"0:37:30",Price:"52.16",Units:"4.42",Action:<EditBooking/>},
{BookingId:<SessionDrawer user={"9823325"}/>,ChargerName:"BT EcoSpace Charger-1",ConnectorId:"2",UserDetails:"+33-6699",VehicleDetails:"Mahindra e-Verito",Company:"Lithium",ChargingDuration:"0:37:30",Price:"52.16",Units:"4.42",Action:<EditBooking/>},
{BookingId:<SessionDrawer user={"9823325"}/>,ChargerName:"BT EcoSpace Charger-1",ConnectorId:"2",UserDetails:"+33-6699",VehicleDetails:"Mahindra e-Verito",Company:"Lithium",ChargingDuration:"0:37:30",Price:"52.16",Units:"4.42",Action:<EditBooking/>},
{BookingId:<SessionDrawer user={"9823325"}/>,ChargerName:"BT EcoSpace Charger-1",ConnectorId:"2",UserDetails:"+33-6699",VehicleDetails:"Mahindra e-Verito",Company:"Lithium",ChargingDuration:"0:37:30",Price:"52.16",Units:"4.42",Action:<EditBooking/>},
{BookingId:<SessionDrawer user={"9823325"}/>,ChargerName:"BT EcoSpace Charger-1",ConnectorId:"2",UserDetails:"+33-6699",VehicleDetails:"Mahindra e-Verito",Company:"Lithium",ChargingDuration:"0:37:30",Price:"52.16",Units:"4.42",Action:<EditBooking/>},
{BookingId:<SessionDrawer user={"9823325"}/>,ChargerName:"BT EcoSpace Charger-1",ConnectorId:"2",UserDetails:"+33-6699",VehicleDetails:"Mahindra e-Verito",Company:"Lithium",ChargingDuration:"0:37:30",Price:"52.16",Units:"4.42",Action:<EditBooking/>},
{BookingId:<SessionDrawer user={"9823325"}/>,ChargerName:"BT EcoSpace Charger-1",ConnectorId:"2",UserDetails:"+33-6699",VehicleDetails:"Mahindra e-Verito",Company:"Lithium",ChargingDuration:"0:37:30",Price:"52.16",Units:"4.42",Action:<EditBooking/>},
{BookingId:<SessionDrawer user={"9823325"}/>,ChargerName:"BT EcoSpace Charger-1",ConnectorId:"2",UserDetails:"+33-6699",VehicleDetails:"Mahindra e-Verito",Company:"Lithium",ChargingDuration:"0:37:30",Price:"52.16",Units:"4.42",Action:<EditBooking/>},
{BookingId:<SessionDrawer user={"9823325"}/>,ChargerName:"BT EcoSpace Charger-1",ConnectorId:"2",UserDetails:"+33-6699",VehicleDetails:"Mahindra e-Verito",Company:"Lithium",ChargingDuration:"0:37:30",Price:"52.16",Units:"4.42",Action:<EditBooking/>},
{BookingId:<SessionDrawer user={"9823325"}/>,ChargerName:"BT EcoSpace Charger-1",ConnectorId:"2",UserDetails:"+33-6699",VehicleDetails:"Mahindra e-Verito",Company:"Lithium",ChargingDuration:"0:37:30",Price:"52.16",Units:"4.42",Action:<EditBooking/>},




]


  return (
    <div>
       <SessionHeader/>
       <KTCard>
      <GenralTabel rows={rows} column={column}/>
      </KTCard>
    </div>
  )
}

export default AllTransactions
