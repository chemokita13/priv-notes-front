import axios from "axios";
import { Note } from "../../dataTypes/note";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { API } from "../../constants/constant";
import Link from "next/link";

function NewNote() {
    const cookie = new Cookies(); // Get login token from cookies
    const router = useRouter(); // Nextjs router

    const [Note, setNote] = useState<Note>({ title: "", content: "" }); // Note state to create and send to server

    // Handle input change and edit Note state
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        event.preventDefault();
        setNote({ ...Note, [event.target.name]: event.target.value });
    };

    // const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void =>{
    //     event.preventDefault();
    //     setNote({ ...Note, [event.target.name]: event.target.value });
    // }

    // Handle form submit and send Note to API server
    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault(); // Prevent page reload

        // Send note to API server
        const response = await axios.post(`${API}/notes`, Note, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${cookie.get("access_token")}`,
            },
        });

        // Check if everything went well by status code
        if (response.status === 201) {
            alert("All went well!");
        } else {
            alert("Something went wrong!");
        }

        // Redirect to notes index page
        router.push("/notes");
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-blue-500">
            <h1 className="mb-5 text-4xl text-white md:text-8xl md:font-bold md:mb-10">
                New note
            </h1>
            <form
                className="flex flex-col items-center justify-center w-3/4 bg-blue-400 outline outline-white rounded-xl h-3/4 md:w-1/2 md:h-[55%]"
                onSubmit={(e) => handleFormSubmit(e)}
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={(e) => handleInputChange(e)}
                    className="p-2 m-1 border border-blue-300 rounded-md w-52 h-7 md:text-center md:rounded-lg md:h-8 md:w-72 md:p-3"
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    onChange={(e) => handleInputChange(e)}
                    className="h-32 p-2 m-1 border border-blue-300 rounded-md w-52 md:text-center md:rounded-lg md:h-32 md:w-72 md:p-3"
                />
                <button
                    type="submit"
                    className="px-8 font-bold text-white underline transition-all duration-100 bg-blue-300 md:rounded-xl md:px-16 md:py-2 outline outline-white md:m-5 hover:bg-white hover:text-blue-400 hover:outline-blue-500 hover:scale-105 py-0.5 m-2 rounded-lg"
                >
                    Submit
                </button>
                <span className="text-white cursor-pointer hover:underline">
                    <Link href={"/notes"}>Go back</Link>
                </span>
            </form>
        </div>
    );
}

export default NewNote;
