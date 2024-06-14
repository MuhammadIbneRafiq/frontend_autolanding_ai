const Pricing = () => {
    return (
        <div className="min-h-screen bg-background text-white flex items-center justify-center">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center mb-8">Pricing Plans</h1>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    <div className="bg-card rounded-lg shadow-lg p-6 text-center w-full max-w-sm">
                        <h2 className="text-2xl font-bold mb-4">Basic Plan</h2>
                        <p className="text-xl mb-4">$10 / month</p>
                        <ul className="text-left mb-6">
                            <li className="mb-2">Feature 1</li>
                            <li className="mb-2">Feature 2</li>
                            <li className="mb-2">Feature 3</li>
                        </ul>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark">
                            Choose Plan
                        </button>
                    </div>
                    <div className="bg-card rounded-lg shadow-lg p-6 text-center w-full max-w-sm">
                        <h2 className="text-2xl font-bold mb-4">Pro Plan</h2>
                        <p className="text-xl mb-4">$30 / month</p>
                        <ul className="text-left mb-6">
                            <li className="mb-2">Feature 1</li>
                            <li className="mb-2">Feature 2</li>
                            <li className="mb-2">Feature 3</li>
                        </ul>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark">
                            Choose Plan
                        </button>
                    </div>
                    <div className="bg-card rounded-lg shadow-lg p-6 text-center w-full max-w-sm">
                        <h2 className="text-2xl font-bold mb-4">Enterprise Plan</h2>
                        <p className="text-xl mb-4">$100 / month</p>
                        <ul className="text-left mb-6">
                            <li className="mb-2">Feature 1</li>
                            <li className="mb-2">Feature 2</li>
                            <li className="mb-2">Feature 3</li>
                        </ul>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark">
                            Choose Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
