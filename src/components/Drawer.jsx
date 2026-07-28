import { Link } from 'react-router-dom'

function Drawer({ isOpen, onClose }) {
  return (
    <>
      <div
        id="drawerBackdrop"
        className="drawer-backdrop"
        data-close-menu
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={onClose}
      />
      <nav id="drawer" className={`drawer${isOpen ? ' open' : ''}`} aria-hidden={!isOpen}>
        <div className="drawer-card">
          <div className="drawer-header">
            <p className="drawer-title">Navigation</p>
            <button
              id="drawerClose"
              className="drawer-close"
              type="button"
              aria-label="Close navigation menu"
              onClick={onClose}
            >
              ×
            </button>
          </div>
          <ul className="drawer-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About WildFinds</Link>
            </li>
            <li>
              <Link to="/about#how-it-works">How It Works</Link>
            </li>
            <li>
              <Link to="/about#team">Developers / Team</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Drawer;
