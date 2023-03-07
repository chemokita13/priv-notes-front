import { Note } from "../../../dataTypes/note";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function editNote() {
    const router = useRouter(); // Nextjs router
    const { id } = router.query; // Get id param from url
    const cookie = new Cookies(); // Get login token from cookies
    const [Note, setNote] = useState<Note>({ title: "", content: "" }); // Note state to edit and send to server

    // Get note to edit from server
    const getNote = async () => {
        const { data } = await axios.get(`http://localhost:4000/notes/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${cookie.get("access_token")}`,
            },
        });
        setNote(data);
    };

    // Handle input change and edit Note state
    const handleInputChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        setNote({ ...Note, [event.target.name]: event.target.value });
    };

    // Handle form submit and send edited note to server
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await axios.put(
            `http://localhost:4000/notes/${Note._id}`,
            Note,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${cookie.get("access_token")}`,
                },
            }
        );

        // Check if everything went well by status code
        if (response.status === 200) {
            alert("All went well!");
        } else {
            alert("Something went wrong!");
        }

        // Redirect to notes index page
        router.push("/notes");
    };

    // Get note to edit on component mount
    useEffect(() => {
        getNote();
    }, []);

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title: "
                    defaultValue={Note.title}
                    onChange={(e) => handleInputChange(e)}
                />
                <input
                    type="text"
                    name="content"
                    id="content"
                    placeholder="Content: "
                    defaultValue={Note.content}
                    onChange={(e) => handleInputChange(e)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default editNote;
