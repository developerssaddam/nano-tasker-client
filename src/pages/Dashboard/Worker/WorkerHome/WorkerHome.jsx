import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Chart from "../../../../components/Chart/Chart";

const WorkerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Load worker stats data.
  const { data: chartData = [] } = useQuery({
    queryKey: ["workerStats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/worker/stats/${user?.email}`);
      return res.data;
    },
  });

  // Load mySubmissionData
  const { data: myApproveSubmission, isPending } = useQuery({
    queryKey: ["myApproveSubmission", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my/submission/approve?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return;
  }

  return (
    <div className="max-w-5xl mx-auto py-4 md:py-10">
      <Helmet>
        <title>Dashboard | Worker-Home</title>
      </Helmet>

      <div className="flex justify-center mb-5 md:mb10">
        <Chart chartData={chartData} />
      </div>

      <h2 className="font-bold text-2xl text-gray-600 text-center mb-3">
        My Submission Approve-List
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#EEF1F4] text-base font-semibold">
              <tr>
                <th>Sl-No</th>
                <th>Title</th>
                <th>Payable-Amount</th>
                <th>Buyer-Name</th>
                <th>Submission-Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myApproveSubmission.map((submission, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{submission.title}</td>
                  <td>{submission.amount} Coin</td>
                  <td>{submission.creator_name}</td>
                  <td>{submission.date}</td>
                  <td>
                    <p className="bg-green-500 py-2 px-3 rounded-lg text-center text-white">
                      {submission.status}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
