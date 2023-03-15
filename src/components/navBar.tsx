import React, { useState } from "react";
import Link from "next/link";

function NavBar() {
    const [clickedUser, setClickedUser] = useState<Boolean>(false); // When the user clicks on the user button, the state changes to true and the user menu is displayed

    return (
        <nav>
            <ul className="flex cursor-pointer bg-cyan-700 md:flex-row md:gap-40 md:justify-around md:p-2">
                <Link href={"/"}>
                    <li className="font-medium border rounded-lg border-cyan-600 md:py-2 md:px-5 bg-emerald-500">
                        Home
                    </li>
                </Link>
                <li
                    className="font-medium border rounded-lg border-cyan-600 md:py-2 md:px-5 bg-emerald-500 "
                    onClick={() => setClickedUser(!clickedUser)}
                >
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
