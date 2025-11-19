import React, { useState } from 'react';
import '../styles/theme.css';
import { pgOwnerLogos } from '../assets';
import useScrollSpy from '../hooks/useScrollSpy';
import { smoothScrollToId } from '../common/utils/scroll';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#features', label: 'Features' },
  { href: '#download', label: 'Download' },
  { href: '#contact', label: 'Contact Us' },
  { href: '#about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(navLinks.map(n=>n.href));

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (window.location.pathname !== '/') {
        window.location.href = '/' + href; // navigate to home then anchor
        return;
      }
      smoothScrollToId(href);
      setOpen(false);
      history.replaceState(null, '', href);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 header-blur border-b border-input">
      <nav className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <a href="#home" className="flex items-center gap-3" onClick={(e)=>onNavClick(e,'#home')}>
          <img src={pgOwnerLogos.square} alt="PG Owner" className="h-8 w-8 rounded-md"/>
          <span className="font-extrabold text-lg text-tertiary">Pgowner</span>
        </a>
        <button aria-label="Toggle menu" className="md:hidden rounded-md p-2 bg-primary text-white" onClick={() => setOpen(v=>!v)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((l)=> {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e)=>onNavClick(e,l.href)}
                  className={`font-medium transition-colors ${isActive ? 'text-primary' : 'text-dark hover:text-primary'}`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      {open && (
        <div className="md:hidden bg-white border-t border-input">
          <ul className="px-4 py-3 space-y-2">
            {navLinks.map((l)=> (
              <li key={l.href}>
                <a href={l.href} onClick={(e)=>onNavClick(e,l.href)} className="block py-2 text-dark hover:text-primary font-medium">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
