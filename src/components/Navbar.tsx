import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ui/ModeToggle";
import { NamedLogoWithLink } from "./Logo";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/hooks/useAuth";
import '../index.css';

export default function Navbar() {
    const { isAuthenticated } = useAuth();

    return (
        <header className="sticky z-50 border-b top-0 flex h-16 items-center gap-4 bg-background px-4 md:px-6">
            <ToastContainer />
            <nav className="hidden flex-col gap-6 text-lg font-medium w-full md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <NamedLogoWithLink />
                <div className="flex ml-auto gap-4 items-center">
                    <Link
                        to="/pricing"
                        className="text-black bg-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:bg-gray-200 active:bg-gray-300 shadow-lg"
                    >
                        Pricing
                    </Link>
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
                        <div className="flex gap-4 flex-col">
                            <Link
                                to="/pricing"
                                className="text-black bg-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:bg-gray-200 active:bg-gray-300 shadow-lg"
                            >
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
