import "./globals.css";

export default function HomeLayout({ children }) {
  return (
    <div>
      <header className="home-header">
      </header>

      <main className="home-main">
        {children}
      </main>

      <footer className="home-footer">
        <p>© 2026 Kevin Romera</p>
      </footer>
    </div>
  );
}

