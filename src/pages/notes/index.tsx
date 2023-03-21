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
        <div className="flex flex-col h-full bg-blue-500">
            <div className="flex flex-col md:flex-wrap my-7 md:flex-row md:my-0">
                {notes.map((note, index) => {
                    return <NoteComponent note={note} key={index} />;
                })}
            </div>
            <button
                onClick={() => router.push("/notes/new")}
                className="self-center absolute md:static bottom-32 md:bottom-auto shadow-xl md:shadow-lg p-2 font-bold text-gray-300 transition-all duration-75 bg-blue-600 rounded-md hover:outline-blue-600 hover:bg-sky-300 hover:text-gray-500 hover:scale-105 md:w-1/2 md:p-1.5 outline outline-sky-300"
            >
                New note
            </button>
        </div>
    );
};

export default Index;
