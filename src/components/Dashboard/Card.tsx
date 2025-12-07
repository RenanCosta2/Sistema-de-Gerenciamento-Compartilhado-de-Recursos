import React from "react";

type Props = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconColor?: string;
};

const DashboardCard: React.FC<Props> = ({ title, value, icon, iconColor }) => {
  return (
    <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>

      <div className={`${iconColor ?? "text-gray-500"} text-4xl`}>
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;
