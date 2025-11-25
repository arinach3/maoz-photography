import React from "react";
import { useState, useEffect, useCallback } from "react";
import "./Gallery.css";

const images = [
    "/images/family1.jpg",
    "/images/family2.jpg",
    "/images/family3.jpg",
    "/images/family4.jpg",
    "/images/family6.jpg",
    "/images/bar-mitzva1.jpg",
    "/images/bar-mitzva2.jpg",
    "/images/bar-mitzva3.jpg",

]

export default function FamilyPhotos(){
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const total = images.length;

    const openAt = (index) => {
        setCurrent(index);
        setIsOpen(true);
        document.body.style.overflow = "hidden"; // prevent background scroll
    };

    const close = () => {
        setIsOpen(false);
        document.body.style.overflow = "";
    };

    const goPrev = useCallback(() => {
        setCurrent((c) => (c - 1 + total) % total);
    }, [total]);

    const goNext = useCallback(() => {
        setCurrent((c) => (c + 1) % total);
    }, [total]);

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

    return(
        <div>
            <div class="promotional-gallery">
                <h1>צילומי משפחה ואירועים</h1>
                <div className="gallery-grid">
                    {images.map((src, index) => (
                    <button
                        key={index}
                        className="thumb-btn"
                        onClick={() => openAt(index)}
                        aria-label={`פתח תמונה ${index + 1}`}
                    >
                        <img
                        src={src}
                        alt={`תמונה ${index + 1}`}
                        loading="lazy"
                        className="thumb-img"
                        />
                    </button>
                    ))}
                </div>

                {isOpen && (
                    <Lightbox
                    images={images}
                    current={current}
                    setCurrent={setCurrent}
                    onClose={close}
                    goNext={goNext}
                    goPrev={goPrev}
                    />
                )}
            </div>
        </div>
    )
}

/* Lightbox component inside same file */
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
    // threshold
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
          {images.map((s, i) => (
            <button
              key={i}
              className={`lb-thumb ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`תצוגה מקדימה ${i + 1}`}
            >
              <img src={s} alt={`מיניאטורה ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}