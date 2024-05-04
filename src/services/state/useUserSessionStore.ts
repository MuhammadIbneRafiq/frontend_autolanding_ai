import { UserData } from "@/types/UserData";
import { create } from "zustand";

type UserSessionStore = {
    user: UserData | undefined;
    setUser: (user: UserData | undefined) => void;
};

export const useUserSessionStore = create<UserSessionStore>((set) => ({
    user: undefined,
    setUser: (user) => set({ user }),
}));

export default useUserSessionStore;
