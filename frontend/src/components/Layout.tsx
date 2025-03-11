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
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    )
}