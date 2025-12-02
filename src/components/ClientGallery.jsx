import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebase"; // makes sure your firebase.js exports db and storage
import { useAuth } from "../context/AuthContext"; // your auth context
import "./ClientGallery.css";

export default function ClientGallery() {
  const { user } = useAuth(); // signed-in client
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!user) return; // don't load if not signed in

    async function loadImages() {
      try {
        const q = query(
          collection(db, "clients", user.uid, "images"),
          orderBy("uploadedAt", "desc")
        );
        const snap = await getDocs(q);

        const urls = await Promise.all(
          snap.docs.map(async (doc) => {
            const data = doc.data();
            const url = await getDownloadURL(ref(storage, data.storagePath));
            return { id: doc.id, url, filename: data.filename };
          })
        );

        setImages(urls);
      } catch (err) {
        console.error("Error loading images:", err);
      }
    }

    loadImages();
  }, [user]);

  if (!user) return <p>Please sign in to see your gallery.</p>;

  return (
    <div>
      <h2>שלום {user.email.split("@")[0]} 😊!</h2>
      <div className="gallery-grid">
        {images.map((img) => (
          <div key={img.id} className="thumb">
            <img src={img.url} alt={img.filename} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
