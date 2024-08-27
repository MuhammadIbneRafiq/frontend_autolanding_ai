import { supabase } from "@/hooks/supaBase";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import React from "react";

const formSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password cannot be longer than 20 characters"),
});

interface ThirdPartyInterface {
    googleMessage: string;
}

export const ThirdPartyAuth: React.FC<ThirdPartyInterface> = ({ googleMessage }) => {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function googleAuth() {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: 'https://www.autolanding.ai/chatHome', 
                    // redirectTo: "https://www.autolanding.ai/auth/callback",
                }
            });
            if (error) {
                throw error;
            }
        } catch (error: any) {
            form.setError("root", {
                message: error.response.data.error,
            });
            toast({
                title: "Error",
                description: "An error occurred. Please try again.",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="mx-auto rounded-full" onClick={() => googleAuth()}>
            {/* Passing googleMessage to the child component */}
            <GoogleSignInButton googleMessage={googleMessage} />
        </div>
    );
};

export default ThirdPartyAuth;
