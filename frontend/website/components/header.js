export default function Header() {
  return (
    <header className="header-wrapper">
      <div className="header-container">
        <a href="/">
          <span className="header-logo-icon">💾</span>
          <span className="header-logo-text">Jonathan Asbell</span>
        </a>
      </div>
      <div className="header-links">
        <a href="/blog">Blog</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
    </header>
  );
}
