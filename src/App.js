import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import VerifyOtp from "./pages/VerifyOtp";
import OrdersPage from "./pages/OrdersPage.js";
import Dashboard from "./pages/Dashboard.js";
import EarningsPage from "./pages/EarningsPage.js";
import Navbar from "./components/Navbar.js";
import Sidebar from "./components/Sidebar.js";
import PreordersPage from "./components/preorders/PreOrders.js";
import HomeSlider from "./components/settings/HomeSlider.js";
import TodaysDeals from "./components/settings/TodaysDeals.js";
import BannerLevel1 from "./components/settings/BannerLevel1.js";
import PreorderBanner1 from "./components/settings/PreorderBanner1.js";
import BannerLevel2 from "./components/settings/BannerLevel2.js";
import BannerLevel3 from "./components/settings/BannerLevel3.js";
import AuctionBanner from "./components/settings/AuctionBanner.js";
import CategoryWiseProducts from "./components/settings/CaterogyWiseProducts.js";
import Classified from "./components/settings/Classified.js";
import NewestPreorderProducts from "./components/settings/NewestPreorderProducts.js";
import SettingsLayout from "./components/settings/SettingsLayout.js";
import TopBrands from "./components/settings/TopBrands.js";
import CategoryBased from "./pages/products/CategoryBased.jsx";
import PreorderProducts from "./components/preorders/preOrderProducts/preorderProducts.jsx";
import PreOrderQueries from "./components/preorders/preOrderQueries/preOrderQueries.jsx";
import PreOrderReviews from "./components/preorders/preOrderReviews/preOrderReviews.jsx";

import PreOrderSetting from "./components/preorders/preOrderSettings/preOrderSetting.jsx";
import PreOrderNotification from "./components/preorders/preOrderNotifications/preOrderNotification.jsx";
import PreOrderFaq from "./components/preorders/preOrderFaq/preOrderFaq.jsx";
import PreOrderDashboard from "./components/preorders/dashboard/dashboards.jsx";
import DelayedPrepaymentPreOrders from "./components/preorders/orders/delayedprepaymentorders.jsx";
import DelayedFinalPreOrders from "./components/preorders/orders/delayedfinalorders.jsx";
import Create from "./pages/sellers/Create.jsx";
import Ticket from "./pages/support/Ticket.js";
import Addreview from "./pages/products/Addreview.jsx";
import Review from "./pages/products/Review.jsx";
// import Category from "./pages/products/Category.js";
import Bulkimport from "./pages/products/Bulkimport.jsx"
import ReviewDetail from "./pages/products/ReviewDetail.js";
import Product from "./pages/products/Product.js";
import DigitalProducts from "./pages/products/DigitalProducts.js";
import Wholesale from "./components/Wholesale.js";
import WholesaleCreate from "./components/WholesaleCreate.js";
import UploadsFiles from "./components/UploadsFiles.js";
import RefundTable from "./components/RefundTable.js";
import ShopSetting from "./components/ShopSetting.js";
import PaymentHistoryTable from "./components/PaymentHistoryTable.js";
import MoneyWithdraws from "./components/MoneyWithdraws.js";
import ProductCreate from "./pages/products/ProductCreate.js";
import DigitalProductCreate from "./pages/products/DigitalProductCreate.js";
import Conversation from "./pages/support/ProductQuires.js";
import Queries from "./pages/support/Queries.js";
import Contact from "./pages/support/Contact.js";
// import AllStaff from "./pages/staffs/AllStaff.js";
// import StaffCreate from "./pages/staffs/StaffCreate.js";
// import Roles from "./pages/staffs/Roles.js";
// import RolesCreate from "./pages/staffs/RolesCreate.js";
// import Edit from "./pages/staffs/Edit.js";
import Supports from "./pages/support/Supports.js";
// import EditInfo from "./pages/staffs/editInfo.js";
import PreOrderCommision from "./components/preorders/preorderCommision/preOrderCommision.jsx"
import Conversationpreorder from "./components/preorders/preorderconversation/Conversationpreorder.jsx"
import Details from "./components/preorders/preOrderReviews/details.jsx"
import Signup from "./pages/Signup"
import Viewquery from "./components/preorders/orders/viewquery.jsx"
import Addpreorder from "./components/preorders/addpreOrder/addpreorder.jsx"

import CommisionHistory from "./components/CommisionHistory/Commisionhistory.jsx"
import ProductQuery from "./components/query/query.jsx"
import Supportticket from "./components/Supportticket/Supportticket.jsx"
import Createticket from "./components/Supportticket/Createticket.jsx";
import Conversations from "./components/Conversation/conversation.jsx";
import Vieworder from "./components/orders/Vieworder.js"
import Viewdelayedpayment from "./components/preorders/orders/Viewdelayedpayment.jsx"
import Viewfinal from "./components/preorders/orders/Viewfinal.jsx"
// import AllOrders from './components/preorders/orders/AllOrders';
import AllOrders from "./components/preorders/orders/allOrders.jsx"
import { ProductQuestionAnswer } from "./components/product/query.jsx";


