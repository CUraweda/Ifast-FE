import { ReactNode, useState } from "react";
// import CenterLayout from "./center.layout";
// import useAuthStore from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

function ProtectedLayout({ children }: { children: ReactNode }) {
//   const { isAuthenticated } = useAuthStore();
const [isAuthenticated, setAuth] = useState(true)
  const navigate = useNavigate();

  if(!isAuthenticated){
    navigate('/')
    return
  }
  
  return isAuthenticated ? (
    children
  ) : (
    <div className="flex flex-col">
      <p>Anda tidak memiliki akses ke halaman ini</p>
      <button className="btn btn-ghost bg-emeraldGreen text-white" onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

export default ProtectedLayout;