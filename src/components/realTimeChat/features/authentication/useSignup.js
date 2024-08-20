import { useMutation } from "@tanstack/react-query";
import { signup as apiSignup } from "./apiAuth";
import toast from "react-hot-toast";
import { supabase } from "@/hooks/supaBase";
import { useEffect, useState } from "react";

export const REDIRECT_URL_LOCAL = "http://localhost:3000";
export const REDIRECT_URL_PRODUCTION = "https://convayto.vercel.app";

export const getRedirectUrl = () => {
  return import.meta.env.MODE === "production"
    ? REDIRECT_URL_PRODUCTION
    : REDIRECT_URL_LOCAL;
};

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("SUPABASE.....", user);

      setUser(user);
    };

    getUser();
  }, []);

  return user;
};

export function useSignup() {
  const {
    mutate: querySignup,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ email, password, fullname, username, redirectTo }) =>
      apiSignup({ email, password, fullname, username, redirectTo }),
    onMutate: () => {
      toast.loading("Signing up...");
    },
    onSuccess: () => {
      toast.dismiss();
    },

    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  // This is just for developement purpose. We need to dynamically itentify the environment wheather it is production or local so that we don't need to change the link manually every time
  const triggerResetPassword = ({ email, password, fullname, username }) => {
    const redirectTo = `${getRedirectUrl()}/account-confirmation`;

    querySignup({ email, password, fullname, username, redirectTo });
  };

  return { signup: triggerResetPassword, isPending, error, isSuccess };
}
