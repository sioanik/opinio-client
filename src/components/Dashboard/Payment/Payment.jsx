import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import SectionTitle from "../../Comments/SectionTitle";

const Payment = () => {

    const price = useParams()
    const totalPrice = parseInt(price.fee)

    // console.log(price);
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

    return (
        <div className="">
            <SectionTitle
            title={'Pay With Your Card'}
            ></SectionTitle>
            <div className="min-w-96">
                <Elements stripe={stripePromise}>
                    <CheckoutForm totalPrice={totalPrice}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;