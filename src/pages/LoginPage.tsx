import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ThirdPartyAuth from "@/hooks/ThirdPartyAuth";

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
  const googleMessage: string = "Login";

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
    <div className="w-full h-screen pt-24 flex justify-center items-center">
      <div className="flex w-full max-w-7xl h-full justify-center">
        <div className="flex flex-col justify-center items-center bg-dark-blue-100 p-8 max-w-[50%]">
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
          <Button className="mt-4 bg-green-500"><a href="https://discord.gg/xeX2Zhut82" target="_blank">
          Join the Discord</a></Button>
          <h1 className="mt-4 text-center text-black dark:text-white font-bold"> Join 100s of agencies/communities and exchange client on referral</h1>
        </div>
        <div className="flex w-[50%] px-4 h-full justify-center items-center">
          <Card className="h-fit max-w-[700px] w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl text-center">Login</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex justify-center">
              </div>
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
                    <ThirdPartyAuth googleMessage={googleMessage}/>
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