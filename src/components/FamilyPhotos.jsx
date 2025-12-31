import React from "react";
import { useState, useEffect, useCallback } from "react";
import { db, storage } from "../firebase";
import { ref, getDownloadURL , uploadBytes , deleteObject } from "firebase/storage";
import {  collection,  getDocs, addDoc, serverTimestamp , doc , deleteDoc} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "./Gallery.css";

const PHOTOGRAPHER_UID = "uNoqkXMfldYO74y1AfBY7M9HxSB3";

export default function FamilyPhotos(){
    const [images, setImages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const { user } = useAuth();
    const [files, setFiles] = useState([]);
    
  //upload images function
    const handleFiles = (e) => {
      setFiles(Array.from(e.target.files));
    };

   
   
  const uploadImages = async () => {
    if (!files.length) {
      alert("בחר תמונות");
      return;
    }

    try {
      for (const file of files) {
        const storagePath = `galleries/familyphotos/images/${Date.now()}-${file.name}`;
        const storageRef = ref(storage, storagePath);

        await uploadBytes(storageRef, file);

        await addDoc(
          collection(db, "galleries", "familyphotos", "images"),
          {
            filename: file.name,
            storagePath,
            uploadedAt: serverTimestamp(),
          }
        );
      }

      alert("התמונות הועלו");
      setFiles([]);
      window.location.reload(); // simplest refresh for now
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  //delete image function        
  const deleteImage = async (img) => {
  const confirmed = window.confirm("למחוק את התמונה?");
  if (!confirmed) return;

  try {
    // 1. delete from storage
    const imageRef = ref(storage, img.storagePath);
    await deleteObject(imageRef);

    // 2. delete firestore document
    await deleteDoc(
      doc(db, "galleries", "familyphotos", "images", img.id)
    );

    // 3. update UI
    setImages((prev) => prev.filter((i) => i.id !== img.id));
  } catch (err) {
    console.error("Delete failed:", err);
    alert("שגיאה במחיקת התמונה");
  }
};

    // Fetch images from Firestore
   useEffect(() => {
  const fetchImages = async () => {
    try {
      const colRef = collection(
        db,
        "galleries",
        "familyphotos",
        "images"
      );

      const snapshot = await getDocs(colRef);

      const data = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const docData = doc.data();

          const imageRef = ref(storage, docData.storagePath);
          const url = await getDownloadURL(imageRef);

          return {
            id: doc.id,
            url,
            ...docData
          };
        })
      );

      setImages(data);
    } catch (err) {
      console.error("Error fetching gallery images:", err);
    }
  };

  fetchImages();
}, []);

  const total = images.length;

    // Lightbox controls
    const openAt = (index) => {
      setCurrent(index);
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      setIsOpen(false);
      document.body.style.overflow = "";
    };

    const goPrev = useCallback(() => {
      setCurrent(c => (c - 1 + total) % total);
    }, [total]);

    const goNext = useCallback(() => {
      setCurrent(c => (c + 1) % total);
    }, [total]);

    // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, goPrev, goNext]);

    // Render
  return (
    <div className="promotional-gallery">
      <h1>צילומי משפחה ואירועים</h1>
      {user?.uid === PHOTOGRAPHER_UID && (
        <div className="photographer-upload">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFiles}
          />
          <button onClick={uploadImages}>
            העלאת תמונות לגלריה
          </button>
        </div>
      )}

      <div className="gallery-grid">
        {images.map((img, index) => (
          <div className="thumb-wrapper">
            <button
              className="thumb-btn"
              onClick={() => openAt(index)}
              aria-label={`פתח תמונה ${index + 1}`}
            >
              <img
                src={img.url}
                alt={`תמונה ${index + 1}`}
                loading="lazy"
                className="thumb-img"
              />
            </button>

            {user?.uid === PHOTOGRAPHER_UID && (
              <button
                className="delete-btn"
                onClick={() => deleteImage(img)}
                aria-label="Delete image"
              >
                🗑️
              </button>
            )}
        </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          images={images.map(img => img.url)} // ⬅️ IMPORTANT
          current={current}
          setCurrent={setCurrent}
          onClose={close}
          goNext={goNext}
          goPrev={goPrev}
        />
      )}
    </div>
  );
  
}


/* =========================
   Lightbox Component
========================= */

function Lightbox({ images, current, setCurrent, onClose, goNext, goPrev }) {
  const [touchStartX, setTouchStartX] = useState(null);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("lightbox-overlay")) onClose();
  };

  const onTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    if (touchStartX == null) return;

    const dx = e.touches[0].clientX - touchStartX;

    if (dx > 50) {
      goPrev();
      setTouchStartX(null);
    } else if (dx < -50) {
      goNext();
      setTouchStartX(null);
    }
  };

  


  return (
     

      <div
        className="lightbox-overlay"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="lightbox-inner"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
        >
          <button className="lb-close" onClick={onClose} aria-label="Close">
            ✕
          </button>

          <button className="lb-nav lb-prev" onClick={goPrev} aria-label="Previous">
            ‹
          </button>

          <div className="lb-image-wrap">
            <img
              src={images[current]}
              alt={`תמונה ${current + 1}`}
              className="lb-image"
              draggable="false"
            />
            <div className="lb-counter">
              {current + 1} / {images.length}
            </div>
          </div>

          <button className="lb-nav lb-next" onClick={goNext} aria-label="Next">
            ›
          </button>

          <div className="lb-thumbs">
            {images.map((src, i) => (
              <button
                key={i}
                className={`lb-thumb ${i === current ? "active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`תצוגה מקדימה ${i + 1}`}
              >
                <img src={src} alt={`מיניאטורה ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>

  );
}