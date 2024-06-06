import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments, isPending } = useQuery({
    queryKey: ["AllPayment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user?.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return;
  }

  return (
    <div className="max-w-5xl mx-auto py-4 md:py-10">
      <Helmet>
        <title>Dashboard | Payment-History</title>
      </Helmet>
      <h2 className="font-bold text-2xl text-gray-600 text-center mb-3">
        Payment-History
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#EEF1F4] text-base font-semibold">
              <tr>
                <th>Sl-No</th>
                <th>Email</th>
                <th>Amount</th>
                <th>TransectionId</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{payment.email}</td>
                  <td>{payment.payableAmoutn}</td>
                  <td>{payment.transectionId}</td>
                  <td>{payment.dateAndTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
