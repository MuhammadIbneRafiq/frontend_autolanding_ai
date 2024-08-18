import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import SignupPage from "./pages/SignupPage";
import { ThemeProvider } from "./services/providers/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import Pricing from "./pages/Pricing";
// import ChatInterface from "./components/ChatInterface";
import LandingPage from "./pages/LandingPage";
import AuthCallback from "./hooks/AuthCallback";
import { RealTimeChatPage } from "./components/RealTimeChatPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Navbar />
          <main
            className="h-max flex justify-center
                    dark:bg-black bg-white"
          >
            <div className="max-w-[2000px] w-screen">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/chatHome" element={<HomePage />} />
                <Route
                  path="/chat/:id"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/realtime-chat/:id"
                  element={
                    <ProtectedRoute>
                      <RealTimeChatPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/project/:id"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <SignupPage />
                    </PublicRoute>
                  }
                />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
              </Routes>
              <Toaster />
            </div>
          </main>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
