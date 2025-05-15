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

  const dropdownStyles = {
    position: 'relative',
    display: 'inline-block',
  };
  const buttonStyles = {
    background: '#fff',
    color: colors.brown,
    border: '1px solid #ccc',
    borderRadius: 4,
    padding: '0.5em 1em',
    fontSize: 16,
    cursor: 'pointer',
    fontWeight: 600,
    marginLeft: '1rem',
  };
  const menuStyles = {
    display: 'none',
    position: 'absolute',
    background: '#fff',
    minWidth: 200,
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    zIndex: 10,
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 4,
    right: 0
  };
  const menuItemStyles = {
    color: colors.brown,
    padding: '0.75em 1.5em',
    textDecoration: 'none',
    display: 'block',
    background: '#fff',
    fontSize: 16,
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    width: '100%',
  };
  // Simple dropdown logic
  const [open, setOpen] = React.useState(false);
  return (
    <div style={containerStyles}>
      <Link to="/" style={linkStyles}>Shop Stickers!</Link>
      <div style={dropdownStyles} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <button style={buttonStyles} aria-haspopup="true" aria-expanded={open}>
          Jazz Resources &#x25BC;
        </button>
        <div style={{...menuStyles, display: open ? 'block' : 'none'}}>
          <Link to="/instrument-quiz" style={menuItemStyles}>Instrument Compatibility Quiz</Link>
          <Link to="/trumpet-game" style={menuItemStyles}>Trumpet Game</Link>
        </div>
      </div>
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
