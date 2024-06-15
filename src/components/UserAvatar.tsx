import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import { User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import useUserStore from "@/services/state/useUserSessionStore";

export default function UserAvatar() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const setUser = useUserStore((state) => state.setUser);
    const user = useUserStore((state) => state.user);

    async function logout() {
        try {
            await axios.post(
                "http://localhost:3000/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            );
            localStorage.clear();
            setUser(undefined);
            navigate("/login");
        } catch (error) {
            console.error("Failed to logout:", error);
            toast({
                title: "Failed to logout",
                description:
                    "Something went wrong while logging out. Please try again.",
                variant: "destructive",
            });
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    <User className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
