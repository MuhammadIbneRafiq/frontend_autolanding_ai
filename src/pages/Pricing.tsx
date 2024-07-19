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
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center py-12">
            <h1 className="text-4xl font-bold text-center mb-6">Start 30 trial no credit card</h1>
            <div className="flex justify-center mb-8">
                <div className="flex items-center bg-gray-800 rounded-full p-1">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-full transition-all">Annually -40%</button>
                    <button className="px-4 py-2 text-gray-300 rounded-full transition-all">Monthly</button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-xs">
                    <h2 className="text-2xl font-bold mb-2">Plus</h2>
                    <p className="text-3xl font-bold mb-1">$1</p>
                    <p className="text-sm mb-4">for first 14 days, then billed annually</p>
                    <button className="w-full py-2 mb-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all">Start trial</button>
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
                    <p className="text-3xl font-bold mb-1">$187</p>
                    <p className="text-sm mb-4">for first 14 days, then annually</p>
                    <button className="w-full py-2 mb-4 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all">Start trial</button>
                    <ul className="text-left text-sm">
                        <li className="mb-2">✔ Everything in Plus</li>
                        <li className="mb-2">✔ only 5% commission for orders above $400</li>
                    </ul>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-xs">
                    <h2 className="text-2xl font-bold mb-2">Team Pro</h2>
                    <p className="text-3xl font-bold mb-1">$387</p>
                    <p className="text-sm mb-4">for first 14 days, then billed annually</p>
                    <button className="w-full py-2 mb-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all">Start trial</button>
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
