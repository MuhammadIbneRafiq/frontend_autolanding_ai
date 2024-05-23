import { simpleAlert } from "../../utils/alert/sweetAlert";

const CreateProfile = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const oka = await simpleAlert(
      "Come back in 24 hours to get your personal AI freelancing agent dedicated to find you clients."
    );
    console.log(oka, "alert");
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
          Chat with your files using Supabase and Next.js
        </h1>
      </div>
      <div className="border p-4 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2">
            <label className="text-sm font-semibold pb-1 dark:text-white text-black">
              Linkedin URL
            </label>
            <input
              type="text"
              className="border h-10 rounded-lg px-2 text-sm placeholder:text-gray-500"
              placeholder="Linkedin URL"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="text-sm font-semibold pb-1 dark:text-white text-black">
              {" "}
              Upwork URL
            </label>
            <input
              type="text"
              className="border h-10 rounded-lg px-2 text-sm placeholder:text-gray-500"
              placeholder="Upwork URL"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="text-sm font-semibold pb-1 dark:text-white text-black">
              Fiverr URL
            </label>
            <input
              type="text"
              className="border h-10 rounded-lg px-2 text-sm placeholder:text-gray-500"
              placeholder="Fiverr URL"
            />
          </div>
          <div className="flex flex-col mt-3">
            <input
              type="submit"
              className="bg-primaryDark cursor-pointer text-white h-10 mt-2 w-full font-semibold text-sm rounded-lg dark:text-black dark:bg-white"
              value={"Submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
