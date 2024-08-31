import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Pricing = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [billingCycle, setBillingCycle] = useState('annually'); // 'annually' or 'monthly'

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

    const toggleBillingCycle = () => {
        setBillingCycle(prevCycle => (prevCycle === 'annually' ? 'monthly' : 'annually'));
    };

    if (isLoading) {
        return <div>Redirecting to payment...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-12 text-black dark:text-white">
            {/* <h1 className="text-4xl font-bold text-center">Great news,</h1>
            <h1 className="text-4xl font-bold text-center mb-10">You can start hiring for free!</h1>
            <p className="font-bold text-center mb-6">We only charge for our freelancing service. To get started, sing up and start chatting with our agent.</p> */}
            <div className="flex justify-center mb-8">
                <div className="flex items-center bg-gray-800 rounded-full p-1">
                    <button 
                        onClick={toggleBillingCycle}
                        className={`px-4 py-2 rounded-full transition-all ${billingCycle === 'annually' ? 'bg-blue-500 text-white' : 'text-gray-300'}`}
                    >
                        Annually -40%
                    </button>
                    <button 
                        onClick={toggleBillingCycle}
                        className={`px-4 py-2 rounded-full transition-all ${billingCycle === 'monthly' ? 'bg-blue-500 text-white' : 'text-gray-300'}`}
                    >
                        Monthly
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-xs">
                    <h2 className="text-2xl font-bold mb-2">FREE</h2>
                    <p className="text-3xl font-bold mb-1">$0</p>
                    <p className="text-sm mb-4">for first 14 days, then billed {billingCycle}</p>
                    <button 
                        onClick={fetchCheckoutUrl} 
                        className="w-full py-2 mb-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
                    >
                        Start trial
                    </button>
                    <ul className="text-left text-sm">
                        <li className="mb-2">✔ Unlimited 0 commission free for orders below $500</li>
                        <li className="mb-2">✔ only 10% commission for orders above $500</li>
                        <li className="mb-2">✔ Limited to 5 collaborators</li>
                    </ul>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-xs border-2 border-blue-500">
                    <div className="mb-2">
                        <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">Recommended</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Pro</h2>
                    <p className="text-3xl font-bold mb-1">$87</p>
                    <p className="text-sm mb-4">for first 14 days, then annually</p>
                    <button 
                        onClick={fetchCheckoutUrl} 
                        className="w-full py-2 mb-4 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all"
                    >
                        Start trial
                    </button>
                    <ul className="text-left text-sm">
                        <li className="mb-2">✔ DIRECT ACCESS TO CLIENTS IN OUR DATABASE MATCHING YOUR REQ</li>
                        <li className="mb-2">✔ Everything in Plus</li>
                        <li className="mb-2">✔ only 5% commission for orders above $400</li>
                    </ul>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-xs">
                    <h2 className="text-2xl font-bold mb-2">Team Pro</h2>
                    <p className="text-3xl font-bold mb-1">$387</p>
                    <p className="text-sm mb-4">for first 14 days, then billed annually</p>
                    <button 
                        onClick={fetchCheckoutUrl} 
                        className="w-full py-2 mb-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
                    >
                        Start trial
                    </button>
                    <ul className="text-left text-sm">
                        <li className="mb-2">✔ Everything in Pro</li>
                        <li className="mb-2">✔ Unlimited collaborators</li>
                        <li className="mb-2">✔ 0% discount taken</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
