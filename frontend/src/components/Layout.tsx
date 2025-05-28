import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({children}: LayoutProps){
    const {user, isLoading} = useAuth();

    if(isLoading){
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to="/login"/>
    }

    return(
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-10 md:p-8 ml-0 md:ml-64 transition-all duration-300">
                {children}
            </main>
        </div>
    )
}