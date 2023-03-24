import { API } from "@/constants/constant";
import { User } from "@/dataTypes/user";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function NewUser() {
    const router = useRouter(); // This is the hook to use next router

    // User state to create and send to server
    const [NewUser, setNewUser] = useState<User>({
        username: "",
        password: "",
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = event.target;
        setNewUser({ ...NewUser, [name]: value });
    };

    const handleSubmitForm = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault(); // Prevents page refresh
        try {
            const response = await axios.post(`${API}/users`, NewUser, {
                withCredentials: true,
            });
            alert("User created successfully! Now, you can login");
            router.push("/users/login");
        } catch (error) {
            alert("Something went wrong, try again");
            router.push("/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-blue-500">
            <h1 className="mb-5 text-4xl text-white md:text-8xl md:font-bold md:mb-10">
                Create user
            </h1>
            <form
                className="flex flex-col items-center justify-center w-3/4 bg-blue-400 outline outline-white rounded-xl h-3/4 md:w-1/2 md:h-1/2"
                onSubmit={(e) => handleSubmitForm(e)}
            >
                <input
                    type="text"
                    name="username"
                    id="name"
                    placeholder="Username:"
                    onChange={(e) => handleInputChange(e)}
                    className="p-2 m-1 border border-blue-300 rounded-md w-52 h-7 md:text-center md:rounded-lg md:h-8 md:w-72 placeholder:text-left md:p-3"
                />
                <input
                    name="password"
                    id="pass"
                    type="password"
                    placeholder="Password:"
                    onChange={(e) => handleInputChange(e)}
                    className="p-2 m-1 border border-blue-300 rounded-md w-52 h-7 md:text-center md:rounded-lg md:h-8 md:w-72 placeholder:text-left md:p-3"
                />
                <button
                    type="submit"
                    className="px-8 font-bold text-white underline transition-all duration-100 bg-blue-300 md:rounded-xl md:px-16 md:py-2 outline outline-white md:m-5 hover:bg-white hover:text-blue-400 hover:outline-blue-500 hover:scale-105 py-0.5 m-2 rounded-lg"
                >
                    Submit
                </button>
                <span className="text-white cursor-pointer hover:underline">
                    <Link href={"/users/login"}>Or log in</Link>
                </span>
            </form>
        </div>
    );
}

export default NewUser;
