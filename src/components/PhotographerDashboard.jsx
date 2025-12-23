import React from 'react';
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase";
import { PHOTOGRAPHER_UID } from '../auth/authConfig';


export default function PhotographerDashboard(){

    const { user } = useAuth();
    const [files, setFiles] = useState([]);
    const [clients, setClients] = useState([]);
    const [clientUid, setClientUid] = useState(""); // selected client UID



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

    if (!user || user.uid !== PHOTOGRAPHER_UID) {
    return <p>אין לך הרשאה לעמוד זה</p>;
  }
    const handleFiles = (e) => {
  setFiles(Array.from(e.target.files));
};
    

    const uploadImages = async () => {
    if (!clientUid || files.length === 0) {
      alert("בחר לקוח וקבצים");
      return;
    }

  for (const file of files) {
    const storagePath = `clients/${clientUid}/images/${file.name}`;
    const storageRef = ref(storage, storagePath);

    await uploadBytes(storageRef, file);

    await addDoc(
      collection(db, "clients", clientUid, "images"),
      {
        filename: file.name,
        storagePath,
        uploadedAt: serverTimestamp(),
        selectedForPrint: false
      }
    );
  }

  alert("העלאה הושלמה");
  setFiles([]);
};
    return(
        <div>
            <h1>העלאת תמונות לקוח</h1>
            <input type="file" multiple accept="image/*" onChange={handleFiles} />
            <select value={clientUid} onChange={(e) => setClientUid(e.target.value)}>
                <option value="">בחר לקוח</option>
                    {clients.map(client => (
                    <option key={client.uid} value={client.uid}>
                    {client.name || client.email} 
                </option>
  ))}
</select>            <button onClick={uploadImages}>העלה תמונות</button>
        </div>
    )

}