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
        <div className="w-[80%] flex flex-col items-center justify-center mx-auto">
            <SectionTitle
                title={'Membership Packages'}
            ></SectionTitle>
            <div className="">
                <div className="flex justify-around">
                    <div>
                        <p className="text-xl font-bold pb-4">Membership Package</p>
                        <p className="text-xl">Gold</p>
                    </div>
                    <div>
                        <p className="text-xl font-bold pb-4">Fees</p>
                        <p className="text-xl">$100</p>
                    </div>
                </div>
            </div>
            <SectionTitle
                title={'Pay with Card'}
            ></SectionTitle>
            <div className="min-w-[420px] p-4 rounded-xl border-2">
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;