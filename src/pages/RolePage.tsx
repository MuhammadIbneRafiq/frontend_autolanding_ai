import axios from "axios";
import React from "react";

// Define the props type with TypeScript
interface RolePageProps {
  openRoleChange: (isOpen: string) => void;
}

const RolePage: React.FC<RolePageProps> = ({ openRoleChange }) => {
  const handleButtonClick = async (name: string) => {
    try {
      await axios.post(
        `https://backend-autolanding-ai.vercel.app/user/setRole/${name}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      openRoleChange(name); // Call the prop function after successful API call
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-[100] bg-opacity-80">
      <div className="dark:bg-black bg-white p-8 rounded-md shadow-md flex flex-col items-center border-gray border-2">
        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Select Role</h2>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-32"
            value="buyer"
            onClick={() => handleButtonClick('buyer')}
          >
            Buyer
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md w-32"
            value="seller"
            onClick={() => handleButtonClick('seller')}
          >
            Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolePage;
