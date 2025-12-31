import { useState } from "react";
import { getFunctions , httpsCallable } from "firebase/functions";
import { useAuth } from "../context/AuthContext";
import { app } from "../firebase";
import { functions } from "../firebase";


export default function AddClient() {
    const {user} = useAuth(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    
    
    const PHOTOGRAPHER_UID = "uNoqkXMfldYO74y1AfBY7M9HxSB3";

    const handleSubmit = async () => {
        if (!user) {
            alert("You must be signed in to create a client.");
            return;
        }

        if (user.uid !== PHOTOGRAPHER_UID) {
            alert("Only the photographer can add clients.");
            return;
        }

        if (!email || !password || !name) {
            alert("Please fill in all fields.");
            return;
        }


        try {
            setLoading(true);
            const functions = getFunctions(app, "us-central1");
            const createClient = httpsCallable(functions, "createClient");

            const result = await createClient({ email, password, name });
            alert(`Client created with UID: ${result.data.uid}`);
            setEmail("");
            setPassword("");
            setName("");
        } catch (error) {
            console.error("Error creating client:", error);
            alert(`Error creating client: ${error.message}`);
        }finally {
            setLoading(false);
        }
        };


    return (
        <div>
            <h1>הוסף לקוח</h1>
            <input 
                type="text"
                placeholder="שם"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /><br /><br />
            <input 
                type="email"
                placeholder="אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /><br /><br />
            <input 
                type="password"
                placeholder="סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br /><br />
            <button onClick={handleSubmit}>הוסף לקוח</button>
        </div>
    )

    }
