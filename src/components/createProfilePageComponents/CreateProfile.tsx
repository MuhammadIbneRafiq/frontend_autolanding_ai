const CreateProfile = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
          Chat with your files using Supabase and Next.js
        </h1>
      </div>
      <div className="border p-4 rounded-lg">
        <form>
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
              className="bg-primaryDark text-white h-10 mt-2 w-full font-semibold text-sm rounded-lg dark:text-black dark:bg-white"
              value={"Submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
