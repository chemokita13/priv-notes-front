import { API } from "@/constants/constant";
import { Note } from "@/dataTypes/note";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Cookies from "universal-cookie";

// This is a component that displays a note container, it receives a note object as a prop
type MyProps = {
    note: Note;
};

function NoteComponent(props: MyProps) {
    const { note } = props; // destructuring props into note object

    const router = useRouter(); // nextjs router

    const cookie = new Cookies(); // cookies object (from js-cookie)

    // handleEditNote function, it receives an id as a parameter and redirects to the noteEdit page
    const handleEditNote = (id: string) => {
        console.log(note);
        router.push(`/notes/edit/${id}`);
    };

    // handleDeleteNote function, it receives an id as a parameter and deletes the note with that id
    const handleDeleteNote = async (id: string): Promise<void> => {
        try {
            const res = await axios.delete(`${API}/notes/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${cookie.get("access_token")}`,
                },
            });
            if (res.status === 200) alert("Note deleted!");
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    return (
        <div className="font-medium text-gray-700 rounded-lg outline outline-cyan-600 bg-sky-300 md:m-5 md:min-w-[20%] w-[90vw] md:w-auto md:p-5 flex flex-col self-center m-2 p-2">
            <h2 className="text-center border-b-2 md:p-1 border-b-blue-200">
                {note.title}{" "}
            </h2>
            <h3 className="my-2 md:mt-5 md:my-0">{note.content} </h3>
            <div className="flex flex-col gap-3 mt-2 md:gap-5 md:flex-row md:mt-5">
                <button
                    onClick={() => handleEditNote(note._id || "")}
                    className="font-normal rounded-md outline outline-blue-500 md:w-1/2"
                >
                    Edit note
                </button>
                <button
                    className="font-normal rounded-md outline outline-red-500 md:w-1/2"
                    onClick={() => handleDeleteNote(note._id || "")}
                >
                    Delete note
                </button>
            </div>
        </div>
    );
}

export default NoteComponent;
