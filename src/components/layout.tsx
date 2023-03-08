import React from "react";
import NavBar from "./navBar";
import Footer from "./footer";

function Layout({ children }: any) {
    return (
        <div>
            <NavBar />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
