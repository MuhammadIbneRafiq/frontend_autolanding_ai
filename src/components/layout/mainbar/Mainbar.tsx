import { SendHorizontal } from "lucide-react";

export interface MainbarProps {
  children: React.ReactNode;
}

const Mainbar: React.FC<MainbarProps> = ({ children }) => {
  return (
    <div className="border" style={{ height: "calc(100vh - 75px)" }}>
      <div className="p-4 h-full">
        <div className="flex justify-center flex-col h-full">
          <div className="h-full w-full flex justify-center flex-col items-center">
            {children}
          </div>
          <div className="px-4">
            <form>
              <div className="flex items-center gap-2 w-full ">
                <input
                  type="text"
                  placeholder="Sign up to start finding freelancers or clients"
                  className="border text-sm text-black dark:text-white w-full p-2 rounded-md focus:outline-none placeholder:text-black placeholder:font-semibold placeholder:text-sm dark:bg-primaryDark placeholder:dark:text-white"
                />
                <button
                  type="submit"
                  className="p-1.5 border  px-3 rounded-md bg-gray-100 dark:bg-primaryDark"
                >
                  <SendHorizontal className="text-gray-500 " />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainbar;
