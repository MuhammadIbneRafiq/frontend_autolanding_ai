import ChatInterface from "@/components/ChatInterface";
import useUserStore from "@/services/state/useUserSessionStore";
import { useEffect, useState } from "react";
import RolePage from "./RolePage";

export default function HomePage() {
  const role = useUserStore((state) => state.role);
  const [openRole, setOpenRole] = useState(true);
  const setRole = useUserStore((state) => state.setRole);
  const handleValueChange = (name: string) => {
    setOpenRole(false);
    setRole(name);
  };
  useEffect(() => {
    if (role == "seller" || role == "buyer") {
      setOpenRole(false);
    }
  }, [role]);
  return (
    <div className="h-screen pt-24">
      {/* {openRole && <RolePage openRoleChange={handleValueChange}/>} */}
      <ChatInterface />
    </div>
  );
}
