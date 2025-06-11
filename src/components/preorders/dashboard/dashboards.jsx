import { MoveRightIcon, Plus } from "lucide-react"
import "./dashboard.scss"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function PreOrderDashboard() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [totalPreorderProducts, setTotalPreorderProducts] = useState(null);
    const [livePreorderProducts, setLivePreorderProducts] = useState(null);
    const [delayedPrepaymentOrders, setDelayedPrepaymentOrders] = useState(null);
    const [delayedFinalOrders, setDelayedFinalOrders] = useState(null);
    const [inhouseSales, setInhouseSales] = useState(null);
    const [sellersSales, setSellersSales] = useState(null);
    const [preorderRequests, setPreorderRequests] = useState(null);
    const [acceptedRequests, setAcceptedRequests] = useState(null);
    const [confirmedPrepayments, setConfirmedPrepayments] = useState(null);
    const [finalPreorders, setFinalPreorders] = useState(null);
    const [inShipping, setInShipping] = useState(null);
    const [delivered, setDelivered] = useState(null);

    // eslint-disable-next-line no-unused-vars
    const [newnotifications, setNotifications] = useState([]);

    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setTotalPreorderProducts(39);
            setLivePreorderProducts(25);
            setDelayedPrepaymentOrders(3);
            setDelayedFinalOrders(1);
            setInhouseSales("$186,976.890");
            setSellersSales("$95,321.540");
            setPreorderRequests(15);
            setAcceptedRequests(5);
            setConfirmedPrepayments(2);
            setFinalPreorders(12);
            setInShipping(0);
            setDelivered(24);
            setLoading(false);
            setNotifications([
                { id: 1, name: "Product A", request: 10, prepayment: 5, finalOrder: 7, totalSOld: 12 },
                { id: 2, name: "Product B", request: 15, prepayment: 8, finalOrder: 10, totalSOld: 18 },
                // Add more dummy notifications as needed
            ]);
        }, 1500); // Simulate loading time
    }, []);

  const handleClick = () => {
    navigate("/preorder/addpreorder");
  }

    const notifications = [
        {
            id: 1,
            image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/abViCqVpFQIIwjlRwrVvowHeMLPJ3i7h8VVnbFke.png",
            name: "Jessica Simpson Womens Setria Solid Slip- On Pumps Jessica Simpson Womens Setria Solid Slip - On Pumps",
            request: 1,
            prepayment: 0,
            finalOrder: 0,
            totalSOld: 0
        },
        {
            id: 2,
            image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/abViCqVpFQIIwjlRwrVvowHeMLPJ3i7h8VVnbFke.png",
            name: "Jessica Simpson Womens Setria Solid Slip- On Pumps Jessica Simpson Womens Setria Solid Slip - On Pumps",
            request: 1,
            prepayment: 0,
            finalOrder: 0,
            totalSOld: 0
        },
        {
            id: 3,
            image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/abViCqVpFQIIwjlRwrVvowHeMLPJ3i7h8VVnbFke.png",
            name: "Jessica Simpson Womens Setria Solid Slip- On Pumps Jessica Simpson Womens Setria Solid Slip - On Pumps",
            request: 1,
            prepayment: 0,
            finalOrder: 0,
            totalSOld: 0
        },

        {
            id: 4,
            image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/abViCqVpFQIIwjlRwrVvowHeMLPJ3i7h8VVnbFke.png",
            name: "Jessica Simpson Womens Setria Solid Slip- On Pumps Jessica Simpson Womens Setria Solid Slip - On Pumps",
            request: 1,
            prepayment: 0,
            finalOrder: 0,
            totalSOld: 0
        },
        {
            id: 5,
            image: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/abViCqVpFQIIwjlRwrVvowHeMLPJ3i7h8VVnbFke.png",
            name: "Jessica Simpson Womens Setria Solid Slip- On Pumps Jessica Simpson Womens Setria Solid Slip - On Pumps",
            request: 1,
            prepayment: 0,
            finalOrder: 0,
            totalSOld: 0
        },
    ]



    return (
        <div className="PreOrderDashboard">
            <div className="PreOrderDashboardBox">
            <div className="preOrderDashboardFirst">
            <div className="preOrderDashboardCard">
                <p className="dashHead">
                    {loading ? <Skeleton width={180} /> : "Total Preorder Products"}
                </p>
                <p className="dashSub">
                    {loading ? <Skeleton width={250} /> : "Total product uploaded as preorder product"}
                </p>
                <p className="dashNum">
                    {loading ? <Skeleton width={50} /> : totalPreorderProducts}
                </p>
                <div className="view-all-button">
                    <p className="viewDashText">
                        {loading ? <Skeleton width={150} /> : "View all products"}
                    </p>
                    {loading ? <Skeleton width={18} height={18} /> : <MoveRightIcon size={18} />}
                </div>
            </div>
            <div className="preOrderDashboardCard yellowBorder">
                <p className="dashHead">
                    {loading ? <Skeleton width={200} /> : "Live Preorder Products"}
                </p>
                <p className="dashSub">
                    {loading ? <Skeleton width={280} /> : "Preorder products currently available to order"}
                </p>
                <p className="dashNum">
                    {loading ? <Skeleton width={50} /> : livePreorderProducts}
                </p>
                <div className="view-all-button">
                    <p className="viewDashText">
                        {loading ? <Skeleton width={180} /> : "View all live products"}
                    </p>
                    {loading ? <Skeleton width={18} height={18} /> : <MoveRightIcon size={18} />}
                </div>
            </div>
            <div className="preOrderDashboardCard yellowBack">
                <div className="deBox">
                    <div className="view-all-button">
                        <p className="dashHead">
                            {loading ? <Skeleton width={220} /> : "Delayed Prepayment Orders"}
                        </p>
                        {loading ? <Skeleton width={18} height={18} /> : <MoveRightIcon size={18} />}
                    </div>
                    <p className="detext">
                        {loading ? <Skeleton width={30} /> : delayedPrepaymentOrders}
                    </p>
                </div>
                <div className="deBox">
                    <div className="view-all-button">
                        <p className="dashHead">
                            {loading ? <Skeleton width={200} /> : "Delayed Final Orders"}
                        </p>
                        {loading ? <Skeleton width={18} height={18} /> : <MoveRightIcon size={18} />}
                    </div>
                    <p className="detext">
                        {loading ? <Skeleton width={30} /> : delayedFinalOrders}
                    </p>
                </div>
            </div>
            <div className="preOrderDashboardCard grayBorder cursor-pointer" onClick={handleClick} >
                {loading ? <Skeleton width={150} height={150} circle className="mx-auto" /> : <Plus size={150} color="gray" className="mx-auto" />}
                <p className="addNewProduct">
                    {loading ? <Skeleton width={200} /> : "Add new preorder product"}
                </p>
            </div>
        </div>

        <div className="preOrderDashboardStats">
            <div className="salesStatsBox">
                <div className="salesStatsLeft">
                    <div className="leftOneBox">
                        <p className="salesStatsHead">
                            {loading ? <Skeleton width={100} /> : "Sales Stats"}
                        </p>
                        <p className="saleStatsSub">
                            {loading ? <Skeleton width={150} /> : "All sales in pre order system"}
                        </p>
                    </div>
                    <div className="leftOneBox">
                        <p className="salesText">
                            {loading ? <Skeleton width={120} /> : "In-house preorder sales"}
                        </p>
                        <p className="salesDollar">
                            {loading ? <Skeleton width={150} /> : inhouseSales}
                        </p>
                    </div>
                    <div className="leftOneBox">
                        <p className="salesText">
                            {loading ? <Skeleton width={110} /> : "Sellers preorder sales"}
                        </p>
                        <p className="salesDollar">
                            {loading ? <Skeleton width={150} /> : sellersSales}
                        </p>
                    </div>
                </div>
                <div className="salesStatsRight">
                    {loading ? (
                        <>
                            <Skeleton width={150} height={100} />
                            <Skeleton width={150} height={100} className="mt-4" />
                        </>
                    ) : (
                        // Your actual chart/graph component would go here
                        <div style={{ width: '150px', height: '208px', backgroundColor: '#f0f0f0' }}>
                            {/* Placeholder for chart */}
                        </div>
                    )}
                </div>
            </div>

            <div className="preOrderSalesStats rowspan2">
                <div className="preOrderSalesLeft">
                    <div className="preorderStates">
                        <p className="preorderStatesHead">
                            {loading ? <Skeleton width={120} /> : "Preorder States"}
                        </p>
                        <p className="preOrderStatesSub">
                            {loading ? (
                                <Skeleton count={2} width={200} />
                            ) : (
                                "All states of the preorder system up-to final order. All the states here has multiple actions."
                            )}
                        </p>
                    </div>
                </div>
                <div className="preOrderSalesRight">
                    <div className="preOrderRequests backGrayWhite">
                        <p className="preOrderRequestsHead">
                            {loading ? <Skeleton width={130} /> : "Preorder Requests"}
                        </p>
                        <p className="preOrderStatesSub">
                            {loading ? <Skeleton width={180} /> : "Customers applied for a preorder product"}
                        </p>
                        <p className="preOrderReqNum">
                            {loading ? <Skeleton width={30} /> : preorderRequests}
                        </p>
                    </div>
                    <div className="preOrderRequests">
                        <p className="preOrderRequestsHead">
                            {loading ? <Skeleton width={140} /> : "Accepted Requests"}
                        </p>
                        <p className="preOrderStatesSub">
                            {loading ? <Skeleton width={200} /> : "Requests accepted & order profile created"}
                        </p>
                        <p className="preOrderReqNum">
                            {loading ? <Skeleton width={30} /> : acceptedRequests}
                        </p>
                    </div>
                    <div className="preOrderRequests">
                        <p className="preOrderRequestsHead">
                            {loading ? <Skeleton width={150} /> : "Confirmed Prepayments"}
                        </p>
                        <p className="preOrderStatesSub">
                            {loading ? <Skeleton width={180} /> : "Prepayments accepted by admin"}
                        </p>
                        <p className="preOrderReqNum">
                            {loading ? <Skeleton width={30} /> : confirmedPrepayments}
                        </p>
                    </div>
                    <div className="preOrderRequests">
                        <p className="preOrderRequestsHead">
                            {loading ? <Skeleton width={120} /> : "Final Preorders"}
                        </p>
                        <p className="preOrderStatesSub">
                            {loading ? <Skeleton width={200} /> : "Completed orders of preorder products"}
                        </p>
                        <p className="preOrderReqNum">
                            {loading ? <Skeleton width={30} /> : finalPreorders}
                        </p>
                    </div>
                    <div className="preOrderRequests">
                        <p className="preOrderRequestsHead">
                            {loading ? <Skeleton width={130} /> : "Preorder Requests"}
                        </p>
                        <p className="preOrderStatesSub">
                            {loading ? <Skeleton width={180} /> : "Customers applied for a preorder product"}
                        </p>
                        <p className="preOrderReqNum">
                            {loading ? <Skeleton width={30} /> : preorderRequests}
                        </p>
                    </div>
                </div>
            </div>

            <div className="orderStatusBox">
                <div className="orderStatusBoxHead">
                    <p className="oshead">
                        {loading ? <Skeleton width={100} /> : "Ordr Status"}
                    </p>
                    <p className="ostext">
                        {loading ? (
                            <Skeleton width={250} />
                        ) : (
                            "Order status represents the delivery and order status of your preorders."
                        )}
                    </p>
                </div>
                <div className="orderStatusBoxLower">
                    <div className="orsbls">
                        <p className="inShip">
                            {loading ? <Skeleton width={80} /> : "In Shipping"}
                        </p>
                        <p className="inShip">
                            {loading ? <Skeleton width={20} /> : inShipping}
                        </p>
                    </div>
                    <div className="orsbls noBack">
                        <p className="inShip">
                            {loading ? <Skeleton width={80} /> : "Delivered"}
                        </p>
                        <p className="inShip">
                            {loading ? <Skeleton width={30} /> : delivered}
                        </p>
                    </div>
                </div>
            </div>
        </div>


        <div className="preOrderNotificationBox ma10">
            <div className="preOrderNotificationBoxHeader">
                <p className="notificationTypes">
                    {loading ? <Skeleton width={100} /> : "Preorder Types"}
                </p>
                <div className="notificationMenu">
                    <div className="notMLeft">
                        <p className="notMItem activeNot">
                            {loading ? <Skeleton width={40} /> : "All"}
                        </p>
                        <p className="notMItem">
                            {loading ? <Skeleton width={60} /> : "In House"}
                        </p>
                        <p className="notMItem">
                            {loading ? <Skeleton width={50} /> : "Sellers"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="preOrderNotificationLower">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>{loading ? <Skeleton width={20} /> : "#"}</th>
                                <th>{loading ? <Skeleton width={80} /> : "Product"}</th>
                                <th>{loading ? <Skeleton width={60} /> : "Request"}</th>
                                <th>{loading ? <Skeleton width={80} /> : "Prepayment"}</th>
                                <th>{loading ? <Skeleton width={80} /> : "Final Order"}</th>
                                <th>{loading ? <Skeleton width={80} /> : "Total Sold"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array(5)
                                    .fill(null)
                                    .map((_, index) => (
                                        <tr key={index}>
                                            <td><Skeleton width={20} /></td>
                                            <td>
                                                <div className="pnamebox">
                                                    <Skeleton width={100} />
                                                </div>
                                            </td>
                                            <td><Skeleton width={60} /></td>
                                            <td><Skeleton width={80} /></td>
                                            <td><Skeleton width={80} /></td>
                                            <td><Skeleton width={80} /></td>
                                        </tr>
                                    ))
                            ) : (
                                notifications.map((n) => (
                                    <tr key={n.id}>
                                        <td>{n.id}</td>
                                        <td>
                                            <div className="pnamebox">
                                                <p className="pnamepre">{n.name}</p>
                                            </div>
                                        </td>
                                        <td>{n.request}</td>
                                        <td>{n.prepayment}</td>
                                        <td>{n.finalOrder}</td>
                                        <td>{n.totalSOld}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

            </div>
        </div>
    )
}