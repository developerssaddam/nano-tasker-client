import { useState } from "react";
import useSingleUser from "../../../../hooks/useSingleUser";
import Swal from "sweetalert2";
import moment from "moment";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const WithDrawals = () => {
  const { singleUser } = useSingleUser();
  const [doller, setDoller] = useState("");
  const userTotalCoin = singleUser?.totalCoin;
  const withDrawDoller = Math.floor(userTotalCoin / 20);
  const axiosSecure = useAxiosSecure();

  // handle coin input change.
  const handleOnchange = (e) => {
    setDoller(e.target.value / 20);
  };

  // handleWithDrawForm
  const handleWithDrawForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const coin = form.coinAmount.value;
    const doller_amount = form.amount.value;
    const payment_method = form.payment_methods.value;
    const account_number = form.account_number.value;

    // validate
    if (doller > withDrawDoller) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Your balance is low!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (!coin || !doller_amount || !payment_method || !account_number) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "All fields are required!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const withDrawInfo = {
      withdraw_coin: parseInt(coin),
      withdraw_amount: doller_amount,
      payment_method,
      account_number,
      worker_email: singleUser?.email,
      worker_name: singleUser?.name,
      date_and_time: moment().format("MMMM Do YYYY, h:mm"),
    };

    await axiosSecure.post("/withdraw/worker", withDrawInfo).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          text: "You have successfully withdraw requist. Please wait for confirmation!",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[550px] py-10">
      <div className="w-full max-w-md p-2 md:p-8 space-y-3 rounded-xl shadow-lg bg-white text-gray-700">
        <h2 className="text-2xl font-semibold text-primary_color">
          WithDraw-Info : 20 Coin = 1 Doller
        </h2>
        <h2 className="text-red-500 text-center font-medium">
          Your Maximum withdraw amount is {withDrawDoller} Doller
        </h2>

        <h2 className="text-2xl font-bold text-center">WithDraw Form</h2>
        <form onSubmit={handleWithDrawForm} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label className="block text-gray-400">WithDraw Coin-Amount</label>
            <input
              name="coinAmount"
              type="number"
              onChange={handleOnchange}
              placeholder="WithDraw Coin Amount"
              className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
            />
          </div>

          <div className="space-y-1 text-sm">
            <label className="block text-gray-400">WithDraw Amount $</label>
            <input
              name="amount"
              type="number"
              value={doller}
              readOnly
              className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
            />
          </div>

          <div className="space-y-1 text-sm">
            <label className="block text-gray-400">
              Select Payment Methods
            </label>
            <select
              name="payment_methods"
              className="select w-full border border-primary_color bg-[#EEF1F4]"
              defaultValue=""
            >
              <option value="" disabled>
                Select One
              </option>
              <option>Bkash</option>
              <option>Rocket</option>
              <option>Nagad</option>
            </select>
          </div>

          <div className="space-y-1 text-sm">
            <label className="block text-gray-400">Account-Number</label>
            <input
              name="account_number"
              type="number"
              placeholder="Account-Number"
              className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
            />
          </div>

          <button className="block w-full p-3 text-center rounded-sm text-white bg-primary_color">
            WithDraw
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithDrawals;
