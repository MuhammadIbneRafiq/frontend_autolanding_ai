import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ui/ModeToggle";
import { NamedLogoWithLink } from "./Logo";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
    const { isAuthenticated } = useAuth();

    const handleCreateProfileClick = () => {
        toast.info('Come back in 24 hr to have your AI profile created');
    };

    return (
        <header className="sticky border-b top-0 flex h-16 items-center gap-4 bg-background px-4 md:px-6">
            <ToastContainer />
            <nav className="hidden flex-col gap-6 text-lg font-medium w-full md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <NamedLogoWithLink />
                <div className="flex ml-auto gap-4 items-center">
                    {isAuthenticated && (
                        <Link to="/pricing" className="text-primary">
                            Pay Us
                        </Link>
                    )}
                    <ModeToggle />
                    {!isAuthenticated && (
                        <>
                            <Link to="/register" className="text-primary">
                                Sign up
                            </Link>
                            <Link to="/login" className="text-primary">
                                Log in
                            </Link>
                        </>
                    )}
                    {isAuthenticated && <UserAvatar />}
                </div>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        {isAuthenticated && (
                            <div className="flex gap-4 flex-col">
                                <Button 
                                    onClick={handleCreateProfileClick}
                                    variant="outline"
                                    className="rounded-full"
                                >
                                    Create AI Profile
                                </Button>
                            </div>
                        )}
                        <div className="flex gap-4 flex-col">
                            <Link to="/pricing" className="text-primary">
                                Pricing
                            </Link>
                            {!isAuthenticated && (
                                <>
                                    <Link
                                        to="/register"
                                        className="text-primary"
                                    >
                                        Sign up
                                    </Link>
                                    <Link to="/login" className="text-primary">
                                        Log in
                                    </Link>
                                </>
                            )}
                            <ModeToggle />
                            {isAuthenticated && <UserAvatar />}
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    );
}
