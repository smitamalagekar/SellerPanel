import React from "react";
import LatestOrders from "../components/orders/LatestOrders";
import OrderStatistics from "../components/orders/OrderStatistics";

function OrdersPage() {
  return (
    <div>
      <OrderStatistics />
      <div className="m-5">
        <LatestOrders />
      </div>
    </div>
  );
}

export default OrdersPage;
