import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const { amount } = useParams();
  const payableAmount = parseInt(amount);

  // Create stripePromise with publishable key.
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl text-gray-600 text-center mb-7 underline">
        Payable Amount ={" "}
        <span className="font-bold text-primary_color">{payableAmount} $</span>
      </h1>
      <div className="border border-primary_color p-5 rounded-lg">
        <Elements stripe={stripePromise}>
          <CheckoutForm payableAmount={payableAmount} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
