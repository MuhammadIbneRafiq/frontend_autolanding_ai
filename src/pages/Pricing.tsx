import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const Pricing = ( ) => {
    const StripePlans = {
        BASIC: "basic",
        PRO: "pro",
        ENTERPRISE: "enterprise",
    }

    const handleButtonClick = async (plan: string) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `https://backend-autolanding-ai.vercel.app/stripe`,
                {
                    plan: plan
                },
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

    return (
        <div className="min-h-screen bg-background text-white flex items-center justify-center">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center mb-8">Pricing Plans</h1>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    <div className="bg-card rounded-lg shadow-lg p-6 text-center w-full max-w-sm">
                        <h2 className="text-2xl font-bold mb-4">Pro</h2>
                        <p className="text-xl mb-4">€10/month</p>
                        <ul className="text-left mb-6">
                            <li className="mb-2">Feature 1</li>
                            <li className="mb-2">Feature 2</li>
                            <li className="mb-2">Feature 3</li>
                        </ul>
                </div>
                    <div className="bg-card rounded-lg shadow-lg p-6 text-center w-full max-w-sm">
                        <h2 className="text-2xl font-bold mb-4">Enterprise</h2>
                        <p className="text-xl mb-4">Custom</p>
                        <ul className="text-left mb-6">
                            <li className="mb-2">Feature 1</li>
                            <li className="mb-2">Feature 2</li>
                            <li className="mb-2">Feature 3</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