function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* <Sidebar isSidebarVisible={isSidebarVisible} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            toggleSidebar={toggleSidebar}
          /> */}
        {(!isMobile || isSidebarVisible) && (
          <Sidebar isSidebarVisible={isMobile ? true : isSidebarVisible} />
        )}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            toggleSidebar={toggleSidebar}
          />
          <div className="flex-1 bg-[#f5f6fa] overflow-y-auto">
            <Routes>
              <Route
                path="/products/CategoryBased"
                element={<CategoryBased />}
              />
              <Route path="/products/bulk-import" element={<Bulkimport />} />
              <Route path="/products">
                <Route path="category-discount" element={<CategoryBased />} />{/* done */}
                <Route path="review" element={<Review />} /> {/* done */}
                <Route path="Addreview" element={<Addreview />} /> {/* done */}
                <Route path="/products/review-detail" element={<ReviewDetail />} />
                <Route path="/products/digitalproducts" element={<DigitalProducts />} />{/* done */}
              </Route>
              <Route path="/products">
                <Route path="product" element={<Product />} /> {/* done */}
                <Route path="create" element={<ProductCreate />} /> {/* done */}
              </Route>
              <Route path="/digitalproducts/create" element={<DigitalProductCreate />} />

              <Route path="/" element={<Dashboard />} />


              <Route path="/orders" element={<OrdersPage />} />

              <Route path="/wholesale" element={<Wholesale />} />{/* done */}
              <Route path="/wholesale/create" element={<WholesaleCreate />} />{/* done */}
              <Route path="/upload" element={<UploadsFiles />} />
              <Route path="/refund-request" element={<RefundTable />} />
              <Route path="/shop" element={<ShopSetting />} />
              <Route path="/payment" element={<PaymentHistoryTable />} />
              <Route path="/money" element={<MoneyWithdraws />} />
              <Route path="signup" element={<Signup />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/preorders" element={<PreordersPage />} />
              <Route path="/earnings" element={<EarningsPage />} />
              <Route path="/settings" element={<SettingsLayout />}>
                <Route index element={<HomeSlider />} />
                <Route path="home-slider" element={<HomeSlider />} />
                <Route path="todays-deal" element={<TodaysDeals />} />
                <Route path="banner-level-1" element={<BannerLevel1 />} />
                <Route path="preorder-banner-1" element={<PreorderBanner1 />} />
                <Route path="banner-level-2" element={<BannerLevel2 />} />
                <Route path="banner-level-3" element={<BannerLevel3 />} />
                <Route path="auction-products" element={<AuctionBanner />} />
                <Route path="category-wise-products" element={<CategoryWiseProducts />}/>
                <Route path="classifieds" element={<Classified />} />
                <Route
                  path="newest-preorder-products"
                  element={<NewestPreorderProducts />}
                />
                <Route path="top-brands" element={<TopBrands />} />
              </Route>
              <Route path="/preorder">
                <Route path="product" element={<PreorderProducts />} />{/* done */}
                <Route path="queries" element={<PreOrderQueries />} />{/* done */}
                <Route path="reviews" element={<PreOrderReviews />} />{/* done */}
                <Route path="setting" element={<PreOrderSetting />} />{/* done */}
                <Route path="notification" element={<PreOrderNotification />} />
                <Route path="faq" element={<PreOrderFaq />} />
                <Route path="dashboard" element={<PreOrderDashboard />} />
                <Route path="preorder-commision" element={<PreOrderCommision />} />{/* done */}
                <Route path="preorder-conversion" element={<Conversationpreorder />} />{/* done */}
                <Route path="details" element={<Details />} />
                <Route path="query" element={<Viewquery />} />
                <Route path="addpreorder" element={<Addpreorder />} />
                <Route path="all-orders" element={<AllOrders />} />{/* done */}
                <Route path="delayed-prepayment-orders" element={<DelayedPrepaymentPreOrders />}/>{/* done */}
                <Route path="delayed-final-orders" element={<DelayedFinalPreOrders />}/>{/* done */}
              </Route>
              <Route path="/support">
                <Route path="ticket" element={<Ticket />} />
                <Route path="conversations" element={<Conversation />} />
                <Route path="queries" element={<Queries />} />
                <Route path="contact" element={<Contact />} />
                <Route path="create" element={<Create />} />
                <Route path="supports" element={< Supports />} />
              </Route>
              <Route path="/commissionhistory" element={<CommisionHistory />} />{/* done */}
              {/* <Route path="/product-queries" element={<ProductQuery />} />done */}
              
              <Route path="/product-queries" element={<ProductQuery />} />
              <Route path="/support-ticket" element={<Supportticket />} />{/* done */}
              <Route path="/create-ticket" element={<Createticket />} />{/* done */}
              <Route path="/conversation" element={<Conversations />} />
              <Route path="/vieworder" element={<Vieworder />} />
              <Route path="/viewdelayedpayment" element={<Viewdelayedpayment />} />
              <Route path="/viewfinal" element={<Viewfinal />} />
               <Route path="/product/query" element={<ProductQuestionAnswer/> }/>
              
              {/* <Route path="/product/query" element={<Viewquery />} />
              <Route path="/query/query" element={<ProductQuery />} />
              <Route path="/Supportticket/supportticket" element={<Supportticket />} />
              <Route path="/commisionhistory/commisionhistory" element={<CommisionHistory />} />
              <Route path="/conversation/conversation" element={<Conversations />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
