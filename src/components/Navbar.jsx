import { useState, useEffect } from "react";
import '../style/navbar.css';

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active, setActive]       = useState("Work");
  const [scrolled, setScrolled]   = useState(false);

  // Track scroll for the "scrolled" shadow state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 640) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLinkClick = (label, href) => {
    setActive(label);
    setMenuOpen(false);
    // Smooth-scroll to section if it exists on the page
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        {/* Logo */}
        <a href="#" className="nav-logo" onClick={(e) => e.preventDefault()}>
          <div className="logo-mark">
            <div className="logo-mark-inner" />
          </div>
          <span className="logo-text">
            Ayoub Bensassi<span className="accent">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={`nav-link${active === label ? " active" : ""}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick(label, href); }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: CTA + hamburger */}
        <div className="nav-right">
          <a href="#contact" className="nav-cta" onClick={(e) => e.preventDefault()}>
            Let&apos;s talk
            <span className="nav-cta-icon" aria-hidden="true">↗</span>
          </a>

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} role="dialog" aria-label="Navigation menu">
        <ul className="mobile-links">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <button
                className={`mobile-link${active === label ? " active" : ""}`}
                onClick={() => handleLinkClick(label, href)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
        <a href="#contact" className="mobile-cta" onClick={(e) => e.preventDefault()}>
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </div>
    </>
  );
}