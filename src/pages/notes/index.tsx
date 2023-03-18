import { API } from "@/constants/constant";
import { Note } from "../../dataTypes/note";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import NoteComponent from "@/components/noteComponent";

const Index = () => {
    const router = useRouter(); // nextjs router
    const [notes, setNotes] = useState<Note[]>([]); // notes array
    const cookie = new Cookies(); // cookies object

    // getnotes function, it will try to get all the notes from the API, if it fails it will redirect to the index page
    const getnotes = async () => {
        try {
            // API axios request with credentials and authorization header with the access token to get all the notes
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

    // useEffect hook, it will call the getnotes function when the component is mounted
    useEffect(() => {
        getnotes();
    }, [getnotes]);

    return (
        <div>
            {notes.map((note, index) => {
                return <NoteComponent note={note} key={index} />;
            })}
            <button onClick={() => router.push("/notes/new")}>New note</button>
        </div>
    );
};

export default Index;
