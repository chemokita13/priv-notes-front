import React from "react";
import NavBar from "./navBar";
import Footer from "./footer";

function Layout({ children }: any) {
    return (
        <div className="w-screen h-screen overflow-x-hidden">
            <NavBar />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
