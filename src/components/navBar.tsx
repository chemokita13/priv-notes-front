import React, { useState } from "react";
import Link from "next/link";

function NavBar() {
    const [clickedUser, setClickedUser] = useState<Boolean>(false); // When the user clicks on the user button, the state changes to true and the user menu is displayed

    return (
        <nav>
            <ul className="flex cursor-pointer md:flex-row md:gap-40 md:justify-around">
                <Link href={"/"}>
                    <li>Home</li>
                </Link>
                <li onClick={() => setClickedUser(!clickedUser)}>
                    Users
                    {clickedUser && (
                        <ul>
                            <Link href={"/users/login"}>
                                <li>Log in</li>
                            </Link>
                            <Link href={"/users/new"}>
                                <li>Create user</li>
                            </Link>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
