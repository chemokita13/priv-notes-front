import React from "react";

function Footer() {
    return (
        <footer className="sticky bottom-0 flex flex-col w-full p-3 text-center shadow-lg md:p-5 md:justify-between md:flex-row bg-cyan-700 ">
            <button className="p-0 m-1 font-medium transition-all duration-200 border rounded-lg border-cyan-600 md:p-5 bg-emerald-500 hover:scale-110 hover:drop-shadow-lg md:drop-shadow-md hover:border-cyan-400">
                <a href="https://github.com/chemokita13/priv-notes-front">
                    View source code on github
                </a>
            </button>
            <button className="p-0 m-1 font-medium transition-all duration-200 border rounded-lg border-cyan-600 md:p-5 bg-emerald-500 hover:scale-110 hover:drop-shadow-lg md:drop-shadow-md hover:border-cyan-400">
                <a href="https://www.josemariapahino.me">
                    View author&apos;s portfolio
                </a>
            </button>
            <button className="p-0 m-1 font-medium transition-all duration-200 border rounded-lg border-cyan-600 md:p-5 bg-emerald-500 hover:scale-110 hover:drop-shadow-lg md:drop-shadow-md hover:border-cyan-400">
                <a href="https://github.com/chemokita13">
                    View author&apos;s profile on github
                </a>
            </button>
        </footer>
    );
}

export default Footer;
