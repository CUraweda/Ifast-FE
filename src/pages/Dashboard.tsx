
import PieChart from '@/components/ui/PieChart';
import HistorySubmissions from '@/components/HistorySubmissions';
import MonthlySubmissionChart from '@/components/MontlySubmissionChart';
import ActivityFeed from '@/components/ActivityFeed';

const Dashboard = () => {
  const series = [44, 55, 41];
  const labels = ['Submissions', 'Approvals', 'Rejections'];

  return (
    <div className="p-4">
      {/* Judul */}
      <p className="text-xl sm:text-2xl mb-4">
        <span className="font-bold text-blue-500">Welcome Back</span>, Nur
        Cahyanto
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col gap-4 sm:w-1/2">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col gap-4 sm:w-1/2">
              <div className="bg-neutral rounded-md p-4 shadow h-32">
                <p className="font-bold text-orange-500">
                  Number of Submissions This Month
                </p>
                <p className="text-xl font-bold">Rp.2.000.000</p>
              </div>
              <div className="bg-neutral rounded-md p-4 shadow h-32">
                <p className="font-bold text-green-500">
                  Application Awaiting Approval
                </p>
                <p className="text-xl font-bold">Rp.2.000.000</p>
              </div>
            </div>

            <div className="bg-neutral rounded-md p-4 shadow sm:w-1/2">
              <PieChart series={series} labels={labels} />
            </div>
          </div>

          <div className="bg-neutral rounded-md shadow p-4 ">
            <div className="flex sticky top-0 bg-neutral z-10 p-3 ">
              <span className="text-cyan-500 font-bold text-xl">
                Submission History
              </span>
            </div>

            <div className="overflow-auto max-h-96">
              <HistorySubmissions />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:w-1/2">
          <div className="bg-neutral rounded-md p-4 shadow h-full">
            <MonthlySubmissionChart />
          </div>

          <div className="bg-neutral rounded-md p-4 shadow h-full">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
