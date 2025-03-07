// app/components/RecentActivity.tsx
async function RecentActivity() {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/activity`);
    const activities = await response.json();
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((activity: any) => (
            <div key={activity._id} className="border-b pb-2">
              <p className="text-sm font-medium">
                {activity.action.replace('car-', '').toUpperCase()}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(activity.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default RecentActivity;