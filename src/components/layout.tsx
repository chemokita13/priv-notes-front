import React from "react";
import NavBar from "./navBar";
import Footer from "./footer";

function Layout({ children }: any) {
    return (
        <div className="flex flex-col w-screen h-screen overflow-x-hidden bg-black">
            <NavBar />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
