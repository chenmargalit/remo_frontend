import "./App.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import CircularProgress from "@mui/material/CircularProgress";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { queryServer } from "./utils/httpHandler";
import {inputLengthValidation} from "./utils/validations";
import {WELCOME_MSG, WELCOME_SUB_MSG, SERVER_UNAVAILABLE_ERR, INPUT_PLACEHOLDER} from "./constant";

export default function App() {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [error, setError] = useState("");
    const [serverCrashed, setServerCrashed] = useState(false);



    const handleSend = async (query) => {

        const inpValidation = inputLengthValidation(query)
        const {error, msg} = inpValidation
        if (error) {
            setError(msg);
            return
        }

        setError("");

        if (!hasStarted) setHasStarted(true);

        setLoading(true);
        const result = await queryServer(query, setServerCrashed, setError);
        if (result !== null) {
            setMessages((prev) => [...prev, { prompt: query, response: result }]);
            setQuery("");
            setLoading(false);
        }
    };

    return (
        <div className="chat-wrapper">
            <div className="chat-box">
                <div className="chat-history">
                    {!hasStarted && (
                        <div className='welcome-wrapper'>

                        <div className="welcome-message">
                            {WELCOME_MSG}
                            <p className='welcome-message_secondary-headline'>{WELCOME_SUB_MSG}</p>
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
                        {SERVER_UNAVAILABLE_ERR}
                    </div>
                )}
                <div className="chat-input-box">
                    {error && <div className="input-error">{error}</div>}

                    <TextField
                        className='input-field'
                        fullWidth
                        placeholder={INPUT_PLACEHOLDER}
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
