import axios from "axios";
import { useState } from "react";
import { topicKeywords } from "./keyword.js";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";


function GeneratePage() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(""); // To handle non-related queries

    // Function to validate if the query is related
    function isRelated(query) {
        return topicKeywords.some((keyword) =>
            query.toLowerCase().includes(keyword)
        );
    }

    async function generateAnswer() {
        setError(""); // Reset error
        if (!isRelated(question)) {
            setError("Please ask a question related to Context.");
            setAnswer("");
            return;
        }

        setAnswer("Loading...");

        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBMI3bx6Sn3QCSRvsR-0ssnQR9YIFb8e9Y",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `This is an education-related query. Answer appropriately and give the data in detail with spacing, line breaks, and bold formatting even if the spelling are wrong interpret with your own and generate related information what you have and if words are not present then give the general result of the query : ${question}`,
                                },
                            ],
                        },
                    ],
                },
            });

            const rawAnswer =
                response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "No answer generated.";

            // Replace plain text answer with enhanced HTML structure
            const formattedAnswer = rawAnswer
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
                .replace(/\n/g, "<br />"); // Line breaks

            setAnswer(formattedAnswer);
        } catch (error) {
            console.error("Error generating answer:", error);
            setAnswer("Failed to fetch an answer. Please try again later.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
                Education Query Assistant
            </h1>
            <p className="text-gray-600 mb-8">
                Ask any question related to educational topics or concepts!
            </p>

            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-8">
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your topic question here..."
                    rows="5"
                    className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                    onClick={generateAnswer}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Generate Answer
                </button>
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </div>

            <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Generated Answer
                </h2>
                {answer ? (
                    <div
                        className="bg-white shadow-md rounded-lg p-6 border"
                        dangerouslySetInnerHTML={{ __html: answer }} // Safely render HTML content
                    ></div>
                ) : (
                    <p className="text-gray-600">No answer generated yet.</p>
                )}
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

export default GeneratePage;
