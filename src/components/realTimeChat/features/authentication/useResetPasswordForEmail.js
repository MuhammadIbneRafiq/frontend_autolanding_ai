import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "../userProfile/apiUserAccount";
import toast from "react-hot-toast";

export const REDIRECT_URL_LOCAL = "http://localhost:3000";
export const REDIRECT_URL_PRODUCTION = "https://convayto.vercel.app";

export const getRedirectUrl = () => {
  return import.meta.env.MODE === "production"
    ? REDIRECT_URL_PRODUCTION
    : REDIRECT_URL_LOCAL;
};

function useResetPasswordForEmail() {
  const {
    mutate: queryResetPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ email, redirectTo }) =>
      sendPasswordResetEmail({ email, redirectTo }),
    onMutate: () => {
      toast.loading("Sending email...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Email sent. Please check your inbox.");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  // This is just for developement purpose. We need to dynamically itentify the environment wheather it is production or local so that we don't need to change the link manually every time
  const triggerResetPassword = (email) => {
    const redirectTo = `${getRedirectUrl()}/new-password`;

    queryResetPassword({ email, redirectTo });
  };

  return {
    resetPassword: triggerResetPassword,
    isPending,
    isSuccess,
    isError,
    error,
  };
}

export default useResetPasswordForEmail;
