/* eslint-disable react/jsx-no-target-blank */
import{useContext} from 'react'
import {useIntl} from 'react-intl'

import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import UserContext from '../../../../../Context/UserContext'

const SidebarMenuMain = () => {
  // const {userPermisson}=useContext(UserContext);
  const userPermisson=JSON.parse(sessionStorage.getItem('userPermisson'))
  const intl = useIntl();


  return (

   
   
      <>
        
      {/* dashboard */}
      <SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/general/gen025.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
  
  
  
 
  {/* {
           
              <SidebarMenuItem
              to='/manage-cpos/chargers/'
              icon='/media/icons/duotune/general/gen019.svg'
              title='Chargers'
              fontIcon='bi-layers'
             
            />
          
            
          } */}
     
  
             {/* {
          
              <SidebarMenuItem
              to='/manage-cpos/charging-stations/'
              icon='/media/icons/duotune/files/fil003.svg'
              title='Charging Stations'
              fontIcon='bi-layers'
             
            /> 
          
            
          } */}
  
  
 
          
{/*   
          {
           
              <SidebarMenuItem
            to='/manage-cpos/charger-map/'
            icon='/media/icons/duotune/maps/map002.svg'
            title='Charger Map'
            fontIcon='bi-layers'
           
          /> 
          
            
          } */}
          
   {/* {
              <SidebarMenuItem
            to='/evowners/userlist/'
            icon='/media/icons/duotune/communication/com013.svg'
            title='Users List'
            fontIcon='bi-layers'
           
          />
          
   }  */}
          
           
          <SidebarMenuItem
          to='/user/managemnt/'
          
          title='User Managment'
         
            icon='/media/icons/duotune/communication/com013.svg'
           
            fontIcon='bi-layers'
        />
        <SidebarMenuItem
          to='/declare/result/'
         
            icon='/media/icons/duotune/general/gen019.svg'
           
            fontIcon='bi-layers'
          title='Declare Result'
          
         
        />
        <SidebarMenuItem
          to='/winning/prediction/'
          
          title='Winning Prediction'
        
            icon='/media/icons/duotune/general/gen013.svg'
        
            fontIcon='bi-layers'
        />
  
  
          
          
          
          <SidebarMenuItemWithSub to='evowners/overview/' title='Report Management' hasBullet={false} icon='/media/icons/duotune/files/fil003.svg'>
        
        <SidebarMenuItem
          to='/report/user_bid_history/'
          
          title='User Bid History'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/report/sell/'
          
          title='Customer Sell Report'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/report/winning/'
          
          title='Winning Report'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/report/bid_win/'
          
          title='Bid Win Report'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/report/withdrawal/'
          
          title='Withdrawal Report'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/report/auto_deposite/'
          
          title='Auto Deposit History'
          fontIcon='bi-layers'
          hasBullet={true}
        />

      </SidebarMenuItemWithSub>


      <SidebarMenuItemWithSub to='evowners/overview/' title='Wallet Management' hasBullet={false} icon='/media/icons/duotune/abstract/abs048.svg'>
        
        <SidebarMenuItem
          to='/wallet/fundrequest/'
          
          title='Fund Request'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/wallet/withrawal-request/'
          
          title='Withdrawal Request'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/wallet/addfunds/'
          
          title='Add Fund (User Wallet)'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/wallet/bidrevert/'
          
          title='Bid Revert'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        

      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub to='evowners/overview/' title='Games Management' hasBullet={false} icon='/media/icons/duotune/abstract/abs042.svg'>
        
        <SidebarMenuItem
          to='/games/games_Name/'
          
          title='Games Name'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/games/games_Rates/'
          
          title='Games Rates'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        
        

      </SidebarMenuItemWithSub>
  

      <SidebarMenuItemWithSub to='evowners/overview/' title='Games Numbers' hasBullet={false} icon='/media/icons/duotune/maps/map002.svg'>
        
        <SidebarMenuItem
          to='/gamesNumber/Singel_digite/'
          
          title='Singel Digit'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/gamesNumber/Joid_digite/'
          
          title='Jodi Digit'
          fontIcon='bi-layers'
          hasBullet={true}
        />

        <SidebarMenuItem
          to='/gamesNumber/Singel_panna/'
          
          title='Single Panna'
          fontIcon='bi-layers'
          hasBullet={true}
        />

<SidebarMenuItem
          to='/gamesNumber/Double_panna/'
          
          title='Double Panna'
          fontIcon='bi-layers'
          hasBullet={true}
        />

<SidebarMenuItem
          to='/gamesNumber/Triple_panna/'
          
          title='Triple Panna'
          fontIcon='bi-layers'
          hasBullet={true}
        />

<SidebarMenuItem
          to='/gamesNumber/half_sangam/'
          
          title='Half Sangam'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        

        <SidebarMenuItem
          to='/gamesNumber/full_sangam/'
          
          title='Full Sangam'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        

      </SidebarMenuItemWithSub>
  


      <SidebarMenuItemWithSub to='evowners/overview/' title='Settings' hasBullet={false} icon='/media/icons/duotune/general/gen049.svg'>
        
        <SidebarMenuItem
          to='/settings/main_Settings/'
          
          title='Main Settings'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        {/* <SidebarMenuItem
          to='/settings/contacts/'
          
          title='Contact Settings'
          fontIcon='bi-layers'
          hasBullet={true}
        /> */}

<SidebarMenuItem
          to='/settings/clearData/'
          
          title='Clear Data'
          fontIcon='bi-layers'
          hasBullet={true}
        />


<SidebarMenuItem
          to='/settings/slider_Image/'
          
          title='Slider Image'
          fontIcon='bi-layers'
          hasBullet={true}
        />


<SidebarMenuItem
          to='/settings/how_to_play/'
          
          title='How To Play'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        

        {/* <SidebarMenuItem
          to='/settings/payment_options/'
          
          title='Payment UPI Options'
          fontIcon='bi-layers'
          hasBullet={true}
        /> */}
        

      </SidebarMenuItemWithSub>
  


      <SidebarMenuItemWithSub to='evowners/overview/' title='Notice Management' hasBullet={false} icon='/media/icons/duotune/abstract/abs026.svg'>
        
        <SidebarMenuItem
          to='/notice/managment/'
          
          title='Notice Management'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/notice/send_notifictions/'
          
          title='Send Notification'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        
        

      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub to='evowners/overview/' title='Starline Management' hasBullet={false} icon='/media/icons/duotune/abstract/abs036.svg'>
        
        <SidebarMenuItem
          to='/starline/gameName/'
          
          title='Game Name'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/starline/gameRate/'
          
          title='Game Rate'
          fontIcon='bi-layers'
          hasBullet={true}
        />

<SidebarMenuItem
          to='/starline/bidhistory/'
          
          title='Bid History'
          fontIcon='bi-layers'
          hasBullet={true}
        />


<SidebarMenuItem
          to='/starline/declareResult/'
          
          title='Declare Results'
          fontIcon='bi-layers'
          hasBullet={true}
        />

<SidebarMenuItem
          to='/starline/resultHistory/'
          
          title='Result History'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        
        <SidebarMenuItem
          to='/starline/sellReports/'
          
          title='Starlinr Sell Reports'
          fontIcon='bi-layers'
          hasBullet={true}
        />
        

        <SidebarMenuItem
          to='/starline/winReports/'
          
          title='Starlinr Winning Reports'
          fontIcon='bi-layers'
          hasBullet={true}
        />

          <SidebarMenuItem
          to='/starline/winPrediction/'
          
          title='Starlinr Winning Prediction'
          fontIcon='bi-layers'
          hasBullet={true}
        />

      </SidebarMenuItemWithSub>
  
         
      <SidebarMenuItem
          to='/user/query/'
          
          title='User Query'
        
            icon='/media/icons/duotune/general/gen045.svg'
        
            fontIcon='bi-layers'
        />

      <SidebarMenuItem
          to='/admin/sub_adminManagment/'
          
          title='Sub Admin Management'
        
            icon='/media/icons/duotune/general/gen028.svg'
        
            fontIcon='bi-layers'
        />
  
    </>
   
   
  
  )
}

export {SidebarMenuMain}
