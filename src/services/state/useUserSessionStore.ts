import { UserData } from "@/types/UserData";
import { create } from "zustand";

type UserSessionStore = {
    user: UserData | undefined;
    role: string | undefined;
    setRole: (role: string | undefined)=>void;
    setUser: (user: UserData | undefined) => void;
};

export const useUserSessionStore = create<UserSessionStore>((set) => ({
    user: undefined,
    role:undefined,
    setRole: (role) => set({ role }),
    setUser: (user) => set({ user }),
}));

export default useUserSessionStore;
