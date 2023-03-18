import { Note } from "@/dataTypes/note";
import { useRouter } from "next/router";
import React from "react";

// This is a component that displays a note container, it receives a note object as a prop
type MyProps = {
    note: Note;
};

function NoteComponent(props: MyProps) {
    const { note } = props; // destructuring props into note object

    const router = useRouter(); // nextjs router

    // handleEditNote function, it receives an id as a parameter and redirects to the noteEdit page
    const handleEditNote = (id: string) => {
        router.push(`/notes/edit/${id}`);
    };

    return (
        <div>
            <h2>{note.title} </h2>
            <h3>{note.content} </h3>
            <button onClick={() => handleEditNote(note._id || "")}>
                Edit note
            </button>
        </div>
    );
}

export default NoteComponent;
