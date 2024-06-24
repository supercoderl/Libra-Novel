"use client"

import Footer from "./footer";
import HomeHeader from "./home-header";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="bg-background-custom w-full h-screen px-4 md:px-10 overflow-auto">
            <HomeHeader />
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout;