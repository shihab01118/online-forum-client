import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";
import Title from "../../components/Dashboard/Title";
import Container from "../../components/shared/Container";
import { Card } from "@mui/material";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Membership = () => {
  return (
    <div className="pt-[78px] h-[calc(100vh-78px)] flex items-center justify-center">
      <Helmet>
        <title>DiscussHub | Membership</title>
      </Helmet>
      <Container>
        <div className="m-10">
        <Title heading="Unlock Limitless Posting" subheading="Post Freely and Amplify Your Voice with Gold Access" />
          <Card style={{width: "550px", margin: "40px auto", padding: "32px"}} elevation={4}>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </Card>
        </div>
      </Container>
    </div>
  );
};
export default Membership;
