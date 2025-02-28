import StatsCard from '@/app/components/StatsCard';
import AnalyticsChart from '@/app/components/AnalyticsChart';
import RecentActivity from '@/app/components/RecentActivity';
import Sidebar from '@/app/components/Sidebar';

async function getStats() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/stats`);
  return res.json();
}

export default async function Dashboard() {
  const { cars } = await getStats();

  return (
    <div className="flex min-h-screen">
      
      <main className="flex-1 p-8 bg-gray-50">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            title="Total Cars" 
            value={(cars?.available?.count || 0) + (cars?.sold?.count || 0)} 
          />
          <StatsCard 
            title="Available Cars" 
            value={cars?.available?.count || 0} 
          />
          <StatsCard 
            title="Sold Cars" 
            value={cars?.sold?.count || 0} 
          />
          <StatsCard 
            title="Pending Cars" 
            value={cars?.pending?.count || 0} 
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AnalyticsChart data={[]} />
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Price Distribution</h3>
            {/* Add price range chart here */}
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </main>
    </div>
  );
}