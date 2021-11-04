import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';
import axios from 'axios';

const KEY = "pk_test_51JhkKMLxrBdtcApGadbEeBGzzWyOmLCEoqk6r8WMSa5RUjBJ4CpwXMF2D0865aCFADkS7BVYIwwU4WVz5MfqzgKv00qmkefbfH";

export default function Pay() {
    const [stripeToken, setStripeToken] = useState(null);

    const onToken = (token) => {
        setStripeToken(token);
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:5000/api/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 2000,
                    }
                );
                console.log(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken])

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <StripeCheckout 
                name="Quantum Store"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQfzbtfv6ADRy6X9oy40fePXpdlyzH4tyQfQ&usqp=CAU"
                billingAddress
                shippingAddress
                description ="Your total is $40"
                amount={2000}
                token={onToken}
                stripeKey={KEY}
            >
                <button
                    style={{
                        border: "none",
                        width: 120,
                        borderRadius: 5,
                        padding: "20px",
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    Pay Now
                </button>
            </StripeCheckout>
        </div>
    );
}
