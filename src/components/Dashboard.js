import React from "react";
import SalesStat from "./DashboardSection/SalesStat";
import CategoryCount from "./DashboardSection/CategoryCount";
import Orders from "./DashboardSection/Orders";
import PurchasedPackage from "./DashboardSection/PurchasedPackage";
import SoldAmount from "./DashboardSection/SoldAmount";
import VerifiedBadge from "./DashboardSection/VerifiedBadge";
import CardBox from "./DashboardSection/CardBox";
import MoneyWithdraw from "./DashboardSection/MoneyWithdraw";
import AddNewProduct from "./DashboardSection/AddNewProduct";
import ShopSettings from "./DashboardSection/ShopSettings";
import PaymentSettings from "./DashboardSection/PaymentSettings";
import TopProductsSlider from "./DashboardSection/TopProductsSlider";



export default function Dashboard() {
  return (
    <div>
        <h1 className="ml-8 mt-4  text-base font-[500]">Dashboard</h1>
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        
 
      {/* Product Card */}
      <CardBox
        title="Products"
        value="47"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="1" viewBox="0 0 24 24" className="w-14 h-14">
            <path d="M21 16.5V7.5a1 1 0 0 0-.553-.894l-8-4a1 1 0 0 0-.894 0l-8 4A1 1 0 0 0 3 7.5v9a1 1 0 0 0 .553.894l8 4a1 1 0 0 0 .894 0l8-4A1 1 0 0 0 21 16.5z" />
            <path d="M3.27 6.96l8.73 4.49 8.73-4.49M12 22v-9" />
          </svg>
        }
      />

      {/* Rating Card */}
      <CardBox
        title="Rating"
        value="5"
        footer="Followers 0 | Custom Followers 0"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24" className="w-14 h-14">
            <path d="M12 2l2.09 6.26L21 9.27l-5 3.64L17.91 21 12 17.27 6.09 21 8 12.91 3 9.27l6.91-1.01L12 2z" />
          </svg>
        }
      />

      {/* Order Card */}
      <CardBox
        title="Total Order"
        value="17"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24" className="w-14 h-14">
            <path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            <path d="M8 10h8M8 14h5" />
          </svg>
        }
      />

      {/* Sales Card */}
      <CardBox
        title="Total Sales"
        value="$5,579.390"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24" className="w-14 h-14">
            <path d="M4 18V5a1 1 0 0 1 1-1h14M20 10l-4 4-4-4-4 4-4-4" />
          </svg>
        }
      />
    <div className="flex flex-col gap-4 ">
  <div><SalesStat /></div>
  <div className="ml-6"><SoldAmount /></div>
</div>
      {/* <SalesStat /> */}
      <CategoryCount />
      <Orders />
     
    
     
      <div className="flex flex-col gap-4 ">
  <div> <PurchasedPackage /></div>
  <div className="ml-6"> <VerifiedBadge /></div>
</div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 px-4 mb-6">
        <MoneyWithdraw />
        <AddNewProduct />
        <ShopSettings />
        <PaymentSettings />
      </div>
      <div>
        <TopProductsSlider/>
      </div>
    </div>
  );
}