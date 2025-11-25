import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import "./SignIn.css";

export default function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/MainPortfolio");
            
        } catch (err) {
            setError(err.message);
        }
    }

    return(
        <div class="sign-in-container">
            <h1>הכנס שם משתמש וסיסמא</h1>
            <form onSubmit={handleSubmit}>
                <input class="form-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <br /> <br />
                <input class="form-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <br /> <br />
                <button type="submit">כניסה</button>
                {error && <p class="error-message">שם משתמש או סיסמא שגויים</p>}
            </form>

        </div>
    )
}
