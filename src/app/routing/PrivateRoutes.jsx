import { FC, Suspense, useContext} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'

import Cpos from '../pages/cpos/cpos'
import Customers from '../pages/Customers/customers'
import Payments from '../pages/payments/payments'
import UsersPage from '../modules/apps/user-management/UsersPage'
import Roles from '../pages/Roles/Roles'


import CustomerList from '../pages/end-Users/CustomerList/CustomerList'
import DiscountCoupons from '../pages/end-Users/DiscountCoupon/DiscountCoupons'
import ChargingSessions from '../pages/end-Users/ChargingSession/ChargingSessions'
import Communications from '../pages/end-Users/Communication/Communications'
import MyProfile from '../pages/settings/MyProfile'
import ErrorLogs from '../pages/settings/ErrorLogs'
import SystemMasters from '../pages/settings/SystemMasters'
import DefaultSettings from '../pages/settings/DefaultSettings'

import Overview from '../pages/Billing & Payments/Overview/Overview'
import Complains from '../pages/Manage Ev Owners/Complains/Complains'
import UserList from '../pages/Manage Ev Owners/User List/UserList'
import AllTransactions from '../pages/Billing & Payments/All Transactions/AllTransactions'
import CompanyPayouts from '../pages/Billing & Payments/Company Payouts/CompanyPayouts'
import AddDiscountModel from '../pages/end-Users/DiscountCoupon/Components/AddDicountModel'
import AdminManagement from '../pages/SETTINGSs/Admin Managment/AdminManagement'
import AccessManagement from '../pages/SETTINGSs/Access Management/AccessManagement'
import CPOs from '../pages/Manage CPOs/CPOs/CPOs'
import ChargingStations from '../pages/Manage CPOs/Charging Stations/ChargingStations'
import StationLogs from '../pages/Manage CPOs/Station Logs/StationLogs'
import ChargerMap from '../pages/Manage CPOs/Charger Map/ChargerMap'
import Chargers from '../pages/Manage CPOs/Chargers/Chargers'
import ChargerDetails from '../pages/Manage CPOs/Chargers/Pages/ChargerDetails'
import UserPayments from '../pages/Billing & Payments/All Transactions/Pages/UserPayments'
import CompanyPayments from '../pages/Billing & Payments/All Transactions/Pages/CompanyPayments'

import { Private } from '../modules/apps/chat/components/Private'
import { Group } from '../modules/apps/chat/components/Group'
import UserContext from '../../Context/UserContext'
import { WinningPrediction } from '../pages/WinnngPrediction/WinningPrediction'

import { UserQuery } from '../pages/UserQuery/UserQuery'

import { SubAdminManagment } from '../pages/SubAdminManagmnet/SubAdminManagment'
import { StarLineManagment } from '../pages/StarLineManagment/StarLineManagment'
import { SettingsMain } from '../pages/SettingsMain/SettingsMain'
import { NoticeManagment } from '../pages/NoticeManagment/NoticeManagment'
import { GamesNumber } from '../pages/GamesNumber/GamesNumber'
import { GameManagment } from '../pages/GamesManagment/GameManagment'
import { DeclareResult } from '../pages/DeclareResult/DeclareResult'
import { AddFund } from '../pages/WalletManagment/AddFund/AddFund'
import { BidRevert } from '../pages/WalletManagment/BidRevert/BidRevert'
import { FundRequest } from '../pages/WalletManagment/FundRequest/FundRequest'
import { WithdrawalRequest } from '../pages/WalletManagment/WithdrawalRequest/WithdrawalRequest'
import { GameNameSt } from '../pages/StarLineManagment/GameName/GameNameSt'
import { GamesRates } from '../pages/GamesManagment/GamesRates/GamesRates'
import { SingelDigit } from '../pages/GamesNumber/SingelDigit/SingelDigit'
import { JodiDigit } from '../pages/GamesNumber/JodiDigit/JodiDigit'
import { DoublePanna } from '../pages/GamesNumber/DoublePanna/DoublePanna'
import { FullSangam } from '../pages/GamesNumber/FullSangam/FullSangam'
import { HalfSangam } from '../pages/GamesNumber/HalfSangam/HalfSangam'
import { SinglePanna } from '../pages/GamesNumber/SinglePanna/SinglePanna'
import { TriplePanna } from '../pages/GamesNumber/TriplePanna/TriplePanna'
import { ClearData } from '../pages/SettingsMain/ClearData/ClearData'
import { ContactSettings } from '../pages/SettingsMain/ContactSettings/ContactSettings'
import { HowToPlay } from '../pages/SettingsMain/HowToPlay/HowToPlay'
import { MainSettings } from '../pages/SettingsMain/MainSettings/MainSettings'
import { PaymentUPIOptions } from '../pages/SettingsMain/PaymentUPIOptions/PaymentUPIOptions'
import { SliderImage } from '../pages/SettingsMain/SliderImage/SliderImage'
import { SendNotification } from '../pages/NoticeManagment/SendNotification/SendNotification'
import { BidHistory } from '../pages/StarLineManagment/BidHistory/BidHistory'
import { DeclareResults } from '../pages/StarLineManagment/DeclareResults/DeclareResults'
import { GamesName } from '../pages/GamesManagment/GamesName/GamesName'
import { GameRateSt } from '../pages/StarLineManagment/GameRate/GameRateSt'
import { ResultHistory } from '../pages/StarLineManagment/ResultHistory/ResultHistory'
import { StarlinrSellReports } from '../pages/StarLineManagment/StarlinrSellReports/StarlinrSellReports'
import { StarlinrWinningPrediction } from '../pages/StarLineManagment/StarlinrWinningPrediction/StarlinrWinningPrediction'
import { StarlinrWinningReports } from '../pages/StarLineManagment/StarlinrWinningReports/StarlinrWinningReports'
import { AutoDepositeHistory } from '../pages/ReportManagement/AutoDepositeHistory/AutoDepositeHistory'
import { BidWinReport } from '../pages/ReportManagement/BidWinReport/BidWinReport'
import { CustomerSellReport } from '../pages/ReportManagement/CustomerSellReport/CustomerSellReport'
import { UserBidHistory } from '../pages/ReportManagement/UserBidHistory/UserBidHistory'
import { WinningReport } from '../pages/ReportManagement/WinningReport/WinningReport'
import { WithdrawalReport } from '../pages/ReportManagement/WithdrawalReport/WithdrawalReport'
import { UserManagment } from '../pages/UserManagment/UserManagment'
import { UserView } from '../pages/UserManagment/UserView.jsx/UserView'







