"use client";
import styles from "./home.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [view, setView] = useState("home");
  const [visibleBlocks, setVisibleBlocks] = useState([]);

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
    <div className={styles.container}>
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

    {/* Cards con imágenes */}
    <div className={styles.cards}>
      <div className={styles.card}>
        <img src="/image.png" alt="Card 1" className={styles.cardImage} />
        <div className={styles.overlay}>Fulano de tal</div>
      </div>
      <div className={styles.card}>
        <img src="/image.png" alt="Card 2" className={styles.cardImage} />
        <div className={styles.overlay}>Mengano de tal</div>
      </div>
      <div className={styles.card}>
        <img src="/image.png" alt="Card 3" className={styles.cardImage} />
        <div className={styles.overlay}>Perencejo Perez</div>
      </div>
    </div>
  </section>
)}

      </main>
    </div>
  );
}
