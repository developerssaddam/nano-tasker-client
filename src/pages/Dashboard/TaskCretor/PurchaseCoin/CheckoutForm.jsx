import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import moment from "moment";
import Swal from "sweetalert2";
import useSingleUser from "../../../../hooks/useSingleUser";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ payableAmount }) => {
  const stripe = useStripe();
  const [intentClientSecret, setIntentClientSecret] = useState(null);
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { singleUser, refetch } = useSingleUser();
  const navigate = useNavigate();

  // Calculate total payable coin
  let totalPayableCoin = "";
  if (payableAmount === 1) {
    totalPayableCoin = 10;
  } else if (payableAmount === 9) {
    totalPayableCoin = 100;
  } else if (payableAmount === 19) {
    totalPayableCoin = 500;
  } else if (payableAmount === 39) {
    totalPayableCoin = 1000;
  }

  // Load Intent client secret.
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { amount: payableAmount })
      .then((res) => {
        setIntentClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, payableAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    // Create payment methods.
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    // Create confirm payment.
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(intentClientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: "Jenny Rosen",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        // Crete payment info object
        const paymentInfo = {
          email: user?.email,
          payableAmoutn: payableAmount,
          transectionId: paymentIntent.id,
          dateAndTime: moment().format("MMMM Do YYYY, h:mm a"),
        };

        // Send payment data to db
        axiosSecure.post("/payment", paymentInfo).then((res) => {
          if (res.data.acknowledged) {
            axiosSecure
              .put("/users/updatecoin/task", {
                email: user?.email,
                updatedCoin: singleUser?.totalCoin + totalPayableCoin,
              })
              .then((res) => {
                if (res.data.acknowledged) {
                  refetch();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    text: "Your have payment successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/dashboard/taskcreator");
                }
              });
          }
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#C738BD",
                "::placeholder": {
                  color: "#C738BD",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <p className="text-red-500 font-medium mt-3">{error}</p>
        <button
          type="submit"
          disabled={!stripe || !intentClientSecret}
          className="btn btn-sm w-full bg-primary_color text-white mt-6"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
