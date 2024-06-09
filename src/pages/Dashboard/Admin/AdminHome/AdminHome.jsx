import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Chart from "../../../../components/Chart/Chart";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Load chart data.
  const { data: chartData = [] } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  // Load Withdraw data.
  const {
    data: withdrawData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["withdrawData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/withdraw?email=${user?.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return;
  }

  // handlePaymentSuccess
  const handlePaymentSuccess = async (item) => {
    await axiosSecure.delete(`/withdraw/remove/${item._id}`).then((res) => {
      if (res.data.acknowledged) {
        axiosSecure.put("/withdraw/workercoin/update", item).then((res) => {
          if (res.data.acknowledged) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Withdraw request is successfull!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-4 md:py-10">
      <Helmet>
        <title>Dashboard | Admin Home</title>
      </Helmet>

      {/* barchart */}
      <div className="flex justify-center mb-5 md:mb-10">
        <Chart chartData={chartData} />
      </div>

      {/* withdraw data table */}
      <h2 className="font-bold text-2xl text-gray-600 text-center mb-3">
        Withdraw request-List
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#EEF1F4] text-base font-semibold">
              <tr>
                <th>Sl-No</th>
                <th>Worker-Name</th>
                <th>Withdraw-Coin</th>
                <th>Withdraw-Amount</th>
                <th>Payment-Number</th>
                <th>Payment-Methods</th>
                <th>Withdraw Date&Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.worker_name}</td>
                  <td>{item.withdraw_coin} Coin</td>
                  <td>{item.withdraw_amount}</td>
                  <td>{item.account_number}</td>
                  <td>{item.payment_method}</td>
                  <td>{item.date_and_time}</td>
                  <td>
                    <button
                      onClick={() => handlePaymentSuccess(item)}
                      className="btn btn-sm bg-primary_color text-white"
                    >
                      Payment-Success
                    </button>
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

export default AdminHome;