const PrivateRoutes = () => {
  const {userPermisson}=useContext(UserContext);
// const userPermisson=JSON.parse(sessionStorage.getItem('userPermisson'))
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
      
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
       
        


       
        <Route
          path='customers/*'
          element={
            <SuspensedView>
              <Customers />
            </SuspensedView>
          }
        />
        <Route
          path='payments/*'
          element={
            <SuspensedView>
              <Payments />
            </SuspensedView>
          }
        />

{/* Internal Cpos */}

      


{/* External Cpos */}




        {/* End users */}

        <Route
          path='endusers/customerlist/*'
          element={
            <SuspensedView>
              <CustomerList/>
            </SuspensedView>
          }
        />
        <Route
          path='endusers/discountcoupons/*'
          element={
            <SuspensedView>
              <DiscountCoupons/>
            </SuspensedView>
          }
        />
        <Route
          path='endusers/chargingsessions/*'
          element={
            <SuspensedView>
              <ChargingSessions/>
            </SuspensedView>
          }
        />
        <Route
          path='endusers/communications/*'
          element={
            <SuspensedView>
              <Communications/>
            </SuspensedView>
          }
        />
      

      {/* End users End */}



{/* Sttings */}

            <Route
          path='settings/management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />

         <Route
          path='settings/roles/*'
          element={
            <SuspensedView>
              <Roles/>
            </SuspensedView>
          }
        />



         <Route
          path='settings/myprofile/*'
          element={
            <SuspensedView>
             <MyProfile/>
            </SuspensedView>
          }
        />

        <Route
          path='settings/errorlogs/*'
          element={
            <SuspensedView>
            <ErrorLogs/>
            </SuspensedView>
          }
        />
         
         <Route
          path='settings/system_masters/*'
          element={
            <SuspensedView>
              <SystemMasters/>
            </SuspensedView>
          }
        />

        <Route
          path='settings/default_settings/*'
          element={
            <SuspensedView>
              <DefaultSettings/>
            </SuspensedView>
          }
        />
        

{/* Settings End */}




            <Route
          path='manage-cpos/overview/*'
          element={
            <SuspensedView>
              <Overview/>
            </SuspensedView>
          }
        />
        
        

          


            <Route
          path='manage-cpos/cpos/*'
          element={
            <SuspensedView>
              <CPOs/>
            </SuspensedView>
          }
        />
        
       
        

{/* ======================================================================================= */}

            <Route
            path='manage-cpos/chargers/*'
            element={
              <SuspensedView>
               <Chargers/>
              </SuspensedView>
            }
          />
        
        
{/* ======================================================================================= */}
        


            <Route
          path='manage-cpos/charging-stations/*'
          element={
            <SuspensedView>
            <ChargingStations/>
            </SuspensedView>
          }
        />
        
        


        
         

       
            <Route
            path='manage-cpos/station-logs/*'
            element={
              <SuspensedView>
                <StationLogs/>
              </SuspensedView>
            }
          />
        
        

       


            <Route
            path='manage-cpos/charger-map/*'
            element={
              <SuspensedView>
                <ChargerMap/>
              </SuspensedView>
            }
          />
        
        
       





<Route path='chargerdetails/*'
          element={
            <SuspensedView>
              <ChargerDetails/>
            </SuspensedView>
          }
        />







{
          
            <Route
            path='evowners/overview/*'
            element={
              <SuspensedView>
                <Overview/>
              </SuspensedView>
            }
          />
        
          
        }







{
          
            <Route
            path='evowners/userlist/*'
            element={
              <SuspensedView>
                <UserList/>
              </SuspensedView>
            }
          />
        
          
        }







{
          
            <Route
            path='evowners/complains/*'
            element={
              <SuspensedView>
                <Complains/>
              </SuspensedView>
            }
          />
        
          
        }












{
          userPermisson.BillingOverview && (
            <Route
            path='billing/overview/*'
            element={
              <SuspensedView>
                <Overview/>
              </SuspensedView>
            }
          />
        
          )
        }









      <Route
          path='billing/userpayments/*'
          element={
            <SuspensedView>
              <UserPayments/>
            </SuspensedView>
          }
        />
<Route
          path='billing/companypayments/*'
          element={
            <SuspensedView>
              <CompanyPayments/>
            </SuspensedView>
          }
        />

{
          userPermisson.AllTransactions && (
            <Route
          path='billing/alltransaction/*'
          element={
            <SuspensedView>
              <AllTransactions/>
            </SuspensedView>
          }
        />
        
          )
        }

        


{
          userPermisson.CompanyPayouts && (
            <Route
            path='billing/companypayouts/*'
            element={
              <SuspensedView>
                <CompanyPayouts/>
              </SuspensedView>
            }
          />
        
          )
        }





{
          userPermisson.DiscountCoupons && (
            <Route
          path='billing/discountCoupons/*'
          element={
            <SuspensedView>
              <AddDiscountModel/>
            </SuspensedView>
          }
        />
        
          )
        }




{
          userPermisson.AdminManagment && (
            <Route
            path='settings/adminmanagment/*'
            element={
              <SuspensedView>
                <AdminManagement/>
              </SuspensedView>
            }
          />
        
          )
        }



{
          userPermisson.PrivateChat && (
            <Route
          path='chats/private-chat/*'
          element={
            <SuspensedView>
              <Private/>
            </SuspensedView>
          }
        />
        
          )
        }



<Route
          path='chats/group-chat/*'
          element={
            <SuspensedView>
              <Group/>
            </SuspensedView>
          }
        />


{
          userPermisson.AccessManagment && (
            <Route
            path='settings/accessmanagment/*'
            element={
              <SuspensedView>
                <AccessManagement/>
              </SuspensedView>
            }
          />
        
          )
        }



{
          userPermisson.SystemMasters && (
            <Route
            path='settings/system-masters/*'
            element={
              <SuspensedView>
                <SystemMasters/>
              </SuspensedView>
            }
          />
        
          )
        }



<Route
          path='declare/result/*'
          element={
            <SuspensedView>
              <DeclareResult/>
            </SuspensedView>
          }
        />


        <Route
          path='games/games_Name/*'
          element={
            <SuspensedView>
              <GamesName/>
            </SuspensedView>
          }
        />

<Route
          path='games/games_Rates/*'
          element={
            <SuspensedView>
              <GamesRates/>
            </SuspensedView>
          }
        />


        <Route
          path='gamesNumber/Singel_digite/*'
          element={
            <SuspensedView>
              <SingelDigit/>
            </SuspensedView>
          }
        />
         <Route
          path='gamesNumber/Joid_digite/*'
          element={
            <SuspensedView>
              <JodiDigit/>
            </SuspensedView>
          }
        />

<Route
          path='gamesNumber/Singel_panna/*'
          element={
            <SuspensedView>
              <SinglePanna/>
            </SuspensedView>
          }
        />
<Route
          path='gamesNumber/Double_panna/*'
          element={
            <SuspensedView>
              <DoublePanna/>
            </SuspensedView>
          }
        />

<Route
          path='gamesNumber/Triple_panna/*'
          element={
            <SuspensedView>
              <TriplePanna/>
            </SuspensedView>
          }
        />

<Route
          path='gamesNumber/full_sangam/*'
          element={
            <SuspensedView>
              <FullSangam/>
            </SuspensedView>
          }
        />
        <Route
          path='gamesNumber/half_sangam/*'
          element={
            <SuspensedView>
              <HalfSangam/>
            </SuspensedView>
          }
        />

<Route
          path='notice/managment/*'
          element={
            <SuspensedView>
              <NoticeManagment/>
            </SuspensedView>
          }
        />

<Route
          path='notice/send_notifictions/*'
          element={
            <SuspensedView>
              <SendNotification/>
            </SuspensedView>
          }
        />


        <Route
          path='settings/clearData/*'
          element={
            <SuspensedView>
              <ClearData/>
            </SuspensedView>
          }
        />

<Route
          path='settings/contacts/*'
          element={
            <SuspensedView>
              <ContactSettings/>
            </SuspensedView>
          }
        />
        <Route
          path='settings/how_to_play/*'
          element={
            <SuspensedView>
              <HowToPlay/>
            </SuspensedView>
          }
        />
        <Route
          path='settings/main_Settings/*'
          element={
            <SuspensedView>
              <MainSettings/>
            </SuspensedView>
          }
        />
        <Route
          path='settings/payment_options/*'
          element={
            <SuspensedView>
              <PaymentUPIOptions/>
            </SuspensedView>
          }
        />
        <Route
          path='settings/slider_Image/*'
          element={
            <SuspensedView>
              <SliderImage/>
            </SuspensedView>
          }
        />


        <Route
          path='starline/bidhistory/*'
          element={
            <SuspensedView>
              <BidHistory/>
            </SuspensedView>
          }
        />
        <Route
          path='starline/declareResult/*'
          element={
            <SuspensedView>
              <DeclareResults/>
            </SuspensedView>
          }
        />

<Route
          path='starline/gameName/*'
          element={
            <SuspensedView>
              <GameNameSt/>
            </SuspensedView>
          }
        />

<Route
          path='starline/gameRate/*'
          element={
            <SuspensedView>
              <GameRateSt/>
            </SuspensedView>
          }
        />
        <Route
          path='starline/resultHistory/*'
          element={
            <SuspensedView>
              <ResultHistory/>
            </SuspensedView>
          }
        />
         <Route
          path='starline/sellReports/*'
          element={
            <SuspensedView>
              <StarlinrSellReports/>
            </SuspensedView>
          }
        />

<Route
          path='starline/winPrediction/*'
          element={
            <SuspensedView>
              <StarlinrWinningPrediction/>
            </SuspensedView>
          }
        />
        <Route
          path='starline/winReports/*'
          element={
            <SuspensedView>
              <StarlinrWinningReports/>
            </SuspensedView>
          }
        />

<Route
          path='admin/sub_adminManagment/*'
          element={
            <SuspensedView>
              <SubAdminManagment/>
            </SuspensedView>
          }
        />

<Route
          path='user/managemnt/*'
          element={
            <SuspensedView>
              <UserManagment/>
            </SuspensedView>
          }
        />

<Route
          path='user/view/:id'
          element={
            <SuspensedView>
              <UserView/>
            </SuspensedView>
          }
        />

<Route
          path='user/query/*'
          element={
            <SuspensedView>
              <UserQuery/>
            </SuspensedView>
          }
        />



<Route
          path='wallet/addfunds/*'
          element={
            <SuspensedView>
              <AddFund/>
            </SuspensedView>
          }
        />

<Route
          path='wallet/bidrevert/*'
          element={
            <SuspensedView>
              <BidRevert/>
            </SuspensedView>
          }
        />
        <Route
          path='wallet/fundrequest/*'
          element={
            <SuspensedView>
              <FundRequest/>
            </SuspensedView>
          }
        />

<Route
          path='wallet/withrawal-request/*'
          element={
            <SuspensedView>
              <WithdrawalRequest/>
            </SuspensedView>
          }
        />


<Route
          path='winning/prediction/*'
          element={
            <SuspensedView>
              <WinningPrediction/>
            </SuspensedView>
          }
        />



<Route
          path='report/auto_deposite/*'
          element={
            <SuspensedView>
              <AutoDepositeHistory/>
            </SuspensedView>
          }
        />

<Route
          path='report/bid_win/*'
          element={
            <SuspensedView>
              <BidWinReport/>
            </SuspensedView>
          }
        />

<Route
          path='report/sell/*'
          element={
            <SuspensedView>
              <CustomerSellReport/>
            </SuspensedView>
          }
        />
<Route
          path='report/user_bid_history/*'
          element={
            <SuspensedView>
              <UserBidHistory/>
            </SuspensedView>
          }
        />
        
        <Route
          path='report/winning/*'
          element={
            <SuspensedView>
              <WinningReport/>
            </SuspensedView>
          }
        />

<Route
          path='report/withdrawal/*'
          element={
            <SuspensedView>
              <WithdrawalReport/>
            </SuspensedView>
          }
        />

















 {/* Reports End */}

        {/* Page Not Found /error/404 */}

        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
