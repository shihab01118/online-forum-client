import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";
import Title from "../../components/Dashboard/Title";
import Container from "../../components/shared/Container";
import { Card } from "@mui/material";
import useGetUser from "../../hooks/useGetUser";
import Lottie from "lottie-react";
import goldBadge from "../../assets/animations/goldBadge.json";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Membership = () => {
  const currentUser = useGetUser();
  console.log(currentUser);
  return (
    <>
      <Helmet>
        <title>DiscussHub | Membership</title>
      </Helmet>
      <div className="pt-[78px] h-[calc(100vh-78px)] flex items-center justify-center">
        {currentUser?.badge === "gold" ? (
          <div className="max-w-xl flex flex-col justify-center items-center">
            <div className="w-40">
              <Lottie animationData={goldBadge} loop={false}></Lottie>
            </div>
            <div className="text-center z-[20]">
              <h2 className="text-4xl font-bold text-yellow-500">Congratulatios</h2>
              <p className="text-[#757575] text-lg mt-3 font-medium">Now you can do unlimited post at this forum. Congratulation for being a part of our premium family. More surprises are coming soon. Stay tuned with us.</p>
            </div>
          </div>
        ) : (
          <Container>
            <div className="m-10">
              <Title
                heading="Unlock Limitless Posting"
                subheading="Post Freely and Amplify Your Voice with Gold Access for just $20"
              />
              <Card
                style={{ width: "550px", margin: "40px auto", padding: "32px" }}
                elevation={4}
              >
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </Card>
            </div>
          </Container>
        )}
      </div>
    </>
  );
};
export default Membership;
