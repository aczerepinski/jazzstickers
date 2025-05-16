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
    background: 'transparent',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    marginLeft: '1rem',
    ...linkStyles,
  };
  const menuStyles = {
    position: 'absolute',
    background: '#fff',
    minWidth: 200,
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    zIndex: 10,
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 4,
    right: 0,
    border: '1px solid #ddd',
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

  // Close dropdown when clicking outside
  const dropdownRef = React.useRef();
  React.useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div style={containerStyles}>
      <Link to="/" style={linkStyles}>Shop Stickers!</Link>
      <div style={dropdownStyles} ref={dropdownRef}>
        <button
          style={buttonStyles}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          onKeyDown={e => {
            if (e.key === 'Escape') setOpen(false);
          }}
        >
          Jazz Resources &#x25BC;
        </button>
        {open && (
          <div style={menuStyles} tabIndex={-1}>
            <Link to="/instrument-quiz" style={menuItemStyles} onClick={() => setOpen(false)}>Instrument Compatibility Quiz</Link>
            <Link to="/trumpet-game" style={menuItemStyles} onClick={() => setOpen(false)}>Trumpet Game</Link>
          </div>
        )}
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
