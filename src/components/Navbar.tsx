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
        <header className="fixed w-full z-50 border-b top-0 flex h-16 items-center gap-4 bg-background px-4 md:px-6">
            <ToastContainer />
            <nav className="flex-col gap-6 text-lg font-medium w-full md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <NamedLogoWithLink />
                <div className="hidden md:flex ml-auto gap-4 items-center">
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
            <div className="flex items-center ml-auto gap-4 md:hidden">
                {/* Separate ModeToggle button */}
                <ModeToggle />

                {/* SheetTrigger button for mobile menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="link"
                            size="icon"
                            className="shrink-0 w-10 h-10 border rounded-md p-2"
                        >
                            <Menu className="h-full w-full" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <nav className="grid gap-6 text-lg font-medium">
                            <div className="relative top-10 flex gap-4 flex-col">
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
                                            className="text-primary border-b-2 py-4"
                                        >
                                            Sign up
                                        </Link>
                                        <Link to="/login" className="text-primary border-b-2 py-4">
                                            Log in
                                        </Link>
                                    </>
                                )}

                                {isAuthenticated && <UserAvatar />}
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
