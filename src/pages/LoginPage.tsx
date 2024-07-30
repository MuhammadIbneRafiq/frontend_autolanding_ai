import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Icons } from "@/components/ui/icons";
// import { Auth } from '@supabase/auth-ui-react';
// import { SocialLayout, ThemeSupa, ViewType } from '@supabase/auth-ui-shared'

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { createClient } from "@supabase/supabase-js";
// import { Theme } from "react-toastify";
// import { ThemeProvider } from "@/services/providers/ThemeProvider";

// const SUPABASE_KEY= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ra2RsYmRuZmF5bGFrZmJ5Y3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MjIzNTIsImV4cCI6MjAyOTA5ODM1Mn0.Zf4DnOscUxz5LxbulHsMMmtyXT7Eoapg50WVgAW_Nig'
// const SUPABASE_URL= 'https://okkdlbdnfaylakfbycta.supabase.co'

// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(8, "Password are at least 8 characters")
    .max(20, "Password are not longer than 20 characters"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://backend-autolanding-ai.vercel.app/auth/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);

      navigate("/chatHome");
    } catch (error: any) {
      form.setError("root", {
        message: error.response.data.error,
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
    <div className="w-full h-full flex justify-center items-center">
      <div className="grid grid-cols-2 w-full max-w-7xl h-full">
        <div className="flex flex-col justify-center items-center bg-dark-blue-100 p-8">
          <Carousel autoPlay infiniteLoop showThumbs={false} className="w-full">
            <div>
              <img src="https://pbs.twimg.com/media/EAC2iswX4AUZXav.jpg" alt="Slide 1" />
            </div>
            <div>
              <img src="https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1707927008/catalog/1486193250725023744/lji9hy0cptoe849n5xdl.webp" alt="Slide 2" />
            </div>
            <div>
              <img src="https://images.ctfassets.net/m9n8o4ceoyuw/7L9z8LIlai8hBJrl1xWhX/9d740ec59d0712021ec1bd397b5a868a/Discord_-_Server.jpg" alt="Slide 3" />
            </div>
          </Carousel>
          <Button className="mt-4" onClick={() => window.location.href='https://discord.gg/xeX2Zhut82'}
          >Join the Discord</Button>
          <h1 className="mt-4 text-center text-white font-bold"> Join 100s of agencies/communities and exchange client on referral</h1>
        </div>
        <div className="flex justify-center items-center">
          <Card className="h-fit max-w-[400px] w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa
                }}
                providers={["google"]}
              /> */}
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
                              <Input placeholder="johndoe@gmail.com" {...field} />
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
                    {form.formState.errors.root && (
                      <FormMessage>
                        {form.formState.errors.root.message}
                      </FormMessage>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <Loader className="animate-spin" /> : "Login"}
                    </Button>
                  </div>
                </form>
              </Form> 
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
