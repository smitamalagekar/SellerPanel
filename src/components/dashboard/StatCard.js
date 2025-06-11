function StatCard({ title, value, icon, color }) {
    return (
      <div className="p-3 flex justify-between items-center">
        {/* Stat Content */}
        <div>
          <h2 className="text-2xl font-bold">
            {value}
          </h2>
          <p className="text-[#6c7293]">{title}</p>
        </div>
  
        {/* Stat Icon */}
        <div className="text-[#ccc]">{icon}</div>
      </div>
    );
  }
  
  export default StatCard;