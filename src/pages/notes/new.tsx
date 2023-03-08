import axios from "axios";
import { Note } from "../../dataTypes/note";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { API } from "../../constants/constant";

function newNote() {
    const cookie = new Cookies(); // Get login token from cookies
    const router = useRouter(); // Nextjs router

    const [Note, setNote] = useState<Note>({ title: "", content: "" }); // Note state to create and send to server

    // Handle input change and edit Note state
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        event.preventDefault();
        setNote({ ...Note, [event.target.name]: event.target.value });
    };

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
        <div>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title: "
                    onChange={(e) => handleInputChange(e)}
                />
                <input
                    type="text"
                    name="content"
                    id="content"
                    placeholder="Content: "
                    onChange={(e) => handleInputChange(e)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default newNote;
