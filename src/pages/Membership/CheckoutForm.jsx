import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosSecure from "../../api";
import useAuth from "../../hooks/useAuth";
import useUsers from "../../hooks/useUsers";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useAuth();
  const { refetch } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { money: 20 }).then((res) => {
      const data = res.data;
      setClientSecret(data.clientSecret);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setErrorMessage(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setErrorMessage("");
    }

    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.name || "anonymous",
          },
        },
      });

    if (paymentError) {
      console.log("payment error", paymentError);
    } else {
      // console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction Id : ", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const goldUser = {
          paymentSuccess: true,
          transactionId: paymentIntent.id,
        };

        const { data } = await axiosSecure.patch(
          `/users/update_badge/${user?.email}`,
          goldUser
        );
        // console.log(data);
        if (data.transactionId) {
          refetch();
          navigate("/dashboard/userProfile");
          toast.success("Congratulations! Achived Gold Badge.");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="mt-6 text-red-600">{errorMessage}</p>
      <Button
        variant="contained"
        style={{display: "block", margin: "6px auto"}}
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </Button>
      {transactionId && (
        <p className="text-green-600 text-center font-medium">
          Transaction Id: {transactionId}
        </p>
      )}
    </form>
  );
};
export default CheckoutForm;
