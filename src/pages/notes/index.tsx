import { API } from "@/constants/constant";
import { Note } from "../../dataTypes/note";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const Index = () => {
    const router = useRouter(); // nextjs router
    const [notes, setNotes] = useState<Note[]>([]); // notes array
    const cookie = new Cookies(); // cookies object

    const getnotes = async () => {
        try {
            const { data } = await axios.get(`${API}/notes`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${cookie.get("access_token")}`,
                },
            });
            setNotes(data);
        } catch (error) {
            alert("Something went wrong!");
            router.push("/");
        }
    };

    const handleEditNote = (id: string) => {
        router.push(`/notes/edit/${id}`);
    };

    useEffect(() => {
        getnotes();
    }, [getnotes]);
    return (
        <div>
            {notes.map((note, index) => {
                return (
                    <div key={note._id || index}>
                        <h1>{note.title}</h1>
                        <p>{note.content}</p>
                        <button onClick={() => handleEditNote(note._id || "")}>
                            Edit
                        </button>
                    </div>
                );
            })}
            <button onClick={() => router.push("/notes/new")}>New note</button>
        </div>
    );
};

export default Index;
