import { Note } from "../../../dataTypes/note";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function editNote() {
    const router = useRouter();
    const { id } = router.query;
    const cookie = new Cookies();
    const [Note, setNote] = useState<Note>({ title: "", content: "" });
    const getNote = async () => {
        const { data } = await axios.get(`http://localhost:4000/notes/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${cookie.get("access_token")}`,
            },
        });
        setNote(data);
    };
    const handleInputChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        setNote({ ...Note, [event.target.name]: event.target.value });
        console.log(Note);
    };
    useEffect(() => {
        getNote();
    }, []);

    return (
        <div>
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
        </div>
    );
}

export default editNote;
