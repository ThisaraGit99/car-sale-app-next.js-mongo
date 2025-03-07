interface StatsCardProps {
    title: string;
    value: string | number;
    secondaryValue?: string;
  }
  
  export default function StatsCard({ title, value, secondaryValue }: StatsCardProps) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold mt-2">{value}</p>
        {secondaryValue && (
          <p className="text-sm text-gray-500 mt-1">{secondaryValue}</p>
        )}
      </div>
    );
  }