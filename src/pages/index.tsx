import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-blue-500">
            <h1 className="font-extrabold text-white md:text-8xl md:p-5">
                A private notes page.
            </h1>
            <h2 className="font-bold text-blue-50 md:p-5 md:text-4xl">
                Using nextjs with typescript,
            </h2>
            <h3 className="font-bold text-blue-100 md:p-5 md:text-3xl md:ml-5">
                and axios, cookies, bearer auth...
            </h3>
            <h4 className="font-semibold text-white underline transition-all md:p-5 md:text-xl md:m-5 hover:scale-110">
                <Link href={"/users/new"}>
                    Create a new user and try the page!
                </Link>
            </h4>
        </div>
    );
}
