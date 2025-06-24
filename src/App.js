import "./App.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import CircularProgress from "@mui/material/CircularProgress";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { serverEndpoint } from './constant';

export default function App() {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [error, setError] = useState("");
    const [serverCrashed, setServerCrashed] = useState(false);



    const handleSend = async (query) => {

        if (query.length < 1 || query.length > 2000) {
            setError("ההודעה חייבת להכיל בין 1 ל-2000 תווים.");
            return;
        }
        setError("");

        if (!hasStarted) setHasStarted(true);

        setLoading(true);
        const result = await queryServer(query);
        console.log('result is', result)
        if (result !== null) {
            setMessages((prev) => [...prev, { prompt: query, response: result }]);
            setQuery("");
            setLoading(false);
        }

    };

    async function queryServer(inputText) {
        try {
            const res = await fetch(`${serverEndpoint}/query`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: inputText }),
            });

            if (!res.ok) {
                setServerCrashed(true);
                setError(`שגיאה מהשרת: ${res.status}`);
                return null;
            }

            const data = await res.json()
            clean_errors()
            return data;
        } catch (err) {
            console.error("Failed to query server:", err);
            return null;
        }
    }

const clean_errors = () => {
        setServerCrashed(false)
        setError('')
    }

    return (
        <div className="chat-wrapper">
            <div className="chat-box">
                <div className="chat-history">
                    {!hasStarted && (
                        <div className='welcome-wrapper'>

                        <div className="welcome-message">
                            ברוך הבא לעומר, כיף לראות אותך כאן!
                            <p className='welcome-message_secondary-headline'>העוזר החדש שלכם למציאת רופאיםף מטפלים, מרפאות בתי מרקחת ורפואה דחופה</p>
                        </div>
                        <div>
                        <img src='static/clalit.png' className='clalit-logo' alt='Clalit'/>
                        </div>
                        </div>

                    )}
                    {messages.map((msg, idx) => (
                        <div key={idx} className="chat-bubble-wrapper">
                            <div className="chat-bubble user">
                                <AccountCircleIcon className='user_icon' style={{  }} />
                                <div className="chat-text">{msg.prompt}</div>
                            </div>
                            <div className="chat-bubble bot">
                                <img src="/static/hamudi.jpeg" alt="Hamudi" className="chat-header-avatar" />
                                <div className="chat-text">{msg.response}</div>
                            </div>
                        </div>
                    ))}
                </div>
                {serverCrashed && (
                    <div className="server-error-banner">
                        ⚠️ השרת לא זמין כרגע. נסה שוב מאוחר יותר.
                    </div>
                )}
                <div className="chat-input-box">
                    {error && <div className="input-error">{error}</div>}

                    <TextField
                        className='input-field'
                        fullWidth
                        placeholder="מה תרצו לדעת?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend(query);
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSend} disabled={loading} className="chat-send-icon">
                                        {loading && !serverCrashed ? (
                                            <CircularProgress size={18} thickness={5} color="inherit" />
                                        ) : (
                                            <NorthRoundedIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}

                    />
                </div>
            </div>
        </div>



    );

}
