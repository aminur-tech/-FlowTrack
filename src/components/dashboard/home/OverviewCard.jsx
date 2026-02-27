const OverviewCard = ({ title, value }) => {
  return (
    <div className="p-6 bg-white rounded-3xl shadow-sm border">
      <p className="text-xs text-gray-400 font-bold">{title}</p>
      <h2 className="text-4xl font-black mt-2">{value}</h2>
    </div>
  );
};

export default OverviewCard;