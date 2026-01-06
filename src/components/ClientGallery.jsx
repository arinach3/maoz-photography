import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebase"; 
import { useAuth } from "../context/AuthContext"; 
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Navigate } from "react-router-dom";

import "./ClientGallery.css";



export default function ClientGallery() {
  const { user } = useAuth(); 
  const [images, setImages] = useState([]);
  const selectedCount = images.filter(
      img => img.selectedForPrint
    ).length;

  const downloadImage = (url, filename) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = filename || "photo.jpg"; 
      link.target = "_blank"; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const togglePrint = async (imageId, isSelected) => {
  try {
    const imageRef = doc(db, "clients", user.uid, "images", imageId);

    const newValue = !isSelected;

    await updateDoc(imageRef, {
      selectedForPrint: newValue,
      selectedAt: newValue ? serverTimestamp() : null
    });

    setImages(prevImages =>
      prevImages.map(img =>
        img.id === imageId
          ? { ...img, selectedForPrint: newValue }
          : img
      )
    );
  } catch (err) {
    console.error("Failed to update print selection", err);
  }
};

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
            return {
                id: doc.id,
                url,
                filename: data.filename,
                selectedForPrint: data.selectedForPrint || false
              };
            
          })
        );

        setImages(urls);
      } catch (err) {
        console.error("Error loading images:", err);
      }
    }

    

    loadImages();
  }, [user]);

  if (!user) {
  return <Navigate to="/SignIn" />;
}

  return (
    <div>
      <h2>שלום {user.email.split("@")[0]} 😊!</h2>
      <div className="gallery-grid">
        {images.map((img) => (
          <div key={img.id} className="thumb">
            <img src={img.url} alt={img.filename} loading="lazy" />
            <button className={`print-btn ${img.selectedForPrint ? "selected" : ""}`}
            onClick={() => togglePrint(img.id, img.selectedForPrint)}
          >
            {img.selectedForPrint ? "✓ נבחר להדפסה" : "בחר להדפסה"}
          </button>
          <button className="download-btn"
              onClick={() => downloadImage(img.url, img.filename)}
            >הורדה ⬇ 
            </button>
          </div>
        ))}
      </div>
      {selectedCount > 0 && (
      <div className="print-counter">
        נבחרו {selectedCount} תמונות להדפסה
      </div>
    )}
    </div>
  );
}
