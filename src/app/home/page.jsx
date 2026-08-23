"use client";
import Image from "next/image";
import styles from "./home.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [view, setView] = useState("home");
  const [visibleBlocks, setVisibleBlocks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  // Sincroniza la clase 'dark' en <html> con el estado darkMode
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }
}, [darkMode]);
  
useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleBlocks((prev) => [...prev, entry.target.dataset.id]);
          }
        });
      },
      { threshold: 0.2 }
    );
    


    document.querySelectorAll(`.${styles.block}`).forEach((block, i) => {
      block.dataset.id = i;
      observer.observe(block);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      {/* Sidebar fija */}
      <nav className={styles.sidebar}>
        <ul>
          <li onClick={() => setView("home")}>
            <span className={styles.icon}>
              {/* SVG Home */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                className="bi bi-house" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 
                  8.146a.5.5 0 0 0 .708.708L2 
                  8.207V13.5A1.5 1.5 0 0 0 
                  3.5 15h9a1.5 1.5 0 0 0 
                  1.5-1.5V8.207l.646.647a.5.5 
                  0 0 0 .708-.708L13 5.793V2.5a.5.5 
                  0 0 0-.5-.5h-1a.5.5 0 0 
                  0-.5.5v1.293zM13 
                  7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 
                  0 0 1-.5-.5V7.207l5-5z"/>
              </svg>
            </span>
            <span className={styles.label}>Home</span>
          </li>

          <li onClick={() => setView("contact")}>
            <span className={styles.icon}>
              {/* SVG Contact */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                className="bi bi-people" viewBox="0 0 16 16">
                <path d="M15 14s1 0 1-1-1-4-5-4-5 
                  3-5 4 1 1 1 1zm-7.978-1L7 
                  12.996c.001-.264.167-1.03.76-1.72C8.312 
                  10.629 9.282 10 11 10c1.717 0 2.687.63 
                  3.24 1.276.593.69.758 1.457.76 
                  1.72l-.008.002-.014.002zM11 7a2 2 0 
                  1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 
                  1 1-6 0 3 3 0 0 1 6 0M6.936 
                  9.28a6 6 0 0 0-1.23-.247A7 7 0 
                  0 0 5 9c-4 0-5 3-5 4q0 1 1 
                  1h4.216A2.24 2.24 0 0 1 5 
                  13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 
                  10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 
                  1.492-1.256 3.16-1.275ZM1.5 
                  5.5a3 3 0 1 1 6 0 3 3 0 0 
                  1-6 0m3-2a2 2 0 1 0 0 4 2 
                  2 0 0 0 0-4"/>
              </svg>
            </span>
            <span className={styles.label}>Contact</span>
          </li>

          <li>
            <Link href="/">
              <span className={styles.icon}>
                {/* SVG Logout */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                  className="bi bi-door-closed" viewBox="0 0 16 16">
                  <path d="M3 2a1 1 0 0 1 1-1h8a1 
                    1 0 0 1 1 1v13h1.5a.5.5 0 0 
                    1 0 1h-13a.5.5 0 0 1 0-1H3zm1 
                    13h8V2H4z"/>
                  <path d="M9 9a1 1 0 1 0 2 0 1 
                    1 0 0 0-2 0"/>
                </svg>
              </span>
              <span className={styles.label}>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <main className={styles.main}>
        {view === "home" && (
          <section className={`${styles.homeSection} ${styles.fadeIn}`}>
            <h1 className={styles.title}>Home</h1>

            {/* Bloques animados */}
            <div className={styles.blocks}>
  <div className={`${styles.block} ${styles.red} ${visibleBlocks.includes("0") ? styles.visible : ""}`}>
    Bloque rojo
  </div>
  <div className={`${styles.block} ${styles.blue} ${visibleBlocks.includes("1") ? styles.visible : ""}`}>
    Bloque azul
  </div>
  <div className={`${styles.block} ${styles.green} ${visibleBlocks.includes("2") ? styles.visible : ""}`}>
    Bloque verde
  </div>
  <div className={`${styles.block} ${styles.orange} ${visibleBlocks.includes("3") ? styles.visible : ""}`}>
    Bloque naranja
  </div>
  <div className={`${styles.block} ${styles.purple} ${visibleBlocks.includes("4") ? styles.visible : ""}`}>
    Bloque púrpura
  </div>
  <div className={`${styles.block} ${styles.teal} ${visibleBlocks.includes("5") ? styles.visible : ""}`}>
    Bloque teal
  </div>
  <div className={`${styles.block} ${styles.pink} ${visibleBlocks.includes("6") ? styles.visible : ""}`}>
    Bloque rosa
  </div>
  <div className={`${styles.block} ${styles.brown} ${visibleBlocks.includes("7") ? styles.visible : ""}`}>
    Bloque marrón
  </div>
  <div className={`${styles.block} ${styles.gray} ${visibleBlocks.includes("8") ? styles.visible : ""}`}>
    Bloque gris
  </div>
</div>

          </section>
        )}

        {view === "contact" && (
  <section className={`${styles.contactSection} ${styles.fadeIn}`}>
    <h1 className={styles.title}>Contáctanos</h1>
    <p>Aquí puedes ver nuestras opciones de contacto:</p>

    {/* Cards con imágenes usando next/image */}
<div className={styles.cards}>
  <div className={styles.card}>
    <div className={styles.cardImageWrapper}>
      <Image
        src="/image.webp"
        alt="Card 1"
        fill
        sizes="(max-width: 640px) 100vw, 300px"
        className={styles.cardImage}
      />
    </div>
    <div className={styles.overlay}>Fulano de tal</div>
  </div>

  <div className={styles.card}>
    <div className={styles.cardImageWrapper}>
      <Image
        src="/image.webp"
        alt="Card 2"
        fill
        sizes="(max-width: 640px) 100vw, 300px"
        className={styles.cardImage}
      />
    </div>
    <div className={styles.overlay}>Mengano de tal</div>
  </div>

  <div className={styles.card}>
    <div className={styles.cardImageWrapper}>
      <Image
        src="/image.webp"
        alt="Card 3"
        fill
        sizes="(max-width: 640px) 100vw, 300px"
        className={styles.cardImage}
      />
    </div>
    <div className={styles.overlay}>Perencejo Perez</div>
  </div>
</div>

  </section>
)}

      </main>
      {/* Botón flotante modo oscuro */}
<button 
  className={styles.darkModeToggle} 
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? (
    /* SVG Luna */
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
      className="bi bi-moon-fill" viewBox="0 0 16 16">
      <path d="M6 .278a.77.7z7 0 0 1 .08.858..."/><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
    </svg>
  ) : (
    /* SVG Sol */
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
      className="bi bi-brightness-high" viewBox="0 0 16 16">
        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>

    </svg>
  )}
</button>

    </div>
  );
}
