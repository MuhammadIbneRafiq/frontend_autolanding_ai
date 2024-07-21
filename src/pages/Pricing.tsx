import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Pricing = () => {
    useEffect(() => {
        const fetchCheckoutUrl = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.post(
                    `https://backend-autolanding-ai.vercel.app/stripe`,
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
            }
        };

        fetchCheckoutUrl();
    }, []);

    return (
        <div>Redirecting to payment...</div>
    );
};

export default Pricing;