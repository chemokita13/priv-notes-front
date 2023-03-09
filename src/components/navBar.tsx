import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function NavBar() {
    const cookie = new Cookies(); // cookie object to access cookies
    const [Token, setToken] = useState(false);

    useEffect(() => {
        const token = cookie.get("access_token"); // get the token cookie
        console.log(token);
        if (token) {
            setToken(true);
        } else {
            setToken(false);
        }
    }, []);

    return (
        <nav>
            <ul>
                <li>Home</li>

                {Token ? (
                    <ul>
                        <li>Login</li>
                        <li>Register</li>
                    </ul>
                ) : (
                    <ul>
                        <li>Logout</li>
                        <li> Notes</li>
                    </ul>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
