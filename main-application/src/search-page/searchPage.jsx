import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";

function SearchPage() {
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");

    const API_URL = "http://localhost:5000/notes"; // Backend API URL

    // Fetch notes from the database when the component mounts
    useEffect(() => {
        async function fetchNotes() {
            try {
                const response = await axios.get(API_URL);
                setNotes(response.data);
            } catch (err) {
                console.error("Error fetching notes:", err);
            }
        }
        fetchNotes();
    }, []);

    // Function to handle adding a new note
    async function addNote() {
        if (!noteTitle.trim() || !noteContent.trim()) {
            setError("Please provide both a title and content for the note.");
            return;
        }

        const newNote = {
            title: noteTitle,
            content: noteContent,
        };

        try {
            const response = await axios.post(API_URL, newNote);
            setNotes([...notes, response.data]);
            setNoteTitle("");
            setNoteContent("");
            setError("");
        } catch (err) {
            setError("Error adding note");
            console.error("Error adding note:", err);
        }
    }

    // Function to delete a note by ID
    async function deleteNote(id) {
        try {
            await axios.delete(`${API_URL}/${id}`);
            // Use _id here, since MongoDB uses _id as the unique identifier
            setNotes(notes.filter((note) => note._id !== id));
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    }

    // Function to format the note content for readability
    function formatContent(content) {
        return content.split("\n").map((line, index) => (
            <p key={index} className="mb-2">
                {line.split("**").map((text, i) =>
                    i % 2 === 1 ? (
                        <strong key={i} className="font-semibold text-gray-800">
                            {text}
                        </strong>
                    ) : (
                        text
                    )
                )}
            </p>
        ));
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Notes Generator</h1>
            <p className="text-gray-600 mb-8">Create and manage your notes easily!</p>

            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-8">
                <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder="Enter note title..."
                    className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Enter note content (use ** for bold text and new lines for spacing)..."
                    rows="5"
                    className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                    onClick={addNote}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Add Note
                </button>
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </div>

            <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Notes</h2>
                {notes.length === 0 && (
                    <p className="text-gray-600">No notes added yet. Start by creating one above!</p>
                )}
                {notes.map((note) => (
                    <div
                        key={note._id} // Ensure _id is used here
                        className="bg-white shadow-md rounded-lg p-4 mb-4 border"
                    >
                        <h3 className="text-lg font-bold text-gray-800">{note.title}</h3>
                        <div className="text-gray-600 mt-2">{formatContent(note.content)}</div>
                        <button
                            onClick={() => deleteNote(note._id)} // Pass _id as argument
                            className="mt-4 bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition"
                        >
                            Delete Note
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-10">
                <Link to="/">
                    <div className="">
                        <Button>Go Back</Button>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SearchPage;
