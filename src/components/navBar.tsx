import React, { useState } from "react";
import Link from "next/link";

function NavBar() {
    const [clickedUser, setClickedUser] = useState<Boolean>(false); // When the user clicks on the user button, the state changes to true and the user menu is displayed

    return (
        <nav className="sticky top-0 shadow-lg">
            <ul className="flex p-2 cursor-pointer bg-cyan-700 md:flex-row md:gap-40 md:justify-around">
                <li className="w-1/4 text-lg font-medium text-center transition-all duration-200 border rounded-lg md:w-auto hover:scale-110 hover:drop-shadow-lg md:drop-shadow-md border-cyan-600 md:py-2 md:px-5 bg-emerald-500 hover:underline">
                    <Link href={"/"}>Home</Link>
                </li>
                <li
                    className="w-3/4 font-medium text-center transition-all duration-200 border rounded-lg md:w-auto hover:scale-110 hover:drop-shadow-lg md:drop-shadow-md border-cyan-600 md:py-2 md:px-5 bg-emerald-500"
                    onClick={() => setClickedUser(!clickedUser)}
                >
                    <div
                        className={`${
                            clickedUser && "underline"
                        } hover:underline`}
                    >
                        Users
                    </div>
                    <ul className={`${!clickedUser && "hidden"} text-left`}>
                        <li className="text-white hover:underline">
                            <Link href={"/users/login"}>Log in</Link>
                        </li>
                        <li className="text-white hover:underline">
                            <Link href={"/users/new"}>Create user</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
