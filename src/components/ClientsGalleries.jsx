import React from 'react';
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ref, uploadBytes ,getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp, getDocs  } from "firebase/firestore";
import { db, storage } from "../firebase";
import { PHOTOGRAPHER_UID } from '../auth/authConfig';
import "./ClientsGalleries.css";

export default function ClientsGalleries(){

    const [clients, setClients] = useState([]);

    useEffect(() => {
    async function loadClients() {
        const snap = await getDocs(collection(db, "clients"));
        const list = snap.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
        }));
        setClients(list);
    }
    loadClients();
    }, []);

    const [selectedClient, setSelectedClient] = useState(""); // dropdown of clients
    const [clientImages, setClientImages] = useState([]); // images of selected client

    useEffect(() => {
        if (!selectedClient) return;

        async function loadClientImages() {
            try {
            const q = collection(db, "clients", selectedClient, "images");
            const snap = await getDocs(q);

            const imagesWithUrl = await Promise.all(
            snap.docs.map(async doc => {
                const data = doc.data();
                const url = await getDownloadURL(ref(storage, data.storagePath));
                return { id: doc.id, url, ...data };
            })
            );

            setClientImages(imagesWithUrl);
            } catch (err) {
            console.error("Error loading client images:", err);
            }
        }

        loadClientImages();
        }, [selectedClient]);


    return(
        <div>
            <h1>בחר לקוח</h1>
                <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
                <option value="">בחר לקוח</option>
                    {clients.map(client => (
                    <option key={client.uid} value={client.uid}>
                    {client.name || client.email}
                    </option>
                    ))} 
                </select>

                <div class="client-gallery-grid">
                {clientImages.map(img => (
                    <div key={img.id} class="client-thumb">
                    <img src={img.url} alt={img.filename} loading="lazy" />
                    <p class="for-print">{img.selectedForPrint ? "נבחר להדפסה ✅" : "לא נבחר להדפסה"}</p>
                    </div>
                ))}
                </div>


        </div>
    )
}