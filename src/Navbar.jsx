import React from "react";
import { Link } from "react-router-dom";
import colors from "./colors";

const logo = () => {
  const logoContainerStyles = {
    maxWidth: '240px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
  };
  const logoImgStyles = {
    height: '72px',
    width: 'auto',
    display: 'block',
  };
  return (
    <Link to="/" className="navbar__logo" style={logoContainerStyles}>
      <img src="/images/jazz_stickers_logo.png" alt="jazzstickers.com logo" className="navbar__logo-img" style={logoImgStyles} />
    </Link>
  );
}

const links = () => {
  const containerStyles = {
    display: 'flex',
    gap: '1rem',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  };

  const linkStyles = {
    color: colors.brown
  }

  return (
    <div style={containerStyles}>
      <Link to="/" style={linkStyles}>Shop Stickers!</Link>
      <Link to="/instrument-quiz" style={linkStyles}>Instrument Compatibility Quiz</Link>
    </div>
  )
}

export default function Navbar() {
  const navbarStyles = {
    width: '100vw',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1000,
    boxSizing: 'border-box',
  };

  return (
    <nav style={navbarStyles}>
      {logo()}
      {links()}
    </nav>
  );
}
