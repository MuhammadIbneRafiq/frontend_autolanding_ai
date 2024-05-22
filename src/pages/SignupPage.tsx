const SignupPage = () => {
  return (
    <div className="max-w-md mx-auto border mt-20">
      <div className="p-4">
        <h2 className="text-black dark:text-white">Create an account</h2>
        <p className="text-black dark:text-white">
          Enter your email below to create your account
        </p>
        <div>
          <form>
            <label className="text-black dark:text-white">
              Email:
              <input type="email" name="email" className="border" />
            </label>
            <label className="text-black dark:text-white">
              Password:
              <input type="password" name="email" className="border" />
            </label>
            <input type="submit" value="Create account" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
