import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { nav } from '../data/siteData';

type NavbarProps = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

export function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  return (
    <header className="header">
      <Link className="brand" to="/" aria-label="Together Support home">
        <img src="/together-support-logo.png" alt="Together Support logo" width={56} height={56} />
        <span>Together Support</span>
      </Link>
      <nav className="desktop" aria-label="Main navigation">
        {nav.map((n) => (
          <Link key={n.label} to={n.href}>
            {n.label}
          </Link>
        ))}
        <Link className="btn small" to="/#referrals">
          Make a Referral
        </Link>
      </nav>
      <button className="menuBtn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <X /> : <Menu />}
      </button>
      {menuOpen && (
        <div className="mobile">
          {nav.map((n) => (
            <Link onClick={() => setMenuOpen(false)} key={n.label} to={n.href}>
              {n.label}
            </Link>
          ))}
          <Link className="btn small" onClick={() => setMenuOpen(false)} to="/#referrals">
            Make a Referral
          </Link>
        </div>
      )}
    </header>
  );
}
