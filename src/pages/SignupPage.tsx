import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot be longer than 20 characters"),
  role: z.enum(["buyer", "seller"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
});

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: 'buyer', // Initialize as buyer
    },
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      console.log(values);
      await axios.post(
        "https://backend-autolanding-ai.vercel.app/auth/signup",
        // "http://localhost:3000/auth/signup",
        {
          email: values.email,
          password: values.password,
          role: values.role,
        }
      );
      // localStorage.setItem('userRole', response.data.role);

      navigate("/chatHome");
      toast({
        title: "Thank you for signing up!",
        description:
          "You've successfully created an account. Now start a chat with our agent and describe your project.",
        variant: "success",
      });
    } catch (error: any) {
      form.setError("root", {
        type: "manual",
        message: error.message,
      });
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-fit flex justify-center items-center space-x-24">
      <Card className="h-full max-w-[400px] w-full">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="muhammadrafiq@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <div className="flex space-x-4">
                            <Button
                              type="button"
                              variant={field.value === "buyer" ? "default" : "outline"}
                              onClick={() => field.onChange("buyer")}
                              className={field.value === "buyer" ? "bg-blue-500 text-white" : ""}
                            >
                              Buyer
                            </Button>
                            <Button
                              type="button"
                              variant={field.value === "seller" ? "default" : "outline"}
                              onClick={() => field.onChange("seller")}
                              className={field.value === "seller" ? "bg-blue-500 text-white " : ""}
                            >
                              Seller
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {form.formState.errors.root && (
                  <FormMessage>
                    {form.formState.errors.root.message}
                  </FormMessage>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Create account"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="h-fit max-w-[400px] w-full">
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/muhammadibnerafiq/30min"
          style={{ minWidth: "620px", height: "600px" }}
        ></div>
      </div>
    </div>
  );
}
