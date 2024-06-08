import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MySubmissions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Load mySubmissionData
  const { data: mySubmissionData, isPending } = useQuery({
    queryKey: ["mySubmissionData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my/submission?email=${user?.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return;
  }

  return (
    <div className="max-w-5xl mx-auto py-4 md:py-10">
      <Helmet>
        <title>Dashboard | My-Submission</title>
      </Helmet>
      <h2 className="font-bold text-2xl text-gray-600 text-center mb-3">
        My Submission-List
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
              {mySubmissionData.map((submission, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{submission.title}</td>
                  <td>{submission.amount} Coin</td>
                  <td>{submission.creator_name}</td>
                  <td>{submission.date}</td>
                  <td>
                    {submission.status === "Pending" ? (
                      <p className="bg-warning py-2 px-3 rounded-lg text-center text-white">
                        {submission.status}
                      </p>
                    ) : submission.status === "Rejected" ? (
                      <p className="bg-red-500 py-2 px-3 rounded-lg text-center text-white">
                        {submission.status}
                      </p>
                    ) : (
                      <p className="bg-green-600 py-2 px-3 rounded-lg text-center text-white">
                        {submission.status}
                      </p>
                    )}
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

export default MySubmissions;
