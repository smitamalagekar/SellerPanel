import { Users } from "lucide-react";
import StatCard from "./StatCard";

// Reusable SellerStatusItem component
function SellerStatusItem({ color, label, value }) {
  return (
    <div className="flex items-center my-5">
      <div className={`w-2.5 h-2.5 bg-${color}-500 rounded-full mr-2.5`}></div>
      <span className="flex-1 text-[#6c7293]">{label}</span>
      {value && <span className="font-bold">{value}</span>}
    </div>
  );
}

function SellerSection() {
  const topSellers = [
    { id: 1, avatar: "/seller1.png" },
    { id: 2, avatar: "/seller2.png" },
    { id: 3, avatar: "/seller3.png" },
    { id: 4, avatar: "/seller4.png" },
    { id: 5, avatar: "/seller5.png" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      {/* Total Sellers StatCard */}
      <StatCard
        title="Total sellers"
        value="14"
        icon={<Users size={24} color="#ccc" aria-label="Total Sellers" />}
      />

      {/* Approved Sellers */}
      <SellerStatusItem color="cyan" label="Approved Sellers" value="10" />

      {/* Top Sellers */}
      <SellerStatusItem color="yellow" label="Top Sellers" />

      {/* Seller Avatars */}
      <div className="flex gap-2.5 mb-5">
        {topSellers.map((seller) => (
          <div
            key={seller.id}
            className="w-10 h-10 rounded-full overflow-hidden bg-[#f0f0f0]"
          >
            <img
              src={seller.avatar || "/placeholder.svg"}
              alt="Seller"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Seller Buttons */}
      <div className="flex flex-col gap-2.5 my-10">
        <button className="flex-1 bg-[#e8f5e9] text-[#4caf50] py-2 px-4 rounded-md border-none cursor-pointer hover:bg-green-400 hover:text-green-50">
          All Sellers
        </button>
        <button className="flex-1 bg-[#ffe2e2] text-[#ff5252] py-2 px-4 rounded-md border border-[#ffebee] cursor-pointer hover:bg-red-400 hover:text-red-50">
          Pending Sellers
        </button>
      </div>
    </div>
  );
}

export default SellerSection;