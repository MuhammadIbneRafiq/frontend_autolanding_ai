import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ui/ModeToggle";
import { NamedLogoWithLink } from "./Logo";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/hooks/useAuth";
import '../index.css';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const { isAuthenticated } = useAuth();
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isSticky, setIsSticky] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > lastScrollY && window.scrollY > 60) {
            setIsSticky(false);
        } else {
            setIsSticky(true);
        }
        setLastScrollY(window.scrollY);
    };
    useEffect(() => {
        const handleOutsideClick = (e) => {
          if (isPopupOpen && !e.target.closest(".sheet") && !e.target.closest(".three-dot")) {
            setIsPopupOpen(false);
          }
        };
    
        document.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.removeEventListener("click", handleOutsideClick);
        };
      }, [isPopupOpen]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[102] w-full text-nav-label bg-base/80 backdrop-blur-sm transition-transform ease-curve-d duration-600 ${
                isSticky ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <ToastContainer />
            <nav aria-label="Main navigation" className="h-full max-w-[2000px] mx-auto flex items-center justify-between px-4 md:px-6">
                <div className="flex items-center">
                    <NamedLogoWithLink />
                </div>
                <div className="flex items-center justify-center gap-4 md:gap-6">
                    <Link to="/pricing" className="hidden md:block text-small transition-colors duration-fast hover:text-nav-label dark:text-white text-black">
                        Pricing
                    </Link>
                    <ModeToggle />
                    {!isAuthenticated && (
                        <>
                            <Link to="/register" className="hidden md:block text-small transition-colors duration-fast hover:text-nav-label dark:text-white text-black">
                                Sign up
                            </Link>
                            <Link to="/login" className="hidden md:block text-small transition-colors duration-fast hover:text-nav-label dark:text-white text-black">
                                Log in
                            </Link>
                        </>
                    )}
                    {isAuthenticated && <UserAvatar />}
                    <div className="relative md:hidden">
                        {!isAuthenticated && 
                        <Button variant="ghost" size="icon" className="md:hidden three-dot dark:text-white text-black" onClick={togglePopup}>
                            <Menu className="w-6 h-6" />
                        </Button>
                        }
                        {isPopupOpen && (
                            <div className="absolute border-solid border-2 border-black-200 right-0 top-10 bg-transperant text-gray-400 shadow-lg rounded-lg w-40">
                                <nav className="grid gap-2 p-4 text-sm font-medium">
                                    <Link to="/pricing" className="text-gray-400 transition-colors duration-fast hover:text-black hover:dark:text-white">
                                        Pricing
                                    </Link>
                                    {!isAuthenticated && (
                                        <>
                                            <Link to="/register" className="text-gray-400 transition-colors duration-fast hover:text-black hover:dark:text-white">
                                                Sign up
                                            </Link>
                                            <Link to="/login" className="text-gray-400 transition-colors duration-fast hover:text-black hover:dark:text-white">
                                                Log in
                                            </Link>
                                        </>
                                    )}
                                    {isAuthenticated && <UserAvatar />}
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );    
}
