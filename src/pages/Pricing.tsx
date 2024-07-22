import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Pricing = () => {
    const [isLoading, setIsLoading] = useState(true);

    const fetchCheckoutUrl = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `https://backend-autolanding-ai.vercel.app/stripe`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Response:", response);
            window.location.href = response.data.checkoutUrl;
        } catch (error) {
            toast.error('There was an error. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });    
            console.error("Error creating Stripe checkout session:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCheckoutUrl();
    }, []);

    if (isLoading) {
        return <div>Redirecting to payment...</div>;
    }

    return (
        <button onClick={fetchCheckoutUrl}>Retry Payment</button>
    );
};

export default Pricing;